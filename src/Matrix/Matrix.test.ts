import { MatrixData } from "./MatrixData"

const dataTests: [number[], any[], number[]][] = [
  [[2], [0, 0], [0, 0]],

  [[2, 2], [[1, 2], [3, 4]], [1, 2, 3, 4]],

  [[2, 2, 2], [[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [1, 2, 3, 4, 5, 6, 7, 8]],

  [[2, 1, 2, 1], [[[[1], [2]]], [[[3], [4]]]], [1, 2, 3, 4]],
]

describe("Matrix", () => {
  test("fitShape works correctly", () => {
    const a = new MatrixData([2, 2])
    const aData = [[0, 0], [0, 0]]
    expect(a.fitShape(aData)).toBe(true)

    const b = new MatrixData([1, 3, 2])
    const bData = [[[0, 0], [0, 0], [0, 0]]]
    expect(b.fitShape(bData)).toBe(true)

    const c = new MatrixData([1, 3, 2])
    const cData = [[[0, 0], [0, 0, 0], [0, 0]]]
    expect(c.fitShape(cData)).toBe(false)

    const d = new MatrixData([2, 2, 1])
    const dData = [[[0], [0]], [0, [0]]]
    expect(d.fitShape(dData)).toBe(false)

    const e = new MatrixData([2, 2])
    const eData = [[0, 0]]
    expect(e.fitShape(eData)).toBe(false)
  })

  test("getData works correctly", () => {
    const testGetData = (shape: number[], data: any[], rawData: number[]) => {
      const matrix = MatrixData.fromRaw(shape, rawData)
      expect(matrix.getData()).toEqual(data)
    }

    for (const testData of dataTests) {
      testGetData(testData[0], testData[1], testData[2])
    }
  })

  test("setData works correctly", () => {
    const testSetData = (shape: number[], data: any[], rawData: number[]) => {
      const matrix = new MatrixData(shape)
      matrix.setData(data)
      expect(matrix.getRawData()).toEqual(rawData)
    }

    for (const testData of dataTests) {
      testSetData(testData[0], testData[1], testData[2])
    }
  })

  test("get works correctly", () => {
    const a = new MatrixData([2, 2], [[2, 0], [1, 0]])
    expect(a.get(0, 0)).toBe(2)
    expect(a.get(2, 0)).toBe(1)
  })
})
