import React, { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import Button from "./Button"

const DimensionsMenu = ({ className, ...props }) => {
  const { palletLength, palletHeight, palletWidth, settings } = useAppContext()
  const { tmpPalletLength, tmpPalletHeight, tmpPalletWidth } = useAppContext()

  const [localPalletLength, setLocalPalletLength] = useState(palletLength)
  const [localPalletHeight, setLocalPalletHeight] = useState(palletHeight)
  const [localPalletWidth, setLocalPalletWidth] = useState(palletWidth)

  const handleIncrement = (setting, localValue, setLocalValue) => {
    const newValue = localValue + 1
    const validatedValue = settings[setting].validator(newValue)

    if (validatedValue !== null) {
      setLocalValue(validatedValue)
    }
  }

  const handleDecrement = (setting, localValue, setLocalValue) => {
    const newValue = localValue - 1
    const validatedValue = settings[setting].validator(newValue)

    if (validatedValue !== null) {
      setLocalValue(validatedValue)
    }
  }

  useEffect(() => {
    setLocalPalletLength(palletLength)
    setLocalPalletHeight(palletHeight)
    setLocalPalletWidth(palletWidth)
  }, [palletLength, palletHeight, palletWidth])

  const handleBlur = (setting, localValue, setLocalValue) => {
    const validatedValue = settings[setting].validator(localValue)

    if (validatedValue !== null) {
      setLocalValue(validatedValue)
    }
  }

  const disableDonut =
    localPalletLength !== localPalletWidth ||
    localPalletLength % 2 === 0 ||
    localPalletWidth % 2 === 0

  const handleInputChange = (setting, localValue, setLocalValue) => {
    setLocalValue(localValue)
  }

  return (
    <div className={`flex flex-col w-full gap-5 py-3 px-6 ${className || ""}`}>
      <div className="flex flex-col gap-1 justify-items-center">
        <h2 className="text-lg font-semibold pb-2">Pallet Dimensions</h2>
        <div className="flex flex-row justify-between">
          <label htmlFor="palletLength" className="text-left">
            length
          </label>
          <div className="flex-row justify-center gap-0 text-center">
            <Button
              className="text-center text-tertionary"
              onClick={(e) =>
                handleDecrement(
                  "palletLength",
                  localPalletLength,
                  setLocalPalletLength
                )
              }
            >
              -
            </Button>
            <input
              id="palletLength"
              value={localPalletLength}
              onChange={(e) =>
                handleInputChange(
                  "palletLength",
                  e.target.value,
                  setLocalPalletLength
                )
              }
              onBlur={(e) =>
                handleBlur(
                  "palletLength",
                  localPalletLength,
                  setLocalPalletLength
                )
              }
              className="text-center border-2 rounded"
              type="number"
            ></input>
            <Button
              className="text-center text-tertionary"
              onClick={(e) =>
                handleIncrement(
                  "palletLength",
                  localPalletLength,
                  setLocalPalletLength
                )
              }
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="palletWidth" className="text-left">
            width
          </label>
          <div className="flex-row justify-center text-center">
            <Button
              className="text-center text-tertionary"
              onClick={(e) =>
                handleDecrement(
                  "palletWidth",
                  localPalletWidth,
                  setLocalPalletWidth
                )
              }
            >
              -
            </Button>
            <input
              id="palletWidth"
              value={localPalletWidth}
              onChange={(e) =>
                handleInputChange(
                  "palletWidth",
                  e.target.value,
                  setLocalPalletWidth
                )
              }
              onBlur={(e) =>
                handleBlur("palletWidth", localPalletWidth, setLocalPalletWidth)
              }
              className="text-center border-2 rounded"
              type="number"
            ></input>
            <Button
              className="text-center text-tertionary"
              onClick={(e) =>
                handleIncrement(
                  "palletWidth",
                  localPalletWidth,
                  setLocalPalletWidth
                )
              }
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="palletHeight" className="text-right">
            height
          </label>
          <div className="flex-row justify-center text-center">
            <Button
              className="text-center text-tertionary"
              onClick={(e) =>
                handleDecrement(
                  "palletHeight",
                  localPalletHeight,
                  setLocalPalletHeight
                )
              }
            >
              -
            </Button>
            <input
              id="palletHeight"
              value={localPalletHeight}
              onChange={(e) =>
                handleInputChange(
                  "palletHeight",
                  e.target.value,
                  setLocalPalletHeight
                )
              }
              onBlur={(e) =>
                handleBlur(
                  "palletHeight",
                  localPalletHeight,
                  setLocalPalletHeight
                )
              }
              className="text-center border-2 rounded"
              type="number"
            ></input>
            <Button
              className="text-center text-tertionary"
              onClick={(e) =>
                handleIncrement(
                  "palletHeight",
                  localPalletHeight,
                  setLocalPalletHeight
                )
              }
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DimensionsMenu
