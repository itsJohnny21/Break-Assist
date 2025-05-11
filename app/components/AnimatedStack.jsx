import { useRef, useState, useEffect } from "react"
import Stack from "./Stack"
import { useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import { useAppContext } from "../context/AppContext"

const AnimatedStack = ({
  position,
  targetPosition,
  animateState,
  ...props
}) => {
  const ref = useRef()
  const [animate, setAnimate] = animateState
  const [currentPosition] = useState(() => new Vector3(...position))
  const target = new Vector3(...targetPosition)

  useFrame(() => {
    if (!animate || !ref.current) return

    currentPosition.lerp(target, 0.05)
    ref.current.position.copy(currentPosition)

    if (currentPosition.distanceTo(target) < 0.1) {
      setAnimate(false)
    }
  })

  return (
    <group ref={ref} position={position}>
      <Stack {...props} />
    </group>
  )
}

export default AnimatedStack
