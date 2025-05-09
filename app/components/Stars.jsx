import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import Pallet from "./Pallet"
import React, { useRef, useState, useEffect, useCallback } from "react"
import { dimensions as cubeDimensions } from "./Case"
import Break from "./Break"

import * as THREE from "three"

const Stars = ({ count = 500 }) => {
  const [stars, setStars] = useState(null)
  const { scene } = useThree()

  const generateStars = useCallback((numStars) => {
    const pointsGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(numStars * 3)
    const colors = new Float32Array(numStars * 3)

    for (let i = 0; i < numStars; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 3000
      positions[i3 + 1] = (Math.random() - 0.5) * 3000
      positions[i3 + 2] = (Math.random() - 0.5) * 3000

      const color = new THREE.Color()
      color.setHSL(Math.random(), Math.random(), 1)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    )
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 5,
      sizeAttenuation: true,
      vertexColors: true,
    })

    const stars = new THREE.Points(pointsGeometry, material)
    return stars
  }, [])

  useEffect(() => {
    const generatedStars = generateStars(count)
    setStars(generatedStars)
  }, [generateStars, count])

  useEffect(() => {
    if (stars) {
      scene.add(stars)
    }
    return () => {
      if (stars) {
        scene.remove(stars)
      }
    }
  }, [stars])

  useFrame((state, delta) => {
    if (stars) {
      stars.rotation.y += delta * 0.1
    }
  })

  return null
}

export default Stars
