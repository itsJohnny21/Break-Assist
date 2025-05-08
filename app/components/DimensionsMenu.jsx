import React, { useEffect, useState } from "react"

const DimensionsMenu = ({
  settingsState,
  tmpSettingsState,
  settingsValidators,
}) => {
  const [settings, setSettings] = settingsState
  const [tmpSettings, setTmpSettings] = tmpSettingsState
  const [tmp, setTmp] = useState(0)

  console.log("tmpSettings updated:", tmpSettings)

  useEffect(() => {
    console.log(settings)
  }, [settings])

  const handleInputChange = (setting, value) => {
    if (settingsValidators[setting](value)) {
      console.log("valid")
      setTmpSettings((prev) => ({
        ...prev,
        [setting]: value,
      }))
    }
  }

  return (
    <div className="flex flex-col w-full gap-5 p-10 bg-blue-500">
      <div className="flex flex-col gap-1 justify-items-center">
        <h2 className="text-lg font-semibold mb-2">Pallet Dimensions</h2>
        <div className="flex flex-row justify-between gap-3">
          <label htmlFor="palletLength" className="text-left">
            Length:
          </label>
          <input
            id="palletLength"
            value={tmp}
            onChange={(e) => handleInputChange("palletLength", e.target.value)}
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
            value={tmpSettings.palletWidth}
            onChange={(e) => handleInputChange("palletWidth", e.target.value)}
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
            value={tmpSettings.palletHeight}
            onChange={(e) => handleInputChange("palletHeight", e.target.value)}
            className="text-center border-2 rounded"
            type="number"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-items-center">
        <h2 className="text-lg font-semibold mb-2">Donut Hole Dimensions</h2>
        <div className="flex flex-row justify-between gap-3">
          <label htmlFor="donutHoleWidth" className="text-left">
            Length:
          </label>
          <input
            id="donutHoleWidth"
            value={tmpSettings.donutHoleWidth || 0}
            disabled={tmpSettings.donutHoleWidth === NaN}
            onChange={(e) =>
              handleInputChange("donutHoleWidth", e.target.value)
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
            checked={tmpSettings.donutEnable}
            disabled={tmpSettings.donutHoleWidth === NaN}
            onChange={(e) => handleInputChange("donutEnable", e.target.checked)}
          />
        </div>
      </div>
    </div>
  )
}

export default DimensionsMenu
