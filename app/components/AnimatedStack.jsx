import { useRef, useState, useEffect } from "react"
import Stack from "./Stack"
import { useFrame } from "@react-three/fiber"
import { Vector3 } from "three"

const AnimatedStack = ({
  position,
  targetPosition,
  animate = false,
  ...props
}) => {
  const ref = useRef()
  const [currentPosition] = useState(() => new Vector3(...position))
  const target = new Vector3(...targetPosition)
  console.log(currentPosition)
  console.log(target)
  console.log("\n")

  useFrame(() => {
    if (!animate || !ref.current) return

    currentPosition.x += 0.3
    currentPosition.y += 0.1
    currentPosition.z += 0.1
    // console.log(
    //   `going from ${currentPosition.x} ${currentPosition.y} ${currentPosition.z} to ${target.x} ${target.y} ${target.z}`
    // )
    ref.current.position.copy(currentPosition)
  })

  return (
    <group ref={ref}>
      <Stack position={position} {...props} />
    </group>
  )
}

export default AnimatedStack
