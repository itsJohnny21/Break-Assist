// // import { OrbitControls } from "@react-three/drei"
// // import { Canvas } from "@react-three/fiber"
// // import Pallet from "./Pallet"
// // import React, { useMemo } from "react"
// // import { useAppContext } from "../context/Context"

// // export const computeBreak = (palletDimensions, caseCount) => {
// //   const { length: L, width: W, height: H } = palletDimensions
// //   const A = L * W

// //   for (let h = H; h >= 1; h--) {
// //     const q = Math.floor(caseCount / (A * h))
// //     const r1 = caseCount % (A * h)
// //     const r2 = A * h - r1

// //     if (q > 0) {
// //       if (h === H && 0 <= r1 && r1 <= A) {
// //         return {
// //           upper: h,
// //           upperQuantity: A * q,
// //           lower: 1,
// //           lowerQuantity: r1,
// //         }
// //       } else if (h + 1 <= H && r1 <= A * q) {
// //         return {
// //           upper: h + 1,
// //           upperQuantity: r1,
// //           lower: h,
// //           lowerQuantity: A * q - r1,
// //         }
// //       } else if (h - 1 > 0 && r2 <= A * (q + 1)) {
// //         return {
// //           upper: h,
// //           upperQuantity: A * (q + 1) - r2,
// //           lower: h - 1,
// //           lowerQuantity: r2,
// //         }
// //       }
// //     }
// //   }

// //   return {
// //     upper: 1,
// //     upperQuantity: caseCount,
// //     lower: 0,
// //     lowerQuantity: 0,
// //   }
// // }

// // const Break = ({ ...props }) => {
// //   const context = useAppContext()
// //   const palletDimensions = useMemo(
// //     () => ({
// //       length: context.palletLength,
// //       height: context.palletHeight,
// //       width: context.palletWidth,
// //     }),
// //     [context.palletLength, context.palletHeight, context.palletWidth]
// //   )
// //   const caseDimensions = context.caseDimensions
// //   const caseCount = context.caseCount

// //   const generatePalletPositions = (
// //     palletDimensions,
// //     caseDimensions,
// //     numPallets
// //   ) => {
// //     const gap = caseDimensions.length * 2
// //     const palletWidth = palletDimensions.length * caseDimensions.length
// //     const totalWidth = palletWidth * numPallets + (numPallets - 1) * gap

// //     const startX = -totalWidth / 2 + palletWidth / 2
// //     const delta = palletWidth + gap

// //     const positions = []

// //     for (let i = 0; i < numPallets; i++) {
// //       const xPos = startX + i * delta
// //       positions.push([xPos, 0, 0])
// //     }

// //     return positions
// //   }

// //   const computePlus = (palletDimensions) => {
// //     const { height: H } = palletDimensions

// //     if (upper === 1) return upperQuantity
// //     if (upper === 2 && upperQuantity === 0) return lowerQuantity
// //     if (upper === H && lower === 1) return lowerQuantity
// //     return NaN
// //   }

// //   const computePalletCount = (
// //     palletDimensions,
// //     upper,
// //     upperQuantity,
// //     lower,
// //     lowerQuantity
// //   ) => {
// //     const { length: L, width: W, height: H } = palletDimensions
// //     const A = L * W

// //     let count
// //     if (upper === H && lower === 1) {
// //       count = upperQuantity / A
// //     } else if (upper === 2 && upperQuantity === 0) {
// //       count = upperQuantity / A
// //     } else {
// //       count = (upperQuantity + lowerQuantity) / A
// //     }

// //     return Math.floor(count)
// //   }

// //   const createPallets = (
// //     palletDimensions,
// //     upper,
// //     upperQuantity,
// //     lower,
// //     lowerQuantity
// //   ) => {
// //     const { length: L, width: W } = palletDimensions
// //     const A = L * W
// //     const numPallets = (upperQuantity + lowerQuantity) / A
// //     const perfectUpperPallets = Math.floor(upperQuantity / A)
// //     const perfectLowerPallets = Math.floor(lowerQuantity / A)

// //     const remainingUpperQuantity = upperQuantity % A
// //     const remainingLowerQuantity = lowerQuantity % A
// //     let index = 0

