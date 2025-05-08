import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Pallet from "./Pallet"
import React, { useMemo } from "react"
import { useAppContext } from "../context/Context"

export const computeBreak = (palletDimensions, caseCount) => {
  const { length: L, width: W, height: H } = palletDimensions
  const A = L * W

  for (let h = H; h >= 1; h--) {
    const q = Math.floor(caseCount / (A * h))
    const r1 = caseCount % (A * h)
    const r2 = A * h - r1

    if (q > 0) {
      if (h === H && 0 <= r1 && r1 <= A) {
        return {
          upper: h,
          upperQuantity: A * q,
          lower: 1,
          lowerQuantity: r1,
        }
      } else if (h + 1 <= H && r1 <= A * q) {
        return {
          upper: h + 1,
          upperQuantity: r1,
          lower: h,
          lowerQuantity: A * q - r1,
        }
      } else if (h - 1 > 0 && r2 <= A * (q + 1)) {
        return {
          upper: h,
          upperQuantity: A * (q + 1) - r2,
          lower: h - 1,
          lowerQuantity: r2,
        }
      }
    }
  }

  return {
    upper: 1,
    upperQuantity: caseCount,
    lower: 0,
    lowerQuantity: 0,
  }
}

const Break = ({ ...props }) => {
  const context = useAppContext()
  const palletDimensions = useMemo(
    () => ({
      length: context.palletLength,
      height: context.palletHeight,
      width: context.palletWidth,
    }),
    [context.palletLength, context.palletHeight, context.palletWidth]
  )
  const caseDimensions = context.caseDimensions
  const caseCount = context.caseCount

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

  const computePlus = (palletDimensions) => {
    const { height: H } = palletDimensions

    if (upper === 1) return upperQuantity
    if (upper === 2 && upperQuantity === 0) return lowerQuantity
    if (upper === H && lower === 1) return lowerQuantity
    return NaN
  }

  const computePalletCount = (
    palletDimensions,
    upper,
    upperQuantity,
    lower,
    lowerQuantity
  ) => {
    const { length: L, width: W, height: H } = palletDimensions
    const A = L * W

    let count
    if (upper === H && lower === 1) {
      count = upperQuantity / A
    } else if (upper === 2 && upperQuantity === 0) {
      count = upperQuantity / A
    } else {
      count = (upperQuantity + lowerQuantity) / A
    }

    return Math.floor(count)
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

  const { upper, upperQuantity, lower, lowerQuantity } = useMemo(() => {
    return computeBreak(palletDimensions, caseCount)
  }, [palletDimensions, caseCount])

  const plus = computePlus(palletDimensions)

  const palletCount = computePalletCount(
    palletDimensions,
    upper,
    upperQuantity,
    lower,
    lowerQuantity
  )

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
