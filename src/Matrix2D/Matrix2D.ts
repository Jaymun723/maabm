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

  constructor(public width: number, public height: number, initialData?: number[][]) {
    if (initialData) {
      this.setData(initialData)
    } else {
      this._data = Array.from({ length: width }, () => Array.from({ length: height }, () => 0))
    }
  }

  testData(data: any): data is number[][] {
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

  get(x: number, y: number): number {
    return this._data[x][y]
  }

  set(x: number, y: number) {
    this._data[x][y]
  }

  get data() {
    return this._data
  }

  setData(data: any) {
    if (this.testData(data)) {
      this._data = data
    } else {
      throw new Error("The data dont fit the shape.")
    }
  }

  static apply(a: Matrix2D, fn: ApplyFunction): number[][] {
    return a.data.map((col, x) => col.map((val, y) => fn(val, x, y)))
  }

  apply(fn: ApplyFunction) {
    this._data = Matrix2D.apply(this, fn)
  }

  static merge(a: Matrix2D, b: Matrix2D, fn: MergeFunction): number[][] {
    if (a.width < b.width || a.height < b.height) {
      throw new Error("The two matrix provided is aren't compatible (not the same size).")
    }
    return Matrix2D.apply(a, (i, x, y) => fn(i, b.get(x, y), x, y))
  }

  merge(b: Matrix2D, fn: MergeFunction) {
    this._data = Matrix2D.merge(this, b, fn)
  }

  static add(a: Matrix2D, b: Matrix2D) {
    return new Matrix2D(a.width, b.width, Matrix2D.merge(a, b, (i, j) => i + j))
  }

  add(a: Matrix2D) {
    const res = Matrix2D.add(this, a)
    this._data = res._data
  }

  static sub(a: Matrix2D, b: Matrix2D) {
    return new Matrix2D(a.width, b.width, Matrix2D.merge(a, b, (i, j) => i - j))
  }

  sub(a: Matrix2D) {
    const res = Matrix2D.add(this, a)
    this._data = res._data
  }

  static mult(m: Matrix2D, s: number) {
    return new Matrix2D(m.width, m.height, Matrix2D.apply(m, (v) => v * s))
  }

  mult(s: number) {
    this.apply((v) => v * s)
  }

  static div(m: Matrix2D, s: number) {
    return new Matrix2D(m.width, m.height, Matrix2D.apply(m, (v) => v / s))
  }

  div(s: number) {
    this.apply((v) => v / s)
  }
}
