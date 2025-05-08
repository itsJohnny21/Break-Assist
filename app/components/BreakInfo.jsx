import Image from "next/image"
import Button from "./Button"
import { useState } from "react"

const BreakInfo = ({ className, breakk, ...props }) => {
  const [isOn, setIsOn] = useState(false)

  return (
    <div className={`flex-col text-center ${className}`} {...props}>
      <span>{`pallet count: ${breakk.palletCount}`}</span>
      <div className="flex-row justify-center text-center space-x-64">
        {isNaN(breakk.plus) ? (
          <>
            <span>{`${breakk.upper}-high: ${breakk.upperQuantity}`}</span>
            <span>{`${breakk.lower}-high: ${breakk.lowerQuantity}`}</span>
          </>
        ) : breakk.upper === 1 || breakk.upperQuantity === 0 ? (
          <span>{`plus: ${breakk.plus}`}</span>
        ) : (
          <>
            <span>{`${breakk.upper}-high: ${breakk.upperQuantity}`}</span>
            <span>{`plus: ${breakk.plus}`}</span>
          </>
        )}
      </div>
      <Button
        className={isOn ? "bg-valid" : "bg-error"}
        onClick={(e) => setIsOn(!isOn)}
      >
        {isOn ? "on" : "off"}
      </Button>
    </div>
  )
}

export default BreakInfo
