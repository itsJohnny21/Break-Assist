import React from "react"
import { dimensions as cubeDimensions } from "./Case"
import Case from "./Case"

const Stack = ({ height, position, color }) => {
  const generateCubePositions = (height, center) => {
    const [centerX, centerY, centerZ] = center
    const cubePositions = []
    const cubes = []

    for (let i = 0; i < height; i++) {
      const cubeY = centerY + i * cubeDimensions.height
      cubePositions.push([centerX, cubeY, centerZ])
      const cubePosition = [centerX, cubeY, centerZ]

      cubes.push(<Case key={i} position={cubePosition} color={color} />)
    }

    return cubes
  }

  const cubes = generateCubePositions(height, position)

  return <group>{cubes}</group>
}

export default Stack
