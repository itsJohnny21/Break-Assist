import Image from "next/image"
import Button from "./Button"
import { useState } from "react"
import { computeBreak } from "./Break"
import { useAppContext } from "../context/AppContext"

const BreakInfo = ({ className, ...props }) => {
  const {
    upper,
    upperQuantity,
    lower,
    lowerQuantity,
    plus,
    palletCount,
    palletDimensions,
    caseCount,
  } = useAppContext()

  return (
    <div className={`flex-col text-center ${className}`} {...props}>
      <span>{`pallet count: ${palletCount}`}</span>
      <div className="flex-row justify-center text-center space-x-64">
        {isNaN(plus) ? (
          <>
            <span>{`${upper}-high: ${upperQuantity}`}</span>
            <span>{`${lower}-high: ${lowerQuantity}`}</span>
          </>
        ) : upper === 1 || upperQuantity === 0 ? (
          <span>{`plus: ${plus}`}</span>
        ) : (
          <>
            <span>{`${upper}-high: ${upperQuantity}`}</span>
            <span>{`plus: ${plus}`}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default BreakInfo
