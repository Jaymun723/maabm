export class MatrixData {
  private rawData: number[] = []

  constructor(public readonly shape: number[], initialData?: any[]) {
    if (initialData) {
      this.setData(initialData)
    }
  }

  static fromRaw(shape: number[], rawData: number[]) {
    const res = new MatrixData(shape)
    res.rawData = rawData
    return res
  }

  fitShape(data: any, i = 0) {
    if (!Array.isArray(data)) return false

    if (data.length === this.shape[i]) {
      if (this.shape.length > i + 1) {
        for (const subData of data) {
          const hasGoodShape = this.fitShape(subData, i + 1)
          if (!hasGoodShape) return false
        }
        return true
      } else {
        return true
      }
    } else {
      return false
    }
  }

  setData(data: any) {
    if (!this.fitShape(data)) throw new Error("Data provided didn't fit the shape.")
    const flat = (arr: any[]): number[] =>
      arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flat(val) : val), [])
    const rawData = flat(data)
    this.rawData = rawData
  }

  getData(i = 0, acc = this.rawData): any {
    if (this.shape.slice(i + 1).length <= 0) {
      return acc
    }
    const length = this.shape.slice(i + 1).reduce((a, b) => a * b, 1)
    let data = []
    for (let j = 0; j < this.shape[i] * length; j += length) {
      data.push(acc.slice(j, j + length))
    }
    if (this.shape.slice(i + 1).length > 0) {
      return data.map((subData) => this.getData(i + 1, subData))
    }
    return data
  }

  getRawData() {
    return this.rawData
  }

  get(...cords: number[]) {
    const i = cords.reduce((a, b) => a * b, 0)
    return this.rawData[i]
  }
}
