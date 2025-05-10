import React, { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import Button from "./Button"

const DimensionsMenu = ({ className, ...props }) => {
  const { palletLength, palletHeight, palletWidth, settings } = useAppContext()
  const {
    tmpPalletLength,
    setTmpPalletLength,
    tmpPalletHeight,
    setTmpPalletHeight,
    tmpPalletWidth,
    setTmpPalletWidth,
  } = useAppContext()

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
    setTmpPalletLength(palletLength)
    setTmpPalletHeight(palletHeight)
    setTmpPalletWidth(palletWidth)
  }, [palletLength, palletHeight, palletWidth])

  const handleBlur = (setting, localValue, setLocalValue) => {
    const validatedValue = settings[setting].validator(localValue)

    if (validatedValue !== null) {
      setLocalValue(validatedValue)
    }
  }

  const disableDonut =
    tmpPalletLength !== tmpPalletWidth ||
    tmpPalletLength % 2 === 0 ||
    tmpPalletWidth % 2 === 0

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
                  tmpPalletLength,
                  setTmpPalletLength
                )
              }
            >
              -
            </Button>
            <input
              id="palletLength"
              value={tmpPalletLength}
              onChange={(e) =>
                handleInputChange(
                  "palletLength",
                  e.target.value,
                  setTmpPalletLength
                )
              }
              onBlur={(e) =>
                handleBlur("palletLength", tmpPalletLength, setTmpPalletLength)
              }
              className="text-center border-2 rounded"
              type="number"
            ></input>
            <Button
              className="text-center text-tertionary"
              onClick={(e) =>
                handleIncrement(
                  "palletLength",
                  tmpPalletLength,
                  setTmpPalletLength
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
                  tmpPalletWidth,
                  setTmpPalletWidth
                )
              }
            >
              -
            </Button>
            <input
              id="palletWidth"
              value={tmpPalletWidth}
              onChange={(e) =>
                handleInputChange(
                  "palletWidth",
                  e.target.value,
                  setTmpPalletWidth
                )
              }
              onBlur={(e) =>
                handleBlur("palletWidth", tmpPalletWidth, setTmpPalletWidth)
              }
              className="text-center border-2 rounded"
              type="number"
            ></input>
            <Button
              className="text-center text-tertionary"
              onClick={(e) =>
                handleIncrement(
                  "palletWidth",
                  tmpPalletWidth,
                  setTmpPalletWidth
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
                  tmpPalletHeight,
                  setTmpPalletHeight
                )
              }
            >
              -
            </Button>
            <input
              id="palletHeight"
              value={tmpPalletHeight}
              onChange={(e) =>
                handleInputChange(
                  "palletHeight",
                  e.target.value,
                  setTmpPalletHeight
                )
              }
              onBlur={(e) =>
                handleBlur("palletHeight", tmpPalletHeight, setTmpPalletHeight)
              }
              className="text-center border-2 rounded"
              type="number"
            ></input>
            <Button
              className="text-center text-tertionary"
              onClick={(e) =>
                handleIncrement(
                  "palletHeight",
                  tmpPalletHeight,
                  setTmpPalletHeight
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
