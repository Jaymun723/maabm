import { Matrix2D } from "./Matrix2D"

describe("Matrix2D", () => {
  test("The initialisation", () => {
    const a = new Matrix2D(2, 2, [
      [1, 2],
      [3, 4],
    ])
    expect(a.data).toEqual([
      [1, 2],
      [3, 4],
    ])

    expect(() => new Matrix2D(2, 2, [[1, 2, 3]])).toThrow()

    const b = new Matrix2D(3, 4)
    expect(b.data).toMatchSnapshot()
  })

  test(".apply", () => {
    const a = new Matrix2D(5, 5)
    a.apply((_, x, y) => x * 10 + y)
    expect(a.data).toMatchSnapshot()
  })

  test("#mult", () => {
    const a = new Matrix2D(2, 2, [
      [1, 2],
      [0, 1],
    ])
    const b = new Matrix2D(2, 2, [
      [2, 5],
      [6, 7],
    ])

    expect(Matrix2D.mult(a, b)).toMatchSnapshot()
  })
})
