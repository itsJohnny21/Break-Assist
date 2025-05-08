import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Pallet from "./Pallet"
import React from "react"
import { dimensions as cubeDimensions } from "./Case"

const Scene = ({ breakk, className, palletDimensions, ...props }) => {
  return (
    <Canvas camera={{ fov: 30, position: [0, 0, 30] }} {...props}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <OrbitControls />
      <group>
        {Array.from({ length: breakk.palletCount }).map((_, i) => {
          const gap = cubeDimensions.length * 2
          const palletWidth = breakk.dimensions.length * cubeDimensions.length
          const totalWidth =
            palletWidth * breakk.palletCount + (breakk.palletCount - 1) * gap

          const startX = -totalWidth / 2 + palletWidth / 2
          const delta = palletWidth + gap
          const xPos = startX + i * delta

          return (
            <Pallet
              dimensions={palletDimensions}
              key={i}
              position={[xPos, 0, 0]}
            />
          )
        })}
      </group>
    </Canvas>
  )
}

export default Scene
