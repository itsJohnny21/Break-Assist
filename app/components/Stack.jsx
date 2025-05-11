import React from "react"
import Case from "./Case"
import { useAppContext } from "../context/AppContext"

const Stack = ({ maxHeight, height, position, color, opacity, ...props }) => {
  const { caseDimensions, palletColor } = useAppContext()

  const generateCasePositions = (height, caseDimensions) => {
    const positions = []

    const startY = height * caseDimensions.height

    for (let i = 0; i < height; i++) {
      const y = startY - i * caseDimensions.height
      positions.push([0, y, 0])
    }

    return positions
  }

  const casePositions = generateCasePositions(height, caseDimensions)

  const cases = casePositions.map((pos, i) => {
    return <Case key={i} position={pos} color={palletColor} opacity={opacity} />
  })

  return <group position={position}>{cases}</group>
}

export default Stack
