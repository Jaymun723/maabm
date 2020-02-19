import { clamp } from "../utils"

export class Vec2D {
  constructor(public readonly x: number, public readonly y: number) {}

  map(fn: (a: number, i: number) => number): Vec2D {
    return new Vec2D(fn(this.x, 0), fn(this.y, 0))
  }

  apply(xFn: (x: number) => number, yFn: (y: number) => number): Vec2D {
    return new Vec2D(xFn(this.x), yFn(this.y))
  }

  merge(other: Vec2D, fn: (a: number, b: number, i: number) => number): Vec2D {
    return new Vec2D(fn(this.x, other.x, 0), fn(this.y, other.y, 1))
  }

  add(other: Vec2D): Vec2D
  add(x: number, y: number): Vec2D
  add(a: Vec2D | number, b?: number): Vec2D {
    let otherVec = typeof a === "number" ? new Vec2D(a, b || 0) : a
    return this.merge(otherVec, (a, b) => a + b)
  }

  sub(other: Vec2D): Vec2D
  sub(x: number, y: number): Vec2D
  sub(a: Vec2D | number, b?: number): Vec2D {
    let otherVec = typeof a === "number" ? new Vec2D(a, b || 0) : a
    return this.merge(otherVec, (a, b) => a - b)
  }

  /** Multiply the x and y of a vector by the x and y of an other */
  mul(other: Vec2D): Vec2D
  mul(scalar: number): Vec2D
  mul(a: number | Vec2D) {
    if (typeof a === "number") {
      return this.map((n) => n * a)
    }
    return this.merge(a, (n, b) => n * b)
  }

  div(other: Vec2D): Vec2D
  div(scalar: number): Vec2D
  div(a: number | Vec2D) {
    if (typeof a === "number") {
      return this.map((n) => n / a)
    }
    return this.merge(a, (n, b) => n / b)
  }

  normalize(): Vec2D {
    const norm = this.norm()
    return new Vec2D(this.x / norm, this.y / norm)
  }

  norm(): number {
    return Math.sqrt(this.squaredNorm())
  }

  squaredNorm(): number {
    return this.x ** 2 + this.y ** 2
  }

  cross(other: Vec2D): number {
    return this.x * other.y - this.y * other.x
  }

  dot(other: Vec2D): number {
    return this.x * other.x + this.y * other.y
  }

  clamp(min: number, max: number): Vec2D
  clamp(xMin: number, xMax: number, yMin: number, yMax: number): Vec2D
  clamp(min: number, max: number, yMin?: number, yMax?: number): Vec2D {
    return new Vec2D(clamp(this.x, min, max), clamp(this.y, yMin || min, yMax || max))
  }

  /** Rotate the vector around the other vector by the angle (rad) */
  rotateAround(other: Vec2D, angle: number): Vec2D {
    const diagVec = this.sub(other)

    return other.add(
      new Vec2D(
        diagVec.x * Math.cos(angle) - diagVec.y * Math.sin(angle),
        diagVec.x * Math.sin(angle) + diagVec.y * Math.cos(angle)
      )
    )
  }
}
