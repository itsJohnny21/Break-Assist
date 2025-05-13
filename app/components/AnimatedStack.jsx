import { useRef, useState, useEffect } from "react"
import Stack from "./Stack"
import { useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import { useAppContext } from "../context/AppContext"

const AnimatedStack = ({ position, targetPosition, isActive, ...props }) => {
  const ref = useRef()
  const [currentPosition] = useState(() => new Vector3(...position))
  const target = new Vector3(...targetPosition)

  useFrame(() => {
    if (isActive) {
      const target = new Vector3(...targetPosition)
      currentPosition.lerp(target, 0.05)
      ref.current.position.copy(currentPosition)
    } else {
      const target = new Vector3(...position)
      currentPosition.lerp(target, 0.05)
      ref.current.position.copy(currentPosition)
    }
  })

  return (
    <group ref={ref} position={position}>
      <Stack {...props} />
    </group>
  )
}

export default AnimatedStack
