import React, { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"

const DimensionsMenu = ({ ...props }) => {
  const {
    palletLength,
    palletHeight,
    palletWidth,
    settings,
    donutHoleWidth,
    donutEnable,
  } = useAppContext()

  //todo: make sure donut is enable when square pallet with odd dimensions (l and w)
  const [localPalletLength, setLocalPalletLength] = useState(palletLength)
  const [localPalletHeight, setLocalPalletHeight] = useState(palletHeight)
  const [localPalletWidth, setLocalPalletWidth] = useState(palletWidth)
  const [localDonutHoleWidth, setLocalDonutHoleWidth] = useState(donutHoleWidth)
  const [localDonutEnable, setLocalDonutEnable] = useState(donutEnable)

  useEffect(() => {
    setLocalPalletLength(palletLength)
    setLocalPalletHeight(palletHeight)
    setLocalPalletWidth(palletWidth)
    setLocalDonutHoleWidth(donutHoleWidth)
  }, [palletLength, palletHeight, palletWidth, donutHoleWidth, donutEnable])

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
    <div className="flex flex-col w-full gap-5 py-3 px-6 bg-blue-500">
      <div className="flex flex-col gap-1 justify-items-center">
        <h2 className="text-lg font-semibold pb-2">Pallet Dimensions</h2>
        <div className="flex flex-row justify-between gap-3">
          <label htmlFor="palletLength" className="text-left">
            Length:
          </label>
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
          />
        </div>
        <div className="flex flex-row justify-between gap-3">
          <label htmlFor="palletWidth" className="text-left">
            Width:
          </label>
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
          />
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="palletHeight" className="text-right">
            Height:
          </label>
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
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-items-center">
        <h2 className="text-lg font-semibold pb-2">Donut Hole Dimensions</h2>
        <div className="flex flex-row justify-between gap-3">
          <label htmlFor="donutHoleWidth" className="text-left">
            Length:
          </label>
          <input
            id="donutHoleWidth"
            value={localDonutHoleWidth}
            disabled={disableDonut}
            onChange={(e) =>
              handleInputChange(
                "donutHoleWidth",
                e.target.value,
                setLocalDonutHoleWidth
              )
            }
            onBlur={(e) =>
              handleBlur(
                "donutHoleWidth",
                localDonutHoleWidth,
                setLocalDonutHoleWidth
              )
            }
            className="text-center border-2 rounded"
            type="number"
          />
        </div>
        <div className="flex flex-row gap-3">
          <label htmlFor="donutEnable" className="text-sm text-left">
            Enable:
          </label>
          <input
            type="checkbox"
            id="donutEnable"
            checked={localDonutEnable}
            disabled={disableDonut}
            onChange={(e) =>
              handleInputChange(
                "donutEnable",
                e.target.checked,
                setLocalDonutEnable
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default DimensionsMenu
