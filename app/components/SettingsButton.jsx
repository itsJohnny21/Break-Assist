import React, { useRef, useEffect, useState } from "react"
import Button from "./Button"
import DimensionsMenu from "./DimensionsMenu"
import AppearanceMenu from "./DimensionsMenu"
import { useAppContext } from "../context/Context"

const SettingsButton = ({ className, innerRef, width, height, ...props }) => {
  const context = useAppContext()
  const settingsRef = useRef(null)
  const dialogRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [settings, setSettings] = [context.settings, context.setSettings]
  const [tmpSettings, setTmpSettings] = useState(settings)

  const menus = {
    dimensions: <DimensionsMenu />,
    appearance: <AppearanceMenu />,
  }
  const [selectedMenu, setSelectedMenu] = useState(menus.dimensions)

  const handleSave = () => {}

  const handleSettingsClick = () => {
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

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menu[menuName])
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
          <div className="rounded-lg shadow-lg flex flex-row">
            <div className="flex flex-col px-3 bg-red-400">
              <div className="flex flex-col gap-10 py-5 px-3 bg-amber-300">
                <Button className="p-2">Exit</Button>
              </div>
              <div className="flex flex-col justify-center gap-10 px-3">
                <Button
                  onClick={(e) => {
                    handleMenuClick("dimensions")
                  }}
                >
                  Dimensions
                </Button>
                <Button
                  onClick={(e) => {
                    handleMenuClick("appearance")
                  }}
                >
                  Appearance
                </Button>
              </div>
            </div>
            {selectedMenu}
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
        onClick={handleSettingsClick}
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
