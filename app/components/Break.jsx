import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Pallet from "./Pallet"
import React, { useMemo } from "react"
import { useAppContext } from "../context/AppContext"

const Break = ({ ...props }) => {
  const {
    palletDimensions,
    caseDimensions,
    caseCount,
    upper,
    upperQuantity,
    lower,
    lowerQuantity,
    plus,
    palletCount,
  } = useAppContext()

  const generatePalletPositions = (
    palletDimensions,
    caseDimensions,
    numPallets
  ) => {
    const gap = caseDimensions.length * 2
    const palletWidth = palletDimensions.length * caseDimensions.length
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
    const numPallets = (upperQuantity + lowerQuantity) / A
    const perfectUpperPallets = Math.floor(upperQuantity / A)
    const perfectLowerPallets = Math.floor(lowerQuantity / A)

    const remainingUpperQuantity = upperQuantity % A
    const remainingLowerQuantity = lowerQuantity % A
    let index = 0

    const palletPositions = generatePalletPositions(
      palletDimensions,
      caseDimensions,
      numPallets
    )

    const pallets = []

    for (let i = 0; i < perfectUpperPallets; i++) {
      pallets.push(
        <Pallet
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

  const pallets = createPallets(
    palletDimensions,
    upper,
    upperQuantity,
    lower,
    lowerQuantity
  )

  return <group>{pallets}</group>
}

export default Break