// //     const palletPositions = generatePalletPositions(
// //       palletDimensions,
// //       caseDimensions,
// //       numPallets
// //     )

// //     const pallets = []

// //     for (let i = 0; i < perfectUpperPallets; i++) {
// //       pallets.push(
// //         <Pallet
// //           key={index}
// //           upper={upper}
// //           upperQuantity={A}
// //           lower={lower}
// //           lowerQuantity={0}
// //           position={palletPositions[index]}
// //         />
// //       )
// //       index++
// //     }

// //     if (remainingUpperQuantity + remainingLowerQuantity === A) {
// //       pallets.push(
// //         <Pallet
// //           key={index}
// //           upper={upper}
// //           upperQuantity={remainingUpperQuantity}
// //           lower={lower}
// //           lowerQuantity={remainingLowerQuantity}
// //           position={palletPositions[index]}
// //         />
// //       )
// //       index++
// //     }

// //     for (let i = 0; i < perfectLowerPallets; i++) {
// //       pallets.push(
// //         <Pallet
// //           key={index}
// //           upper={upper}
// //           upperQuantity={0}
// //           lower={lower}
// //           lowerQuantity={A}
// //           position={palletPositions[index]}
// //         />
// //       )
// //       index++
// //     }

// //     return pallets
// //   }

// //   const { upper, upperQuantity, lower, lowerQuantity } = useMemo(() => {
// //     return computeBreak(palletDimensions, caseCount)
// //   }, [palletDimensions, caseCount])

// //   const plus = computePlus(palletDimensions)

// //   const palletCount = computePalletCount(
// //     palletDimensions,
// //     upper,
// //     upperQuantity,
// //     lower,
// //     lowerQuantity
// //   )

// //   const pallets = createPallets(
// //     palletDimensions,
// //     upper,
// //     upperQuantity,
// //     lower,
// //     lowerQuantity
// //   )

// //   return <group>{pallets}</group>
// // }

// // export default Break

// import React, { useState, useCallback, useRef, useEffect } from "react"
// import Stack from "./Stack"
// import { Vector3 } from "three"
// import { useFrame, useThree } from "@react-three/fiber"
// import { useAppContext } from "../context/AppContext"
// import AnimatedStack from "./AnimatedStack"

// const Pallet = ({
//   palletDimensions,
//   upper,
//   upperQuantity,
//   lower,
//   lowerQuantity,
//   opacity,
//   position = [0, 0, 0],
//   ...props
// }) => {
//   const { caseDimensions, deconstructedTargetPositions, cameraOffset } =
//     useAppContext()

//   const [targetCameraPosition, setTargetCameraPosition] = useState(cameraOffset)
//   const [animateCamera, setAnimateCamera] = useState(false)
//   const [animateStacks, setAnimateStacks] = useState(false)
//   const { camera } = useThree()
//   const palletRef = useRef()
//   const centerStackPositionRef = useRef(new Vector3())

//   const handlePalletClick = useCallback(
//     (stackPositions) => {
//       if (palletRef.current) {
//         // const worldPosition = new Vector3()
//         // palletRef.current.getWorldPosition(worldPosition)
//         // setTargetCameraPosition(
//         //   new Vector3().copy(worldPosition).add(cameraOffset)
//         // )

//         // const centerStackWorldPosition = new Vector3()
//         // if (stackPositions && stackPositions[stackPositions.length / 2]) {
//         //   const localCenterStackPosition = new Vector3(
//         //     ...stackPositions[stackPositions / 2]
//         //   )
//         //   palletRef.current.localToWorld(
//         //     centerStackWorldPosition.copy(localCenterStackPosition)
//         //   )
//         //   setTargetLookAt(centerStackWorldPosition)
//         //   centerStackPositionRef.current.copy(centerStackWorldPosition)
//         // }
//         setAnimateCamera(true)
//         setAnimateStacks(true)
//       }
//     },
//     [
//       setTargetCameraPosition,
//       setAnimateCamera,
//       cameraOffset,
//       // center,
//       // stackPositions,
//     ]
//   )

