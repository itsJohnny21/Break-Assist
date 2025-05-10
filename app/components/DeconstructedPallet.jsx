import React from "react"
import Stack from "./Stack"
import { useAppContext } from "../context/AppContext"

const DeconstructedPallet = ({ position = [0, 0, 0], ...props }) => {
  const { palletDimensions, caseDimensions } = useAppContext()

  const generateStackPositions = (palletDimensions, caseDimensions) => {
    const A = palletDimensions.length * palletDimensions.width
    const startX = -caseDimensions.length * (A - 1)
    const startY = 0
    const startZ = caseDimensions.width * 5
    const delta = caseDimensions.length * 2

    const positions = []

    for (let i = 0; i < palletDimensions.length * palletDimensions.width; i++) {
      const xPos = startX + delta * i
      positions.push([xPos, startY, startZ])
    }

    return positions
  }

  const stackPositions = generateStackPositions(
    palletDimensions,
    caseDimensions
  )

  const stacks = stackPositions.map((stackPosition, i) => {
    return (
      <Stack
        key={i}
        maxHeight={palletDimensions.height}
        height={palletDimensions.height}
        position={stackPosition}
      />
    )
  })

  return <group>{stacks}</group>
}

export default DeconstructedPallet
