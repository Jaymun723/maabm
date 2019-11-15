import { clamp } from "../utils"

export class Vec2D {
  constructor(public readonly x: number, public readonly y: number) {}

  apply(fn: (a: number, i: number) => number): Vec2D {
    return new Vec2D(fn(this.x, 0), fn(this.y, 0))
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

  mul(scalar: number): Vec2D {
    return this.apply((a) => a * scalar)
  }

  div(scalar: number): Vec2D {
    return this.apply((a) => a / scalar)
  }

  norm(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
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
}
