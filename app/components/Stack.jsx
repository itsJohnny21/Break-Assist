import React from "react"
import { dimensions as cubeDimensions } from "./Case"
import Case from "./Case"

const Stack = ({ height, position, color }) => {
  const generateCubePositions = (height, center) => {
    const [centerX, centerY, centerZ] = center
    const cubePositions = []
    const cases = []

    for (let i = 0; i < height; i++) {
      const cubeY = centerY + i * cubeDimensions.height
      cubePositions.push([centerX, cubeY, centerZ])
      const cubePosition = [centerX, cubeY, centerZ]

      cases.push(<Case key={i} position={cubePosition} color={color} />)
    }

    return cases
  }

  const cases = generateCubePositions(height, position)

  return <group>{cases}</group>
}

export default Stack
