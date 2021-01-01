import { clamp } from "../utils"

/**
 * Vec2D represents a 2D vector holding an x and y component.
 * Vec2D is immutable.
 * @example
 * ```js
 * // Basic ops
 * const a = new Vec2D(1, 1)
 * const b = a.mul(2) // => Vec2D(2, 2)
 * const c = b.add(c) // => Vec2D(3, 3)
 * const d = d.map((value) => value + 2) // => Vec2D(5, 5)
 *
 * // Distance between to points
 * const A = new Vec2D(0, 0)
 * const B = new Vec2D(1, 5)
 * const AB = B.sub(A) // Vec2D(1, 5)
 * const distanceAB = AB.norm() // 5.0990195135927845
 * ```
 */
export class Vec2D {
  constructor(public readonly x: number, public readonly y: number) {}

  /**
   * Creates a Vec2D from any object with an x and y properties.
   * @example
   * ```js
   * const circle = {
   *  x: 10,
   *  y: 25,
   *  radius: 5,
   *  color: "red",
   * }
   * const circlePosition = Vec2D.from(circle) // Vec2D(10, 25)
   * ```
   * @param obj An object with and x and y properties.
   */
  static from(obj: { x: number; y: number }) {
    return new Vec2D(obj.x, obj.y)
  }

  /**
   * Maps a function to the vector's components.
   * @example
   * ```js
   * const a = new Vec(1, 3)
   * const b = a.map((val) => val ** 2) // Vec2D(1, 9)
   *
   * const c = a.map((val, i) => {
   *  if (i === 0) { // val is the x
   *    return val + 1
   *  } else { // val is the y
   *    return val - 1
   *  }
   * }) // Vec2D(2, 2)
   * @param fn The fonction that will be "maped". Takes the value and optionally the "index" of the component (0 for x, 1 for y).
   */
  map(fn: (a: number, i: number) => number): Vec2D {
    return new Vec2D(fn(this.x, 0), fn(this.y, 1))
  }

  /**
   * Applies one function for each of the vector component.
   * @example
   * ```js
   * const a = new Vec2D(1, 2)
   * const b = a.apply((x) => x * 2, (y) => y - 3) // Vec2D(2, -1)
   * ```
   * @param xFn The function that will be applied to the x component.
   * @param yFn The function that will be applied to the y component.
   */
  apply(xFn: (x: number) => number, yFn: (y: number) => number): Vec2D {
    return new Vec2D(xFn(this.x), yFn(this.y))
  }

  /**
   * Merges two vectors into one using a function.
   * @example
   * ```js
   * const a = new Vec2D(2, 2)
   * const b = new Vec2D(1, 3)
   * const c = a.merge(b, (v, w) => v + w)
   *
   * const d = a.merge(b, (v, w, i) => {
   *  if (i === 0) { // for x
   *    return v + w
   *  } else { // for y
   *    return v - w
   *  }
   * }) // Vec2D(3, -1)
   * ```
   * @param other The other vector that will b merged.
   * @param fn The function that will be used to merge the two vectors. Gets the value of the first vectors, then the value of the second. Also gets the "index" of the component.
   */
  merge(other: Vec2D, fn: (a: number, b: number, i: number) => number): Vec2D {
    return new Vec2D(fn(this.x, other.x, 0), fn(this.y, other.y, 1))
  }

  /**
   * Adds two vectors.
   * @example
   * ```js
   * const a = new Vec2D(0, 1)
   * const b = new Vec2D(1, 0)
   * const c = a.add(b) // Vec2D(1, 1)
   * ```
   * @param other The other vector that will be added.
   */
  add(other: Vec2D): Vec2D
  /**
   * Adds different values to x and y components.
   * @example
   * ```js
   * const a = new Vec(1, 0)
   * const b = a.add(1, 2) // Vec2D(2, 2)
   * ```
   * @param x
   * @param y
   */
  add(x: number, y: number): Vec2D
  add(a: Vec2D | number, b?: number): Vec2D {
    let otherVec = typeof a === "number" ? new Vec2D(a, b || 0) : a
    return this.merge(otherVec, (a, b) => a + b)
  }

  /**
   * Subtracts two vectors.
   * @example
   * ```js
   * const a = new Vec2D(0, 1)
   * const b = new Vec2D(1, 0)
   * const c = a.sub(b) // Vec2D(-1, -1)
   * ```
   * @param other The other vector that will be subtracted.
   */
  sub(other: Vec2D): Vec2D
  /**
   * Subtracts different values to x and y components.
   * @example
   * ```js
   * const a = new Vec(1, 0)
   * const b = a.sub(1, 2) // Vec2D(0, -2)
   * ```
   * @param x
   * @param y
   */
  sub(x: number, y: number): Vec2D
  sub(a: Vec2D | number, b?: number): Vec2D {
    let otherVec = typeof a === "number" ? new Vec2D(a, b || 0) : a
    return this.merge(otherVec, (a, b) => a - b)
  }

  /**
   * Multiplies the components the vectors by the components of the other.
   * @example
   * ```js
   * const a = new Vec2D(1, 2)
   * const b = new Vec2D(5, 3)
   * const c = a.mul(b) // Vec2D(5, 6)
   * ```
   * @param other
   */
  mul(other: Vec2D): Vec2D
  /**
   * Multiplies both vector's components by a scalar.
   * @example
   * ```js
   * const a = new Vec2D(2, 3)
   * const b = a.mul(4) // new Vec2D(8, 12)
   * ```
   * @param scalar
   */
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
    let multiplier = norm
    if(norm > 0) {
      multiplier = 1 / norm
    }
    return this.mul(multiplier)
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

  angleWith(other: Vec2D) {
    return Math.acos(
      this.dot(other) / (this.norm() * other.norm())
    )
  }
}
