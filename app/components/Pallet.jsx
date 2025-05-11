import React, { useState, useCallback, useRef, useEffect } from "react"
import Stack from "./Stack"
import { Vector3 } from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { useAppContext } from "../context/AppContext"
import AnimatedStack from "./AnimatedStack"

const Pallet = ({
  palletDimensions,
  upper,
  upperQuantity,
  lower,
  lowerQuantity,
  opacity,
  position = [0, 0, 0],
  ...props
}) => {
  const { caseDimensions, deconstructedTargetPositions, cameraOffset } =
    useAppContext()

  const [targetCameraPosition, setTargetCameraPosition] = useState(cameraOffset)
  const [animateCamera, setAnimateCamera] = useState(false)
  const [animateStacks, setAnimateStacks] = useState(false)
  const { camera } = useThree()
  const palletRef = useRef()
  const centerStackPositionRef = useRef(new Vector3())

  const handlePalletClick = useCallback(
    (stackPositions) => {
      if (palletRef.current) {
        // const worldPosition = new Vector3()
        // palletRef.current.getWorldPosition(worldPosition)
        // setTargetCameraPosition(
        //   new Vector3().copy(worldPosition).add(cameraOffset)
        // )

        // const centerStackWorldPosition = new Vector3()
        // if (stackPositions && stackPositions[stackPositions.length / 2]) {
        //   const localCenterStackPosition = new Vector3(
        //     ...stackPositions[stackPositions / 2]
        //   )
        //   palletRef.current.localToWorld(
        //     centerStackWorldPosition.copy(localCenterStackPosition)
        //   )
        //   setTargetLookAt(centerStackWorldPosition)
        //   centerStackPositionRef.current.copy(centerStackWorldPosition)
        // }
        setAnimateCamera(true)
        setAnimateStacks(true)
      }
    },
    [
      setTargetCameraPosition,
      setAnimateCamera,
      cameraOffset,
      // center,
      // stackPositions,
    ]
  )

  useFrame(() => {
    if (animateCamera) {
      // const currentPosition = camera.position
      // const target = targetCameraPosition
      // currentPosition.lerp(target, 0.05)
      // const currentLookAt = camera.getWorldDirection(new Vector3())
      // const targetLookAtDirection = new Vector3()
      // targetLookAtDirection
      //   .subVectors(centerStackPositionRef.current, currentPosition)
      //   .normalize()
      // currentLookAt.lerp(targetLookAtDirection, 0.05)
      // const matrix = new THREE.Matrix4()
      // matrix.lookAt(currentPosition, centerStackPositionRef.current, camera.up)
      // camera.rotation.setFromRotationMatrix(matrix)
      // if (currentPosition.distanceTo(target) < 0.1) {
      //   setAnimateCamera(false)
      // }
    }
  })

  // useEffect(() => {
  //   if (
  //     palletRef.current &&
  //     stackPositions &&
  //     stackPositions[center] &&
  //     stackPositions[center][center]
  //   ) {
  //     const centerStackWorldPosition = new Vector3()
  //     const localCenterStackPosition = new Vector3(
  //       ...stackPositions[center][center]
  //     )
  //     palletRef.current.localToWorld(
  //       centerStackWorldPosition.copy(localCenterStackPosition)
  //     )
  //     setTargetLookAt(centerStackWorldPosition)
  //     centerStackPositionRef.current.copy(centerStackWorldPosition)
  //   }
  // }, [center, stackPositions])

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
      const row = []
      for (let j = 0; j < numCasesX; j++) {
        const xPos = startX - j * (caseDimensions.length + spacing)
        const zPos = startZ - i * (caseDimensions.width + spacing)
        row.push([xPos, startY, zPos])
      }
      positions.push(row)
    }

    return positions
  }

  const stackPositions = generateStackPositions(
    palletDimensions,
    caseDimensions
  )

  const isDonut =
    palletDimensions.length === palletDimensions.width &&
    palletDimensions.length % 2 === 1 &&
    upperQuantity === palletDimensions.length * palletDimensions.width - 1 &&
    lowerQuantity === 1

  const centerRow = Math.floor(palletDimensions.length / 2)
  const centerCol = Math.floor(palletDimensions.width / 2)
  let index = 0

  const stacks = stackPositions.map((row, i) =>
    row.map((stackPosition, j) => {
      const targetPosition =
        deconstructedTargetPositions[i * stackPositions.length + j]

      const isCenter = i === centerRow && j === centerCol
      const height =
        isCenter && isDonut ? lower : index++ < upperQuantity ? upper : lower

      return (
        <AnimatedStack
          key={`${i}-${j}`}
          maxHeight={palletDimensions.height}
          height={height}
          position={stackPosition}
          targetPosition={targetPosition || stackPosition}
          animateState={[animateStacks, setAnimateStacks]}
        />
      )
    })
  )

  return (
    <group ref={palletRef} position={position} onClick={handlePalletClick}>
      {stacks}
    </group>
  )
}

export default Pallet
