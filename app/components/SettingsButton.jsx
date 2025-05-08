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
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-2">
              Edit Pallet Dimensions
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Adjust the dimensions of the pallet.
            </p>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="width" className="text-right">
                  Width
                </label>
                <input
                  id="width"
                  value={palletDimensions.width}
                  onChange={(e) => handleInputChange("width", e.target.value)}
                  className="col-span-3"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="length" className="text-right">
                  Length
                </label>
                <input
                  id="length"
                  value={palletDimensions.length}
                  onChange={(e) => handleInputChange("length", e.target.value)}
                  className="col-span-3"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="height" className="text-right">
                  Height
                </label>
                <input
                  id="height"
                  value={palletDimensions.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="col-span-3"
                  type="number"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save changes</Button>
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
