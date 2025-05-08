import React from "react"
import { dimensions as cubeDimensions } from "./Case"
import Stack from "./Stack"

const generateStacks = (palletDimensions, palletCenter, spacing = 0) => {
  const [numCasesX, numCasesY, numCasesZ] = palletDimensions
  const [centerX, centerY, centerZ] = palletCenter
  const stacks = []

  const startX =
    centerX - ((numCasesX - 1) * (cubeDimensions.length + spacing)) / 2

  const startY = centerY - (numCasesY * cubeDimensions.height) / 2

  const startZ =
    centerZ - ((numCasesZ - 1) * (cubeDimensions.width + spacing)) / 2

  const stackHeight = numCasesY

  for (let row = 0; row < numCasesZ; row++) {
    for (let col = 0; col < numCasesX; col++) {
      const stackXPos = startX + col * (cubeDimensions.length + spacing)
      const stackZPos = startZ + row * (cubeDimensions.width + spacing)
      const stackPosition = [stackXPos, startY, stackZPos]

      stacks.push(
        <Stack
          key={`stack-${row}-${col}`}
          position={stackPosition}
          height={stackHeight}
          cubeDimensions={cubeDimensions}
        />
      )
    }
  }
  return stacks
}

const Pallet = ({ dimensions, position }) => {
  const stacks = generateStacks(dimensions, position)

  return <group>{stacks}</group>
}

export default Pallet
