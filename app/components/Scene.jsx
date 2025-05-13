import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Vector3 } from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import Pallet from "./Pallet"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { dimensions as cubeDimensions } from "./Case"
import Break from "./Break"
import Stars from "./Stars"
import { useAppContext } from "../context/AppContext"

const Scene = ({ className, ...props }) => {
  const { cameraHomePosition, cameraHomeLookAt } = useAppContext()
  const cameraRef = useRef()

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...cameraHomePosition)
      cameraRef.current.lookAt(...cameraHomeLookAt)
    }
  }, [cameraHomePosition, cameraHomeLookAt])

  return (
    <Canvas {...props}>
      <PerspectiveCamera ref={cameraRef} fov={30} makeDefault />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <OrbitControls />
      <Stars />
      <Break position={[0, 0, 0]} />
    </Canvas>
  )
}

export default Scene
