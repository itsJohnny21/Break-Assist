import React, { useState, useCallback, useRef, useEffect } from "react"
import Stack from "./Stack"
import { Vector3 } from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { useAppContext } from "../context/AppContext"
import AnimatedStack from "./AnimatedStack"
import * as THREE from "three"

const Pallet = ({
  palletDimensions,
  upper,
  upperQuantity,
  lower,
  lowerQuantity,
  opacity,
  position = [0, 0, 0],
  onClick,
  isActive,
  returnHome,
  ...props
}) => {
  const {
    caseDimensions,
    deconstructedTargetPositions,
    cameraHomePosition,
    cameraHomeLookAt,
  } = useAppContext()

  const { camera } = useThree()
  const homeCameraPosition = new Vector3(...cameraHomePosition)
  const homeLookAt = new Vector3(...cameraHomeLookAt)
  const palletRef = useRef()
  const centerIndex = Math.floor(
    (palletDimensions.length * palletDimensions.width) / 2
  )
  const centerDeconstructedStackPosition =
    deconstructedTargetPositions[centerIndex]

  const targetCameraPositionRef = useRef(new Vector3())
  const targetLookAtRef = useRef(new Vector3())
  const currentLookAtRef = useRef(new Vector3())

  useEffect(() => {
    if (palletRef.current) {
      const centerStackWorldPosition = palletRef.current.localToWorld(
        new Vector3(...centerDeconstructedStackPosition)
      )

      targetLookAtRef.current.copy(centerStackWorldPosition)
      targetCameraPositionRef.current.copy(
        centerStackWorldPosition.add(homeCameraPosition)
      )
    }
  }, [])

  const generateStackPositions = (
    palletDimensions,
    caseDimensions,
    spacing = 0
  ) => {
    const {
      length: numCasesX,
      height: numCasesY,
      width: numCasesZ,
    } = palletDimensions

    const startX = ((numCasesX - 1) * (caseDimensions.length + spacing)) / 2
    const startY = -(numCasesY * caseDimensions.height) / 2
    const startZ = ((numCasesZ - 1) * (caseDimensions.width + spacing)) / 2

    const positions = []

    for (let i = 0; i < numCasesZ; i++) {
      for (let j = 0; j < numCasesX; j++) {
        const xPos = startX - j * (caseDimensions.length + spacing)
        const zPos = startZ - i * (caseDimensions.width + spacing)
        positions.push([xPos, startY, zPos])
      }
    }

    return positions
  }

  const stackPositions = generateStackPositions(
    palletDimensions,
    caseDimensions
  )

  // const handlePalletClick = useCallback(
  //   (e) => {
  //     console.log(isActive)
  //     console.log(e)
  //     console.log("\n")
  //     console.log(e)
  //     if (animateIn) {
  //       setAnimateIn(false)
  //       setAnimateOut(true)
  //     } else {
  //       const palletWorldPosition = new Vector3()
  // palletRef.current.getWorldPosition(palletWorldPosition)
  //       const centerStackWorldPosition = palletRef.current.localToWorld(
  //         new Vector3(...centerDeconstructedStackPosition)
  //       )

  //       currentLookAtRef.current.set(0, 0, 0)
  //       targetLookAtRef.current.copy(centerStackWorldPosition)
  //       targetCameraPositionRef.current.copy(
  //         new Vector3().copy(centerStackWorldPosition).add(cameraHomePosition)
  //       )

  //       setAnimateIn(true)
  //     }
  //   },
  //   [setAnimateIn, setAnimateOut]
  // )

  useFrame(() => {
    let targetPosition
    let targetLookAt

    if (isActive) {
      targetPosition = targetCameraPositionRef.current
      targetLookAt = targetLookAtRef.current
    } else if (returnHome) {
      targetPosition = homeCameraPosition
      targetLookAt = homeLookAt
    }

    if (targetLookAt && targetPosition) {
      camera.position.lerp(targetPosition, 0.05)
      currentLookAtRef.current.lerp(targetLookAt, 0.05)
      camera.lookAt(currentLookAtRef.current)
    }
  })

  const isDonut =
    palletDimensions.length === palletDimensions.width &&
    palletDimensions.length % 2 === 1 &&
    upperQuantity === palletDimensions.length * palletDimensions.width - 1 &&
    lowerQuantity === 1

  const stacks = []
  let index = 0

  for (let i = 0; i < stackPositions.length; i++) {
    const stackPosition = stackPositions[i]
    const targetPosition = deconstructedTargetPositions[i]

    const isCenter = i === centerIndex
    const height =
      isCenter && isDonut ? lower : index++ < upperQuantity ? upper : lower

    stacks.push(
      <AnimatedStack
        key={i}
        maxHeight={palletDimensions.height}
        height={height}
        position={stackPosition}
        targetPosition={targetPosition}
        isActive={isActive}
      />
    )
  }

  return (
    <group ref={palletRef} position={position} onClick={onClick}>
      {stacks}
    </group>
  )
}

export default Pallet
