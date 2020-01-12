export const eucDiv = (a: number, b: number) => Math.floor(a / b)

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(min, value), max)

export const toPrecision = (p: number) => (n: number) => Number(n.toPrecision(p))
