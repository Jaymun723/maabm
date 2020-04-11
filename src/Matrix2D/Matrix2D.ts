import { randfloat } from "../random"

/**
 * @typedef ApplyFunction
 * @param {number} val The value of the element
 * @param {number} x The x value of the element
 * @param {number} y The y value of the element
 * @returns {number} The newly computed number
 */
type ApplyFunction = (val: number, x: number, y: number) => number

/**
 * @typedef MergeFunction
 * @param {number} a The value of the a element
 * @param {number} b The value of the b element
 * @param {number} x The x value of the element
 * @param {number} y The y value of the element
 * @returns {number} The newly computed number
 */
type MergeFunction = (a: number, b: number, x: number, y: number) => number

export class Matrix2D {
  private _data: number[][] = []

  constructor(public readonly width: number, public readonly height: number, initialData?: number[][]) {
    if (initialData) {
      this.setData(initialData)
    } else {
      this._data = Array.from({ length: width }, () => Array.from({ length: height }, () => 0))
    }
  }

  static random(width: number, height: number) {
    let data: number[][] = []
    for (let i = 0; i < width; i++) {
      data.push([])
      for (let j = 0; j < height; j++) {
        data[i].push(randfloat(-1, 1))
      }
    }
    return new Matrix2D(width, height, data)
  }

  public copy() {
    return new Matrix2D(this.width, this.height, this._data)
  }

  public testData(data: any): data is number[][] {
    if (Array.isArray(data) && data.length === this.width) {
      for (const subData of data) {
        if (!Array.isArray(subData) || subData.length !== this.height || subData.some((a) => typeof a !== "number")) {
          return false
        }
      }
      return true
    }
    return false
  }

  public get(x: number, y: number): number {
    return this._data[x][y]
  }

  public set(x: number, y: number, value: number) {
    this._data[x][y] = value
  }

  public get data() {
    return this._data
  }

  public setData(data: any) {
    if (this.testData(data)) {
      this._data = data
    } else {
      throw new Error("The data dont fit the shape.")
    }
  }

  static apply(a: Matrix2D, fn: ApplyFunction): number[][] {
    return a.data.map((col, x) => col.map((val, y) => fn(val, x, y)))
  }

  public apply(fn: ApplyFunction) {
    this._data = Matrix2D.apply(this, fn)
  }

  static merge(a: Matrix2D, b: Matrix2D, fn: MergeFunction): number[][] {
    if (a.width < b.width || a.height < b.height) {
      throw new Error("The two matrix provided is aren't compatible (not the same size).")
    }
    return Matrix2D.apply(a, (i, x, y) => fn(i, b.get(x, y), x, y))
  }

  public merge(b: Matrix2D, fn: MergeFunction) {
    this._data = Matrix2D.merge(this, b, fn)
  }

  static add(a: Matrix2D, b: Matrix2D) {
    if (a.width !== b.width || a.height !== b.height) {
      throw new Error("The matrixes don't have the same size.")
    }
    return new Matrix2D(
      a.width,
      a.height,
      Matrix2D.merge(a, b, (i, j) => i + j)
    )
  }

  public add(a: Matrix2D) {
    const res = Matrix2D.add(this, a)
    this._data = res._data
  }

  static sub(a: Matrix2D, b: Matrix2D) {
    return new Matrix2D(
      a.width,
      b.width,
      Matrix2D.merge(a, b, (i, j) => i - j)
    )
  }

  public sub(a: Matrix2D) {
    const res = Matrix2D.add(this, a)
    this._data = res._data
  }

  static mult(a: Matrix2D, b: Matrix2D): number
  static mult(m: Matrix2D, s: number): Matrix2D
  static mult(a: Matrix2D, b: number | Matrix2D): any {
    if (typeof b === "number") {
      return new Matrix2D(
        a.width,
        a.height,
        Matrix2D.apply(a, (v) => v * b)
      )
    } else {
      if (a.height !== b.width) {
        throw new Error("Invalid width and heights.")
      }
      const res = new Matrix2D(a.width, b.height)
      for (let x = 0; x < res.width; x++) {
        for (let y = 0; y < res.height; y++) {
          let sum = 0
          for (let k = 0; k < a.height; k++) {
            sum += a.get(x, k) * b.get(k, y)
          }
          res.set(x, y, sum)
        }
      }
      return res
    }
  }

  public mult(other: Matrix2D): Matrix2D
  public mult(s: number): void
  public mult(a: number | Matrix2D): any {
    if (typeof a === "number") {
      this.apply((v) => v * a)
    } else {
      return Matrix2D.mult(this, a)
    }
  }

  public static div(m: Matrix2D, s: number) {
    return new Matrix2D(
      m.width,
      m.height,
      Matrix2D.apply(m, (v) => v / s)
    )
  }

  public div(s: number) {
    this.apply((v) => v / s)
  }
}
