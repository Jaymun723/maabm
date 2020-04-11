import { Matrix2D } from "../Matrix2D"
import { ActivationFunction, sigmoidFn } from "./ActivationFunction"
import { Vec2D } from "../Vec2D"

export interface Layer {
  inputSize: number
  outputSize: number
  weights: Matrix2D
  biais: Matrix2D
  activationFunction: ActivationFunction

  compute(input: number[]): number[]
}

export class SimpleLayer implements Layer {
  public inputSize: number
  public outputSize: number

  public weights: Matrix2D
  public biais: Matrix2D
  public activationFunction: ActivationFunction

  constructor(ops: { inputSize: number; outputSize: number; activationFunction?: ActivationFunction }) {
    this.inputSize = ops.inputSize
    this.outputSize = ops.outputSize
    this.activationFunction = ops.activationFunction || sigmoidFn

    this.weights = Matrix2D.random(this.outputSize, this.inputSize)
    this.biais = Matrix2D.random(this.outputSize, 1)
  }

  compute(_input: number[]) {
    if (_input.length !== this.inputSize) {
      throw new Error("Wrong input size.")
    }

    const input = new Matrix2D(
      this.inputSize,
      1,
      _input.map((val) => [val])
    )

    const output = this.weights.mult(input)
    output.add(this.biais)
    output.apply((val) => this.activationFunction.func(val))

    return output.data.map((c) => c[0])
  }
}
