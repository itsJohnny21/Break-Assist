import { useLoader } from "@react-three/fiber"
import React, { useEffect, useRef } from "react"
import { Mesh, MeshStandardMaterial } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { clone } from "three/examples/jsm/utils/SkeletonUtils"

export const dimensions = { length: 2, height: 1.717, width: 2 }

const Case = ({ position, color, opacity = 1 }) => {
  const gltf = useLoader(GLTFLoader, "models/case.gltf")
  const modelRef = useRef()
  const instance = clone(gltf.scene)

  useEffect(() => {
    if (instance) {
      instance.children[0].material = new MeshStandardMaterial({
        color,
        opacity,
      })
    }
  }, [instance, color])

  return (
    <primitive
      object={instance}
      position={position}
      ref={modelRef}
      scale={[1, 1, 1]}
    />
  )
}

export default Case
