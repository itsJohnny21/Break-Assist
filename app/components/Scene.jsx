import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Pallet from "./Pallet"
import React from "react"
import { dimensions as cubeDimensions } from "./Case"
import Break from "./Break"
import Stars from "./Stars"

const Scene = ({ className, ...props }) => {
  return (
    <Canvas
      camera={{ fov: 30, position: [0, 10, 40] }}
      {...props}
      style={{ background: "var(--background)", height: "65vh" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <OrbitControls />
      <Stars />
      <Break />
    </Canvas>
  )
}

export default Scene
