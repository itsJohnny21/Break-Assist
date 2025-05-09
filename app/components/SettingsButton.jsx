import React, { useRef, useEffect, useState } from "react"
import Button from "./Button"
import DimensionsMenu from "./DimensionsMenu"
import AppearanceMenu from "./AppearanceMenu"
import { useAppContext } from "../context/AppContext"

const SettingsButton = ({ className, innerRef, width, height, ...props }) => {
  const context = useAppContext()
  const settingsRef = useRef(null)
  const [showModal, setShowModal] = useState(null)
  const [visible, setVisible] = useState(false)

  const menus = {
    dimensions: <DimensionsMenu />,
    appearance: <AppearanceMenu />,
  }
  const [selectedMenu, setSelectedMenu] = useState(menus.dimensions)

  const handleSave = () => {}
  const handleCancel = () => {
    setShowModal(false)
  }

  const handleSettingsClick = () => {
    if (showModal === null) {
      setShowModal(true)
    }

    if (!showModal) {
      setShowModal(true)
      setTimeout(() => setVisible(true), 10)
    } else {
      setVisible(false)
      setTimeout(() => setShowModal(false), 200)
    }
  }

  useEffect(() => {
    if (settingsRef.current && showModal !== null) {
      settingsRef.current.style.animation = `${
        showModal ? "rotate180cw" : "rotate180ccw"
      } 400ms ease-in-out`

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
  }, [settingsRef, showModal])

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menus[menuName])
  }

  useEffect(() => {
    return () => {
      if (settingsRef.current) {
        settingsRef.current.style.animation = ""
        settingsRef.current.style.transform = "rotate(0deg)"
      }
    }
  }, [])

  return (
    <>
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          } bg-gray-600/50 backdrop-blur-sm`}
        >
          <div className="rounded-lg shadow-lg flex flex-col">
            <div className="flex flex-row">
              <div className="flex flex-col px-3 py-5 bg-red-400">
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
            <div className="flex flex-row justify-between py-2 bg-amber-300">
              <Button
                onClick={(e) => {
                  handleCancel()
                }}
                className="p-2"
              >
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  handleReset()
                }}
                className="p-2"
              >
                Reset
              </Button>
              <Button
                onClick={(e) => {
                  handleSave()
                }}
                className="p-2"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
      <button
        ref={settingsRef}
        className={`rounded-full clickable fixed bottom-4 left-4 flex items-center justify-center z-50 ${
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
