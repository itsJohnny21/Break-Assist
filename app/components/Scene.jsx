import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Pallet from "./Pallet"
import React, { useCallback, useRef, useState } from "react"
import { dimensions as cubeDimensions } from "./Case"
import Break from "./Break"
import Stars from "./Stars"
import { useAppContext } from "../context/AppContext"

const Scene = ({ className, ...props }) => {
  const { cameraOffset } = useAppContext()

  return (
    <Canvas camera={{ fov: 30, position: cameraOffset }} {...props}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <OrbitControls />
      <Stars />
      <Break position={[0, 0, 0]} />
    </Canvas>
  )
}

export default Scene
