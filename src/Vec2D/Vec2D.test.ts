import { Vec2D } from "./Vec2D"

describe("Vec2D", () => {
  test("Cross product should work", () => {
    const a = new Vec2D(2, 3)
    const b = new Vec2D(5, 6)
    const c = a.cross(b)
    expect(c).toBe(-3)
  })
  test("Dot product should work", () => {
    const a = new Vec2D(-6, 8)
    const b = new Vec2D(5, 12)
    const c = a.dot(b)
    expect(c).toBe(66)
  })
})
