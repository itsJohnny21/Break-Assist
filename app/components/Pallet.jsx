import React from "react"
import { dimensions as cubeDimensions } from "./Case"
import Stack from "./Stack"

const generateStackPositions = (
  palletDimensions,
  palletCenter,
  spacing = 0
) => {
  const {
    length: numCasesX,
    height: numCasesY,
    width: numCasesZ,
  } = palletDimensions
  const [centerX, centerY, centerZ] = palletCenter
  const startX =
    centerX - ((numCasesX - 1) * (cubeDimensions.length + spacing)) / 2

  const startY = centerY - (numCasesY * cubeDimensions.height) / 2

  const startZ =
    centerZ - ((numCasesZ - 1) * (cubeDimensions.width + spacing)) / 2

  const stackHeight = numCasesY

  const positions = []

  for (let i = 0; i < numCasesZ; i++) {
    const row = []
    for (let j = 0; j < numCasesX; j++) {
      const xPos = startX + j * (cubeDimensions.length + spacing)
      const zPos = startZ + i * (cubeDimensions.width + spacing)
      const stackPosition = [xPos, startY, zPos]

      row.push([xPos, startY, zPos])
    }

    positions.push(row)
  }
  return positions
}

const Pallet = ({
  dimensions,
  upper,
  upperQuantity,
  lower,
  lowerQuantity,
  position,
}) => {
  const stackPositions = generateStackPositions(dimensions, position)

  const isDonut =
    dimensions.length === dimensions.width &&
    dimensions.length % 2 === 1 &&
    upperQuantity / (dimensions.length * dimensions.width - 1) === lowerQuantity

  const center = Math.floor(dimensions.length / 2)
  let index = 0

  const stacks = stackPositions.map((row, i) =>
    row.map((stackPosition, j) => {
      if (i === center && j === center && isDonut) {
        return (
          <Stack
            key={`${i}-${j}`}
            maxHeight={dimensions.height}
            height={lower}
            position={stackPosition}
          />
        )
      }

      const height = index < upperQuantity ? upper : lower
      index++
      return (
        <Stack
          key={`${i}-${j}`}
          maxHeight={dimensions.height}
          height={height}
          position={stackPosition}
        />
      )
    })
  )

  return <group>{stacks.flat()}</group>
}

export default Pallet
