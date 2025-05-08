import React, { useRef, useEffect, useState } from "react"
import Button from "./Button"

const SettingsButton = ({
  className,
  innerRef,
  width,
  height,
  palletDimensions,
  ...props
}) => {
  const settingsRef = useRef(null)
  const dialogRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  const handleSave = () => {}

  const handleClick = () => {
    setShowModal(!showModal)

    if (dialogRef.current) {
      if (!showModal) {
        dialogRef.current.show()
      } else {
        dialogRef.current.close()
      }
    }

    if (settingsRef.current) {
      settingsRef.current.style.animation = `${
        showModal ? "rotate180ccw" : "rotate180cw"
      } 1s ease-in-out`

      settingsRef.current.addEventListener(
        "animationend",
        () => {
          settingsRef.current.style.animation = ""
          settingsRef.current.style.transform = showModal
            ? "rotate(-180deg)"
            : "rotate(0deg)"
        },
        { once: true }
      )
    }
  }

  useEffect(() => {
    return () => {
      if (settingsRef.current) {
        settingsRef.current.style.animation = ""
        settingsRef.current.style.transform = "rotate(0deg)"
      }
      if (dialogRef.current) {
        dialogRef.current.close()
      }
    }
  }, [])

  return (
    <>
      {showModal && (
        <div
          ref={dialogRef}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"
        >
          <div className="rounded-lg shadow-lg p-6 w-full flex flex-row gap-10 bg-amber-300 justify-center">
            <div className="flex flex-col gap-2 justify-items-center">
              <h2 className="text-lg font-semibold mb-2">Pallet Dimensions</h2>
              <div className="flex flex-row justify-between gap-3">
                <label htmlFor="width" className="text-left">
                  Width:
                </label>
                <input
                  id="width"
                  value={palletDimensions.width}
                  onChange={(e) => handleInputChange("width", e.target.value)}
                  className="w-[40px] text-center border-2 rounded"
                  type="number"
                />
              </div>
              <div className="flex flex-row justify-between gap-3">
                <label htmlFor="length" className="text-left">
                  Length:
                </label>
                <input
                  id="length"
                  value={palletDimensions.length}
                  onChange={(e) => handleInputChange("length", e.target.value)}
                  className="w-[40px] text-center border-2 rounded"
                  type="number"
                />
              </div>
              <div className="flex flex-row justify-between">
                <label htmlFor="height" className="text-right">
                  Height:
                </label>
                <input
                  id="height"
                  value={palletDimensions.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="w-[40px] text-center border-2 rounded"
                  type="number"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-items-center">
              <h2 className="text-lg font-semibold mb-2">
                Donut Hole Dimensions
              </h2>
              <div className="flex flex-row justify-between">
                <label htmlFor="width" className="text-left">
                  Width:
                </label>
                <input
                  id="width"
                  value={palletDimensions.width}
                  onChange={(e) => handleInputChange("width", e.target.value)}
                  className="w-[40px] text-center border-2 rounded"
                  type="number"
                />
              </div>
              <div className="flex flex-row justify-between gap-3">
                <label htmlFor="length" className="text-left">
                  Length:
                </label>
                <input
                  id="length"
                  value={palletDimensions.length}
                  onChange={(e) => handleInputChange("length", e.target.value)}
                  className="w-[40px] text-center border-2 rounded"
                  type="number"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <Button className="bg-green-600" onClick={handleSave}>
                Save
              </Button>
              <Button className="bg-red-600" onClick={handleSave}>
                Go back
              </Button>
            </div>
          </div>
        </div>
      )}
      <button
        ref={settingsRef}
        className={`rounded-full clickable fixed bottom-4 left-4 flex items-center justify-center ${
          className || ""
        }`}
        style={{
          width: width || "48px",
          height: height || "48px",
        }}
        {...props}
        onClick={handleClick}
      >
        <img
          style={{
            width: width || "48px",
            height: height || "48px",
          }}
          src="/assets/icons/settings.svg"
          alt="Settings"
        />
      </button>
    </>
  )
}

const styles = () => {
  return (
    <style jsx global>{`
      @keyframes rotate180 {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(180deg);
        }
      }
    `}</style>
  )
}

export default SettingsButton
;("Dimensions -> Pallet Dimensions, Donut Hole Dimensions, Enable Donut, Plus -> Max, Enable, Appearance -> Pallet Color, Theme")
