import React, { createContext } from "react"

const CubeDimensionsContext = createContext(null)
export const CubeDimensionsProvider = ({ children }) => {
  const cubeDimensions = { length: 2, height: 1.717, width: 2 }

  return (
    <CubeDimensionsContext.Provider value={cubeDimensions}>
      {children}
    </CubeDimensionsContext.Provider>
  )
}
export const useCubeDimensions = () => React.useContext(CubeDimensionsContext)
