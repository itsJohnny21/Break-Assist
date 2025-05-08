"use client"

import React, { createContext, useState, useContext } from "react"

const PalletDimensionsContext = createContext(null)

export const PalletDimensionsProvider = ({ children }) => {
  const [palletDimensions, setPalletDimensions] = useState({
    width: 3,
    height: 6,
    length: 3,
  })

  const updatePalletDimensions = (newDimensions) => {
    setPalletDimensions(newDimensions)
  }

  return (
    <PalletDimensionsContext.Provider
      value={{ palletDimensions, updatePalletDimensions }}
    >
      {children}
    </PalletDimensionsContext.Provider>
  )
}

export const usePalletDimensions = () => {
  const context = useContext(PalletDimensionsContext)
  if (!context) {
    throw new Error(
      "usePalletDimensions must be used within a PalletDimensionsProvider"
    )
  }
  return context.palletDimensions
}

export const useUpdatePalletDimensions = () => {
  const context = useContext(PalletDimensionsContext)
  if (!context) {
    throw new Error(
      "usePalletDimensions must be used within a PalletDimensionsProvider"
    )
  }
  return context.updatePalletDimensions
}
