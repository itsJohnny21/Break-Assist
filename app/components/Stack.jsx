import React from "react"
import Case from "./Case"
import { useAppContext } from "../context/AppContext"

const Stack = ({ maxHeight, height, position, color, opacity, ...props }) => {
  const { caseDimensions, palletColor } = useAppContext()

  const generateCasePositions = (height, center) => {
    const [centerX, centerY, centerZ] = center
    const positions = []

    for (let i = 0; i < height; i++) {
      const cubeY = centerY + i * caseDimensions.height
      const position = [centerX, cubeY, centerZ]
      positions.push(position)
    }

    return positions
  }

  const casePositions = generateCasePositions(height, position)

  const cases = casePositions.map((pos, i) => {
    return <Case key={i} position={pos} color={palletColor} opacity={opacity} />
  })

  return <group>{cases}</group>
}

export default Stack
