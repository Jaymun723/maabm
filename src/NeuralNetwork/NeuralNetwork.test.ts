import { NeuralNetwork } from "./NeuralNetwork"
import { SimpleLayer } from "./Layer"

describe("NeuralNetwork", () => {
  test("One layer test", () => {
    const Nn = new NeuralNetwork()

    Nn.addLayer(
      new SimpleLayer({
        inputSize: 4,
        outputSize: 1,
      })
    )

    const output = Nn.predict([1, 2, 3, 4])

    expect(output.length).toBe(1)
  })

  test("Multiple layer test", () => {
    const Nn = new NeuralNetwork()

    Nn.addLayer(
      new SimpleLayer({
        inputSize: 6,
        outputSize: 4,
      })
    )

    Nn.addLayer(
      new SimpleLayer({
        inputSize: 4,
        outputSize: 2,
      })
    )

    Nn.addLayer(
      new SimpleLayer({
        inputSize: 2,
        outputSize: 2,
      })
    )

    const output = Nn.predict([1, 2, 3, 4, 5, 6])

    expect(output.length).toBe(2)
  })
})
