import { Layer } from "./Layer"

export class NeuralNetwork {
  public layers: Layer[] = []

  constructor(layers: Layer[] = []) {
    for (const layer of layers) {
      this.addLayer(layer)
    }
  }

  public addLayer(layer: Layer) {
    if (this.layers.length === 0) {
      this.layers.push(layer)
    } else if (layer.inputSize === this.layers[this.layers.length - 1].outputSize) {
      this.layers.push(layer)
    } else {
      throw new Error("The new layer input size doesn't match the previous layer output size.")
    }
  }

  public predict(_input: number[]) {
    let input = _input.slice()
    for (const layer of this.layers) {
      try {
        input = layer.compute(input)
      } catch (error) {
        throw new Error(`Error in layer ${this.layers.indexOf(layer)}: ${error}`)
      }
    }
    return input
  }
}
