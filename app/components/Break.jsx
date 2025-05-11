import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Pallet from "./Pallet"
import Stack from "./Stack"
import React, { useMemo } from "react"
import { useAppContext } from "../context/AppContext"

const Break = ({ position, ...props }) => {
  const {
    palletDimensions,
    caseDimensions,
    upper,
    upperQuantity,
    lower,
    lowerQuantity,
    plus,
    palletCount,
    maxHeightSingleStack,
  } = useAppContext()

  const gap = caseDimensions.length * 2
  const palletWidth = palletDimensions.length * caseDimensions.length

  const generatePalletPositions = (
    gap,
    palletWidth,
    numPallets,
    caseDimensions
  ) => {
    const totalWidth = palletWidth * numPallets + (numPallets - 1) * gap

    const startX = -totalWidth / 2 + palletWidth / 2
    const delta = palletWidth + gap

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
      palletWidth,
      palletCount,
      caseDimensions
    )

    const perfectUpperPallets = []
    const perfectLowerPallets = []
    const donutPallets = []
    const unevenPallets = []

    let index = 0
    let specialCase = false

    if (
      remainingLower % palletArea === 0 &&
      lower === 1 &&
      remainingUpper > 0 &&
      remainingLower > 0 &&
      !(remainingLower === palletArea)
    ) {
      remainingUpper -= 1
      remainingLower -= palletArea - 1
      specialCase = true
    }

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

    if (specialCase) {
      unevenPallets.push({
        upper,
        upperQuantity: palletArea - 1,
        lower,
        lowerQuantity: 1,
      })

      remainingUpper -= palletArea - 1
      remainingLower -= 1

      unevenPallets.push({
        upper,
        upperQuantity: 1,
        lower,
        lowerQuantity: palletArea - 1,
      })
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
      return (
        <Pallet
          palletDimensions={palletDimensions}
          key={i}
          upper={palletInfo.upper}
          upperQuantity={palletInfo.upperQuantity}
          lower={palletInfo.lower}
          lowerQuantity={palletInfo.lowerQuantity}
          position={palletPositions[i]}
        />
      )
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

    const totalWidth = palletWidth * numPallets + (numPallets - 1) * gap
    const startX = totalWidth / 2 + gap + caseDimensions.length / 2

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

  const createPlusStacks = (plus, maxHeight, startingPosition) => {
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

  let plusStacks = null
  if (!isNaN(plus)) {
    const totalWidth = palletWidth * palletCount + (palletCount - 1) * gap
    const delta = palletWidth + gap
    const startX =
      -totalWidth / 2 +
      palletWidth / 2 +
      delta * (palletCount - 1) +
      palletWidth / 2 +
      caseDimensions.length * 2

    const initialPosition = [startX, 0, caseDimensions.width]

    if (pallets.length === 0) {
      initialPosition[0] -= (palletWidth + gap) / 2 - caseDimensions.length / 2
    }

    plusStacks = createPlusStacks(plus, maxHeightSingleStack, initialPosition)
  }

  return (
    <>
      <group position={position}>{pallets}</group>
      {plusStacks && <group position={position}>{plusStacks}</group>}
    </>
  )
}

export default Break
