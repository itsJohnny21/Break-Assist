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
  const orbitControlsRef = useRef()

  return (
    <Canvas camera={{ fov: 30, position: cameraHomePosition }} {...props}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <OrbitControls
        ref={orbitControlsRef}
        ref={orbitControlsRef}
        target={cameraHomeLookAt}
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
      />
      <Stars />
      <Break position={[0, 0, 0]} orbitControlsRef={orbitControlsRef} />
    </Canvas>
  )
}

export default Scene
