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
  const { caseDimensions } = useAppContext()

  const generateTargetPositions = (palletDimensions, caseDimensions) => {
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
      centerX + ((numCasesX - 1) * (caseDimensions.length + spacing)) / 2

    const startY = centerY - (numCasesY * caseDimensions.height) / 2

    const startZ =
      centerZ + ((numCasesZ - 1) * (caseDimensions.width + spacing)) / 2

    const stackHeight = numCasesY

    const positions = []

    for (let i = 0; i < numCasesZ; i++) {
      const row = []
      for (let j = 0; j < numCasesX; j++) {
        const xPos = startX - j * (caseDimensions.length + spacing)
        const zPos = startZ - i * (caseDimensions.width + spacing)
        const stackPosition = [xPos, startY, zPos]

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

  const stackPositions = generateStackPositions(palletDimensions, position)

  const targetPositions = generateTargetPositions(
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

  const stacks = []

  for (let i = 0; i < stackPositions.length; i++) {
    const row = stackPositions[i]
    for (let j = 0; j < row.length; j++) {
      const stackPosition = row[j]
      const targetPosition = targetPositions[i * stackPositions.length + j]

      if (i === center && j === center && isDonut) {
        stacks.push(
          <AnimatedStack
            key={`${i}-${j}`}
            maxHeight={palletDimensions.height}
            height={lower}
            position={stackPosition}
            targetPosition={targetPosition}
            animate={animate}
          />
        )
      } else {
        const height = index < upperQuantity ? upper : lower
        index++

        stacks.push(
          <AnimatedStack
            key={`${i}-${j}`}
            maxHeight={palletDimensions.height}
            height={height}
            position={stackPosition}
            targetPosition={targetPosition}
            animate={animate}
          />
        )
      }
    }
  }

  return <group onClick={handleClick}>{stacks}</group>
}

export default Pallet
