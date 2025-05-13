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
  ...props
}) => {
  const {
    caseDimensions,
    deconstructedTargetPositions,
    cameraHomePosition,
    cameraHomeLookAt,
  } = useAppContext()

  const { camera } = useThree()
  const homeCameraPositionRef = useRef(new Vector3(...cameraHomePosition))
  const homeLookAtRef = useRef(new Vector3(...cameraHomeLookAt))
  const palletRef = useRef()
  const centerIndex = Math.floor(
    (palletDimensions.length * palletDimensions.width) / 2
  )
  const centerDeconstructedStackPosition =
    deconstructedTargetPositions[centerIndex]

  // const palletWorldPosition = new Vector3()
  // palletRef.current.getWorldPosition(palletWorldPosition)

  // console.log(palletRef.current)

  const targetCameraPositionRef = useRef(new Vector3())
  // palletRef.current
  //   .getWorldPosition(centerDeconstructedStackPosition)
  //   .add(cameraHomePosition)

  const targetLookAtRef = useRef(new Vector3())
  const currentLookAtRef = useRef(new Vector3())

  useEffect(() => {
    if (palletRef.current) {
      targetCameraPositionRef.current.copy(
        palletRef.current
          .getWorldPosition(new Vector3(...centerDeconstructedStackPosition))
          .add(homeCameraPositionRef.current)
      )

      // targetLookAtRef.current.copy(
      //   targetCameraPositionRef.current
      //   // palletRef.current.getWorldPosition(
      //   //   new Vector3(...centerDeconstructedStackPosition)
      //   // )
      // )
    }
  }, [palletRef, centerDeconstructedStackPosition])

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
    if (isActive) {
      const targetPosition = targetCameraPositionRef.current
      camera.position.lerp(targetPosition, 0.05)
      // const targetLookAt = targetLookAtRef.current
      // currentLookAtRef.current.lerp(targetLookAt, 0.05)
      // camera.lookAt(currentLookAtRef.current)
    } else {
      // const targetPosition = homeCameraPositionRef.current
      // camera.position.lerp(targetPosition, 0.05)
      // console.log(homeCameraPositionRef.current)
      // const targetLookAt = homeLookAtRef.current
      // currentLookAtRef.current.lerp(targetLookAt)
      // camera.lookAt(currentLookAtRef.current)
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
