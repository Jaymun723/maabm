import { Vec2D } from "../Vec2D"

export class Polygon {
  static getEdges(polygon: Vec2D[]) {
    const edges: Vec2D[] = []
    for (let i = 0; i < polygon.length; i++) {
      const j = (i + 1) % polygon.length
      const edge = polygon[j].sub(polygon[i])
      edges.push(edge)
    }
    return edges
  }

  static getNormals(polygon: Vec2D[]) {
    const edges = Polygon.getEdges(polygon)
    return edges.map((e) => new Vec2D(-e.y, e.x).normalize())
  }

  static getCentroid(polygon: Vec2D[]) {
    const sum = polygon.reduce((prev, cur) => prev.add(cur))
    return sum.div(polygon.length)
  }

  static getInteriorAngles(polygon: Vec2D[]) {
    const angles: number[] = []

    for (let i = 0; i < polygon.length; i++) {
      const h = (i + polygon.length - 1) % polygon.length
      const j = (i + 1) % polygon.length

      const a = polygon[h].sub(polygon[i])
      const b = polygon[j].sub(polygon[i])

      const angle = Math.atan2(a.cross(b), a.dot(b))
      angles.push(angle)
    }

    return angles
  }

  static getBoundRadius(polygon: Vec2D[]) {
    const centroid = Polygon.getCentroid(polygon)

    let bestDistance = 0
    for (let i = 0; i < polygon.length; i++) {
      const dist = polygon[i].sub(centroid).norm()

      if (dist > bestDistance) {
        bestDistance = dist
      }
    }

    return bestDistance
  }

  static getMomentOfInertia(polygon: Vec2D[], mass: number) {
    let area = 0
    let center = new Vec2D(0, 0)
    let moment = 0
    for (let i = 0; i < polygon.length; i++) {
      const j = (i + 1) % polygon.length

      const a = polygon[i]
      const b = polygon[j]
      const areaStep = a.cross(b) / 2
      const centerStep = a.add(b).div(3)
      const momentStep = (areaStep * (a.dot(a) + b.dot(b) + a.dot(b))) / 6
      center = center
        .mul(area)
        .add(centerStep.mul(areaStep))
        .div(area + areaStep)
      area += areaStep
      moment += momentStep
    }
    const density = mass / area
    moment *= density
    moment -= mass * center.dot(center)
    return moment
  }

  static getArea(polygon: Vec2D[]) {
    let area = 0
    for (let i = 0; i < polygon.length; i++) {
      const j = (i + 1) % polygon.length

      const a = polygon[i]
      const b = polygon[j]

      area += a.cross(b) / 2
    }
    return area
  }
}
