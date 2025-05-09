import React from "react"
import Stack from "./Stack"
import { useAppContext } from "../context/AppContext"

const Pallet = ({ position, ...props }) => {
  const {
    palletLength,
    palletHeight,
    palletWidth,
    caseDimensions,
    caseCount,
    upper,
    upperQuantity,
    lower,
    lowerQuantity,
    plus,
    palletCount,
  } = useAppContext()

  const palletDimensions = {
    length: palletLength,
    height: palletHeight,
    width: palletWidth,
  }

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
      centerX - ((numCasesX - 1) * (caseDimensions.length + spacing)) / 2

    const startY = centerY - (numCasesY * caseDimensions.height) / 2

    const startZ =
      centerZ - ((numCasesZ - 1) * (caseDimensions.width + spacing)) / 2

    const stackHeight = numCasesY

    const positions = []

    for (let i = 0; i < numCasesZ; i++) {
      const row = []
      for (let j = 0; j < numCasesX; j++) {
        const xPos = startX + j * (caseDimensions.length + spacing)
        const zPos = startZ + i * (caseDimensions.width + spacing)
        const stackPosition = [xPos, startY, zPos]

        row.push([xPos, startY, zPos])
      }

      positions.push(row)
    }
    return positions
  }
  const stackPositions = generateStackPositions(palletDimensions, position)

  const isDonut =
    palletDimensions.length === palletDimensions.width &&
    palletDimensions.length % 2 === 1 &&
    upperQuantity / (palletDimensions.length * palletDimensions.width - 1) ===
      lowerQuantity

  const center = Math.floor(palletDimensions.length / 2)
  let index = 0

  const stacks = stackPositions.map((row, i) =>
    row.map((stackPosition, j) => {
      if (i === center && j === center && isDonut) {
        return (
          <Stack
            key={`${i}-${j}`}
            maxHeight={palletDimensions.height}
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
          maxHeight={palletDimensions.height}
          height={height}
          position={stackPosition}
        />
      )
    })
  )

  return <group>{stacks.flat()}</group>
}

export default Pallet
