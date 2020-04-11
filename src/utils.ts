/**
 * Return the quotient of the euclidean division between the divided and the divisor.
 * To get the remainder use the `%` operator.
 * @example
 * ```js
 * const quotient = eucDic(13,5)
 * // => 2
 * const remainder = 13 % 5
 * // => 3
 * ```
 * @param divided
 * @param divisor
 */
export function eucDiv(divided: number, divisor: number) {
  return Math.floor(divided / divisor)
}

/**
 * Assure that a value is between the min and max boundary.
 * @example
 * ```js
 * clamp(500,0,1000) // => 500
 * clamp(250,0,200) // => 200
 * clamp(-5,0,1) // => 0
 * ```
 * @param value
 * @param min
 * @param max
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(min, value), max)
}

/**
 * Use the first function to create a "converter" for that precision (numbers of significant digits).
 * @example
 * ```js
 * const to2Digits = toPrecision(2)
 * to2Digits(Math.PI) // => 3.1
 * to2Digits(421337) // => 42000
 * ```
 * @param precision The precision is number significant digits.
 */
export function toPrecision(precision: number) {
  return (n: number) => Number(n.toPrecision(precision))
}

/**
 * Creates an empty array with custom length and default value.
 * @example
 * ```js
 * emptyArray(5,0) // => [0, 0, 0, 0, 0]
 * ```
 * @param length
 * @param baseValue Can be anything.
 */
export function emptyArray<T>(length: number, baseValue: T) {
  return Array.from({ length }, () => baseValue)
}

/**
 * Fonction to convert a value from a starting range to an end range.
 * @example
 * ```js
 * toRange(0.5, 0, 1, 0, 100) // => 50
 * toRange(25, 0, 100, 0, 4) // => 1
 * ```
 * @param value
 * @param startMin Min boundary of the starting range.
 * @param startMax Max boundary of the starting range.
 * @param endMin Min boundary of the ending range.
 * @param endMax Max boundary of the ending range.
 */
export function toRange(value: number, startMin: number, startMax: number, endMin: number, endMax: number) {
  return ((value - startMin) / (startMax - startMin)) * (endMax - endMin) + endMin
}