//   useFrame(() => {
//     if (animateCamera) {
//       // const currentPosition = camera.position
//       // const target = targetCameraPosition
//       // currentPosition.lerp(target, 0.05)
//       // const currentLookAt = camera.getWorldDirection(new Vector3())
//       // const targetLookAtDirection = new Vector3()
//       // targetLookAtDirection
//       //   .subVectors(centerStackPositionRef.current, currentPosition)
//       //   .normalize()
//       // currentLookAt.lerp(targetLookAtDirection, 0.05)
//       // const matrix = new THREE.Matrix4()
//       // matrix.lookAt(currentPosition, centerStackPositionRef.current, camera.up)
//       // camera.rotation.setFromRotationMatrix(matrix)
//       // if (currentPosition.distanceTo(target) < 0.1) {
//       //   setAnimateCamera(false)
//       // }
//     }
//   })

//   // useEffect(() => {
//   //   if (
//   //     palletRef.current &&
//   //     stackPositions &&
//   //     stackPositions[center] &&
//   //     stackPositions[center][center]
//   //   ) {
//   //     const centerStackWorldPosition = new Vector3()
//   //     const localCenterStackPosition = new Vector3(
//   //       ...stackPositions[center][center]
//   //     )
//   //     palletRef.current.localToWorld(
//   //       centerStackWorldPosition.copy(localCenterStackPosition)
//   //     )
//   //     setTargetLookAt(centerStackWorldPosition)
//   //     centerStackPositionRef.current.copy(centerStackWorldPosition)
//   //   }
//   // }, [center, stackPositions])

//   const generateStackPositions = (
//     palletDimensions,
//     caseDimensions,
//     spacing = 0
//   ) => {
//     const {
//       length: numCasesX,
//       height: numCasesY,
//       width: numCasesZ,
//     } = palletDimensions

//     const startX = ((numCasesX - 1) * (caseDimensions.length + spacing)) / 2
//     const startY = -(numCasesY * caseDimensions.height) / 2
//     const startZ = ((numCasesZ - 1) * (caseDimensions.width + spacing)) / 2

//     const positions = []

//     for (let i = 0; i < numCasesZ; i++) {
//       for (let j = 0; j < numCasesX; j++) {
//         const xPos = startX - j * (caseDimensions.length + spacing)
//         const zPos = startZ - i * (caseDimensions.width + spacing)
//         positions.push([xPos, startY, zPos])
//       }
//     }

//     return positions
//   }

//   const stackPositions = generateStackPositions(
//     palletDimensions,
//     caseDimensions
//   )

//   const isDonut =
//     palletDimensions.length === palletDimensions.width &&
//     palletDimensions.length % 2 === 1 &&
//     upperQuantity / (palletDimensions.length * palletDimensions.width - 1) ===
//       lowerQuantity

//   const center = Math.floor(palletDimensions.length / 2)
//   let index = 0

//   const stacks = stackPositions.map((stackPosition, i) => {
//     const targetPosition = deconstructedTargetPositions[i]

//     const isCenter = i === Math.floor(stackPositions.length / 2)
//     const height =
//       isCenter && isDonut ? lower : index++ < upperQuantity ? upper : lower

//     return (
//       <AnimatedStack
//         key={i}
//         maxHeight={palletDimensions.height}
//         height={height}
//         position={stackPosition}
//         targetPosition={targetPosition || stackPosition}
//         animateState={[animateStacks, setAnimateStacks]}
//       />
//     )
//   })

//   return (
//     <group ref={palletRef} position={position} onClick={handlePalletClick}>
//       {stacks}
//     </group>
//   )
// }

// export default Pallet

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

    // if (targetPosition) {
    //   console.log(camera.position.distanceTo(targetPosition))
    // }

    // if (targetLookAt) {
    //   console.log(currentLookAtRef.current.distanceTo(targetLookAt))
    // }

    if (targetLookAt && targetPosition) {
      if (
        camera.position.distanceTo(targetPosition) >= 0.01 ||
        currentLookAtRef.current.distanceTo(targetLookAt) >= 0.1
      ) {
        camera.position.lerp(targetPosition, 0.05)
        currentLookAtRef.current.lerp(targetLookAt, 0.05)
        camera.lookAt(currentLookAtRef.current)

        console.log("bruh")
      }
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
