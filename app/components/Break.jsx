import { OrbitControls, Plane } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Pallet from "./Pallet"
import Stack from "./Stack"
import React, { useEffect, useMemo, useState } from "react"
import { useThree } from "@react-three/fiber"
import { useAppContext } from "../context/AppContext"

const Break = ({ position, orbitControlsRef, ...props }) => {
  const {
    palletDimensions,
    caseDimensions,
    upper,
    upperQuantity,
    lower,
    lowerQuantity,
    plus,
    palletCount,
    maxPlusHeight,
  } = useAppContext()

  const [activePalletIndex, setActivePalletIndex] = useState(null)
  const [returnHomeIndex, setReturnHomeIndex] = useState(null)
  const gap = caseDimensions.length * 2
  const palletActualWidth = palletDimensions.length * caseDimensions.length

  const { gl } = useThree()

  useEffect(() => {
    const handlePointerUp = () => {
      if (activePalletIndex !== null) {
        setReturnHomeIndex(activePalletIndex)
        setActivePalletIndex(null)
      }
    }

    gl.domElement.addEventListener("pointerup", handlePointerUp)

    return () => {
      gl.domElement.removeEventListener("pointerup", handlePointerUp)
    }
  }, [gl, activePalletIndex])

  const generatePalletPositions = (
    gap,
    palletActualWidth,
    numPallets,
    caseDimensions
  ) => {
    const totalWidth = palletActualWidth * numPallets + (numPallets - 1) * gap

    const startX = -totalWidth / 2 + palletActualWidth / 2
    const delta = palletActualWidth + gap

    const positions = []

    for (let i = 0; i < numPallets; i++) {
      const xPos = startX + i * delta
      positions.push([xPos, 0, 0])
    }

    return positions
  }

  const createPallets = (
    palletDimensions,
    upper,
    upperQuantity,
    lower,
    lowerQuantity
  ) => {
    let remainingUpper = upperQuantity
    let remainingLower = lowerQuantity
    const palletArea = palletDimensions.length * palletDimensions.width

    const palletPositions = generatePalletPositions(
      gap,
      palletActualWidth,
      palletCount,
      caseDimensions
    )

    const perfectUpperPallets = []
    const perfectLowerPallets = []
    const donutPallets = []
    const unevenPallets = []

    let index = 0

    if (
      Math.ceil(upperQuantity / (palletArea - 1)) -
        (lowerQuantity % palletArea) >=
        0 &&
      (upperQuantity + lowerQuantity) % palletArea === 0
    ) {
      const numDonuts =
        palletDimensions.length === palletDimensions.width &&
        palletDimensions.length % 2 === 1
          ? lowerQuantity % palletArea
          : 0

      for (let i = 0; i < numDonuts; i++) {
        donutPallets.push({
          upper,
          upperQuantity: palletArea - 1,
          lower,
          lowerQuantity: 1,
        })

        remainingUpper -= palletArea - 1
        remainingLower -= 1
      }
    }

    while (remainingUpper >= palletArea) {
      perfectUpperPallets.push({
        upper,
        upperQuantity: palletArea,
        lower,
        lowerQuantity: 0,
      })

      remainingUpper -= palletArea
    }

    while (remainingLower >= palletArea && lower > 1) {
      perfectLowerPallets.push({
        upper,
        upperQuantity: 0,
        lower,
        lowerQuantity: palletArea,
      })

      remainingLower -= palletArea
    }

    if (
      remainingUpper + remainingLower >= palletArea &&
      !(remainingUpper === 0 && remainingLower === palletArea)
    ) {
      unevenPallets.push({
        upper,
        upperQuantity: remainingUpper,
        lower,
        lowerQuantity: remainingLower,
      })

      remainingUpper -= remainingUpper
      remainingLower -= remainingLower
      index++
    }

    const palletInfo = [
      ...donutPallets,
      ...perfectUpperPallets,
      ...unevenPallets,
      ...perfectLowerPallets,
    ]

    const pallets = palletInfo.map((palletInfo, i) => {
      const pallet = (
        <Pallet
          palletDimensions={palletDimensions}
          key={i}
          upper={palletInfo.upper}
          upperQuantity={palletInfo.upperQuantity}
          lower={palletInfo.lower}
          lowerQuantity={palletInfo.lowerQuantity}
          position={palletPositions[i]}
          isActive={activePalletIndex === i}
          returnHome={returnHomeIndex === i}
          orbitControlsRef={orbitControlsRef}
          onClick={() => {
            if (activePalletIndex === i) {
              setActivePalletIndex(null)
            } else {
              setActivePalletIndex(i)
              setReturnHomeIndex(null)
            }
          }}
        />
      )

      return pallet
    })

    return pallets
  }

  const generateStackPositions = (
    palletDimensions,
    numStacks,
    caseDimensions,
    numPallets
  ) => {
    const positions = []
    const deltaX = caseDimensions.length * 2

    const totalWidth = palletActualWidth * numPallets + (numPallets - 1) * gap
    const startX =
      numPallets > 0
        ? totalWidth / 2 + gap + caseDimensions.length / 2
        : totalWidth / 2

    const y = -(palletDimensions.height / 2) * caseDimensions.height

    const z =
      (palletDimensions.width * caseDimensions.width) / 2 -
      caseDimensions.width / 2

    for (let i = 0; i < numStacks; i++) {
      const x = startX + i * deltaX
      positions.push([x, y, z])
    }

    return positions
  }

  const createPlusStacks = (plus, maxHeight) => {
    const numStacks = Math.ceil(plus / maxHeight)
    const lower = Math.floor(plus / numStacks)
    const upper = lower + 1
    const numTallStacks = plus % numStacks
    const numShortStacks = numStacks - numTallStacks

    const stacks = []
    let index = 0

    const stackPositions = generateStackPositions(
      palletDimensions,
      numStacks,
      caseDimensions,
      palletCount
    )

    for (let i = 0; i < numTallStacks; i++) {
      stacks.push(
        <Stack
          key={index}
          maxHeight={maxHeight}
          height={upper}
          position={stackPositions[index]}
        />
      )
      index++
    }

    for (let i = 0; i < numShortStacks; i++) {
      stacks.push(
        <Stack
          key={index}
          maxHeight={maxHeight}
          height={lower}
          position={stackPositions[index]}
        />
      )
      index++
    }

    return stacks
  }

  const pallets = createPallets(
    palletDimensions,
    upper,
    upperQuantity,
    lower,
    lowerQuantity
  )

  const plusStacks = !isNaN(plus) ? createPlusStacks(plus, maxPlusHeight) : null

  return (
    <>
      <group position={position}>{pallets}</group>
      {plusStacks && <group position={position}>{plusStacks}</group>}
    </>
  )
}

export default Break
