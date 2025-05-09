import React, { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"

const AppearanceMenu = ({ ...props }) => {
  const { palletColor, theme, settings } = useAppContext()

  const [localPalletColor, setLocalPalletColor] = useState(palletColor)
  const [localTheme, setLocalTheme] = useState(theme)

  useEffect(() => {
    setLocalPalletColor(palletColor)
    setLocalTheme(theme)
  }, [palletColor, theme])

  const handleBlur = (setting, localValue, setLocalValue) => {
    const validatedValue = settings[setting].validator(localValue)

    if (validatedValue !== null) {
      setLocalValue(validatedValue)
    }
  }

  const handleInputChange = (setting, localValue, setLocalValue) => {
    setLocalValue(localValue)
  }

  return (
    <div className="flex flex-col w-full gap-5 py-3 px-6 bg-purple-500">
      <div className="flex flex-col gap-1 justify-items-center">
        <h2 className="text-lg font-semibold pb-2">Pallet Color</h2>
        <div className="flex flex-row justify-between gap-3">
          <label htmlFor="palletColor" className="text-left">
            Color:
          </label>
          <input
            id="palletColor"
            value={palletColor}
            onChange={(e) =>
              handleInputChange(
                "palletColor",
                e.target.value,
                setLocalPalletColor
              )
            }
            className="text-center border-2 rounded"
            type="number"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-items-center">
        <h2 className="text-lg font-semibold pb-2">Theme</h2>
        <div className="flex flex-row justify-between gap-3">
          <label htmlFor="theme" className="text-left">
            Theme:
          </label>
          <input
            id="theme"
            value={theme}
            onChange={(e) =>
              handleInputChange("theme", e.target.value, setLocalDonutHoleWidth)
            }
            className="text-center border-2 rounded"
            type="select"
          />
        </div>
      </div>
    </div>
  )
}

export default AppearanceMenu
