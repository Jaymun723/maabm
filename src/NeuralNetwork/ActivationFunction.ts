export class ActivationFunction {
  constructor(public func: (value: number) => number, public dfunc: (value: number) => number) {}
}

export const sigmoidFn = new ActivationFunction(
  (x) => 1 / (1 + Math.exp(-x)),
  (x) => x * (1 - x)
)
