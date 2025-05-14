import React, { useRef, useEffect, useState } from "react"
import Button from "./Button"
import DimensionsMenu from "./DimensionsMenu"
import { useAppContext } from "../context/AppContext"
import SettingsIcon from "../../public/assets/icons/SettingsIcon"

const SettingsButton = ({ className, innerRef, width, height, ...props }) => {
  const {
    primaryColor,
    tertionaryColor,
    palletLength,
    palletHeight,
    palletWidth,
    setPalletLength,
    setPalletHeight,
    setPalletWidth,
    tmpPalletLength,
    tmpPalletHeight,
    tmpPalletWidth,
    setTmpPalletLength,
    setTmpPalletHeight,
    setTmpPalletWidth,
    activePalletIndex,
    setActivePalletIndex,
    returnHomeIndex,
    setReturnHomeIndex,
  } = useAppContext()
  const settingsRef = useRef(null)
  const [showModal, setShowModal] = useState(null)
  const [visible, setVisible] = useState(false)

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleReset = () => {
    setTmpPalletLength(palletLength)
    setTmpPalletHeight(palletHeight)
    setTmpPalletWidth(palletWidth)
  }

  const handleSave = () => {
    setPalletLength(tmpPalletLength)
    setPalletHeight(tmpPalletHeight)
    setPalletWidth(tmpPalletWidth)
    setActivePalletIndex(null)
    setReturnHomeIndex(0)

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
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showModal) {
        setShowModal(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showModal])

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
          } bg-black/40 backdrop-blur-sm`}
        >
          <div className="border-2 flex flex-col bg-secondary">
            <div className="flex flex-row">
              <DimensionsMenu className={"bg-secondary"} />
            </div>
            <div className="flex flex-row justify-between bg-tertionary py-2">
              <Button
                onClick={(e) => {
                  handleCancel()
                }}
              >
                cancel
              </Button>
              <Button
                onClick={(e) => {
                  handleReset()
                }}
              >
                reset
              </Button>
              <Button
                onClick={(e) => {
                  handleSave()
                }}
              >
                save
              </Button>
            </div>
          </div>
        </div>
      )}
      <button
        ref={settingsRef}
        className={`clickable fixed bottom-3 left-3 m-10 flex items-center z-50 ${
          className || ""
        }`}
        style={{
          width: width || "48px",
          height: height || "48px",
        }}
        {...props}
        onClick={handleSettingsClick}
      >
        <SettingsIcon fill={tertionaryColor} />
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
