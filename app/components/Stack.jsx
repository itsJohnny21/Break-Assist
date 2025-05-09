import React from "react"
import Case from "./Case"
import { useAppContext } from "../context/AppContext"

const Stack = ({ maxHeight, height, position, color = "blue", ...props }) => {
  const context = useAppContext()
  const caseDimensions = context.caseDimensions

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
    return (
      <Case key={i} position={pos} color={color} opacity={i < height ? 1 : 0} />
    )
  })

  return <group>{cases}</group>
}

export default Stack
