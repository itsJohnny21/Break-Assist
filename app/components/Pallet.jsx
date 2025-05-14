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
  orbitControlsRef,
  ...props
}) => {
  const {
    caseDimensions,
    deconstructedTargetPositions,
    cameraHomePosition,
    cameraHomeLookAt,
    deconstructedGap,
  } = useAppContext()

  const [isActiveAnimate, setIsActiveAnimate] = useState(isActive)
  const [returnHomeAnimate, setReturnHomeAnimate] = useState(returnHome)

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

      targetLookAtRef.current
        .copy(centerStackWorldPosition)
        .add(
          new Vector3(0, (palletDimensions.height * caseDimensions.height) / 2)
        )
      targetCameraPositionRef.current.copy(
        centerStackWorldPosition.add(homeCameraPosition)
      )

      if ((palletDimensions.length * palletDimensions.width) % 2 === 0) {
        const deltaX = deconstructedGap / 2
        targetCameraPositionRef.current.add(new Vector3(deltaX, 0, 0))
        targetLookAtRef.current.add(new Vector3(deltaX, 0, 0))
      }
    }
  }, [centerDeconstructedStackPosition, palletDimensions, isActive, returnHome])

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

  useEffect(() => {
    setIsActiveAnimate(isActive)
  }, [isActive])

  useEffect(() => {
    setReturnHomeAnimate(returnHome)
  }, [returnHome])

  useFrame(() => {
    if (!isActiveAnimate && !returnHomeAnimate) return

    let targetPosition
    let targetLookAt

    if (isActiveAnimate) {
      targetPosition = targetCameraPositionRef.current
      targetLookAt = targetLookAtRef.current
      orbitControlsRef.current.enabled = false

      if (
        camera.position.distanceTo(targetPosition) >= 0.1 ||
        currentLookAtRef.current.distanceTo(targetLookAt) >= 0.1
      ) {
        camera.position.lerp(targetPosition, 0.05)
        currentLookAtRef.current.lerp(targetLookAt, 0.05)
        camera.lookAt(currentLookAtRef.current)
      } else {
        setIsActiveAnimate(false)
      }
    } else if (returnHomeAnimate) {
      targetPosition = homeCameraPosition
      targetLookAt = homeLookAt
      if (
        camera.position.distanceTo(targetPosition) >= 0.1 ||
        currentLookAtRef.current.distanceTo(targetLookAt) >= 0.1
      ) {
        camera.position.lerp(targetPosition, 0.1)
        currentLookAtRef.current.lerp(targetLookAt, 0.1)
        camera.lookAt(currentLookAtRef.current)
      } else {
        setReturnHomeAnimate(false)
        orbitControlsRef.current.enabled = true
      }
    }
  })

  //todo: make the color of pallets changable and make settings use url instead of state vars

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
