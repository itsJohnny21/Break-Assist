import React, { useState } from "react"
import Stack from "./Stack"
import { useAppContext } from "../context/AppContext"
import AnimatedStack from "./AnimatedStack"

const Pallet = ({
  palletDimensions,
  upper,
  upperQuantity,
  lower,
  lowerQuantity,
  opacity,
  position = [0, 0, 0],
  ...props
}) => {
  const { caseDimensions, deconstructedTargetPositions } = useAppContext()

  const generateStackPositions = (
    palletDimensions,
    caseDimensions,
    spacing = 0
  ) => {
    const {
      length: numCasesX,
      height: numCasesY,
      width: numCasesZ,
    } = palletDimensions

    const startX = ((numCasesX - 1) * (caseDimensions.length + spacing)) / 2
    const startY = -(numCasesY * caseDimensions.height) / 2
    const startZ = ((numCasesZ - 1) * (caseDimensions.width + spacing)) / 2

    const positions = []

    for (let i = 0; i < numCasesZ; i++) {
      const row = []
      for (let j = 0; j < numCasesX; j++) {
        const xPos = startX - j * (caseDimensions.length + spacing)
        const zPos = startZ - i * (caseDimensions.width + spacing)
        row.push([xPos, startY, zPos])
      }
      positions.push(row)
    }

    return positions
  }

  const [animate, setAnimate] = useState(false)

  const handleClick = () => {
    setAnimate(true)
  }

  const stackPositions = generateStackPositions(
    palletDimensions,
    caseDimensions
  )

  const isDonut =
    palletDimensions.length === palletDimensions.width &&
    palletDimensions.length % 2 === 1 &&
    upperQuantity / (palletDimensions.length * palletDimensions.width - 1) ===
      lowerQuantity

  const center = Math.floor(palletDimensions.length / 2)
  let index = 0

  const stacks = stackPositions.map((row, i) =>
    row.map((stackPosition, j) => {
      const targetPosition =
        deconstructedTargetPositions[i * stackPositions.length + j]

      const isCenter = i === center && j === center && isDonut
      const height = isCenter ? lower : index++ < upperQuantity ? upper : lower

      return (
        <AnimatedStack
          key={`${i}-${j}`}
          maxHeight={palletDimensions.height}
          height={height}
          position={stackPosition}
          targetPosition={targetPosition || stackPosition}
          animate={animate}
        />
      )
    })
  )

  return (
    <group position={position} onClick={handleClick}>
      {stacks}
    </group>
  )
}

export default Pallet
