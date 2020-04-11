/**
 * Returns a random integer between 0 (inclusive) and max (inclusive).
 * @param max The maximum integer that can be returned (inclusive)
 */
export function randint(max: number): number
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param min The minium integer that can be returned (inclusive)
 * @param max The maximum integer that can be returned (inclusive)
 */
export function randint(min: number, max: number): number
export function randint(a: number, b?: number): number {
  const min = Math.ceil(typeof b === "number" ? a : 0)
  const max = Math.floor(typeof b === "number" ? b : a)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
export function randfloat(min: number, max: number) {
  return Math.random() * (max - min) + min
}

/**
 * Returns a random element from the array.
 * @param array The array to retrieve an element from.
 */
export function choice<T>(array: T[]) {
  const i = randint(array.length - 1)
  return array[i]
}
