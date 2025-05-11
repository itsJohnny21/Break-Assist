import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Pallet from "./Pallet"
import Stack from "./Stack"
import React, { useMemo } from "react"
import { useAppContext } from "../context/AppContext"

const Break = ({ position = [0, 0, 0], ...props }) => {
  const {
    palletDimensions,
    caseDimensions,
    upper,
    upperQuantity,
    lower,
    lowerQuantity,
    plus,
    palletCount,
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
    const { length: L, width: W } = palletDimensions
    const A = L * W
    const perfectUpperPallets = Math.floor(upperQuantity / A)
    const perfectLowerPallets = lower > 1 ? Math.floor(lowerQuantity / A) : 0

    const remainingUpperQuantity = upperQuantity % A
    const remainingLowerQuantity = lowerQuantity % A
    let index = 0

    const palletPositions = generatePalletPositions(
      gap,
      palletWidth,
      palletCount,
      caseDimensions
    )

    const pallets = []

    for (let i = 0; i < perfectUpperPallets; i++) {
      pallets.push(
        <Pallet
          palletDimensions={palletDimensions}
          key={index}
          upper={upper}
          upperQuantity={A}
          lower={lower}
          lowerQuantity={0}
          position={palletPositions[index]}
        />
      )
      index++
    }

    if (remainingUpperQuantity + remainingLowerQuantity === A) {
      pallets.push(
        <Pallet
          palletDimensions={palletDimensions}
          key={index}
          upper={upper}
          upperQuantity={remainingUpperQuantity}
          lower={lower}
          lowerQuantity={remainingLowerQuantity}
          position={palletPositions[index]}
        />
      )
      index++
    }

    for (let i = 0; i < perfectLowerPallets; i++) {
      pallets.push(
        <Pallet
          palletDimensions={palletDimensions}
          key={index}
          upper={upper}
          upperQuantity={0}
          lower={lower}
          lowerQuantity={A}
          position={palletPositions[index]}
        />
      )
      index++
    }

    return pallets
  }

  const generateStackPositions = (
    palletDimensions,
    numStacks,
    caseDimensions,
    startingPosition
  ) => {
    const positions = []
    const deltaX = caseDimensions.length * 2

    for (let i = 0; i < numStacks; i++) {
      const x = startingPosition[0] + i * deltaX
      const y =
        startingPosition[1] -
        (palletDimensions.height / 2) * caseDimensions.height
      const z = startingPosition[2]
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
      startingPosition
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

    plusStacks = createPlusStacks(
      plus,
      palletDimensions.height - 1,
      initialPosition
    )
  }

  return (
    <>
      <group position={position}>{pallets}</group>
      {plusStacks && <group position={position}>{plusStacks}</group>}
    </>
  )
}

export default Break
