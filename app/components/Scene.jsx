import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Pallet from "./Pallet"
import React from "react"
import { dimensions as cubeDimensions } from "./Case"
import Break from "./Break"

const Scene = ({ className, palletDimensions, caseCount, ...props }) => {
  return (
    <Canvas camera={{ fov: 30, position: [0, 0, 30] }} {...props}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <OrbitControls />
      <Break palletDimensions={palletDimensions} caseCount={caseCount} />
    </Canvas>
  )
}

export default Scene
