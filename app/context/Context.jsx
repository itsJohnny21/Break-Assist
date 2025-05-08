import React, { createContext, useContext, useMemo, useState } from "react"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [palletLength, setPalletLength] = useState(3)
  const [palletHeight, setPalletHeight] = useState(6)
  const [palletWidth, setPalletWidth] = useState(3)
  const [caseCount, setCaseCount] = useState(54)
  const caseDimensions = { length: 2, height: 1.717, width: 2 }

  const palletDimensions = useMemo(
    () => ({
      length: palletLength,
      width: palletWidth,
      height: palletHeight,
    }),
    [palletLength, palletWidth, palletHeight]
  )

  const { upper, upperQuantity, lower, lowerQuantity } = useMemo(() => {
    const palletArea = palletLength * palletWidth

    for (let h = palletHeight; h >= 1; h--) {
      const q = Math.floor(caseCount / (palletArea * h))
      const r1 = caseCount % (palletArea * h)
      const r2 = palletArea * h - r1

      if (q > 0) {
        if (h === palletHeight && 0 <= r1 && r1 <= palletArea) {
          return {
            upper: h,
            upperQuantity: palletArea * q,
            lower: 1,
            lowerQuantity: r1,
          }
        } else if (h + 1 <= palletHeight && r1 <= palletArea * q) {
          return {
            upper: h + 1,
            upperQuantity: r1,
            lower: h,
            lowerQuantity: palletArea * q - r1,
          }
        } else if (h - 1 > 0 && r2 <= palletArea * (q + 1)) {
          return {
            upper: h,
            upperQuantity: palletArea * (q + 1) - r2,
            lower: h - 1,
            lowerQuantity: r2,
          }
        }
      }
    }

    return {
      upper: 1,
      upperQuantity: caseCount,
      lower: 0,
      lowerQuantity: 0,
    }
  }, [palletLength, palletHeight, palletWidth, caseCount])

  const plus = useMemo(() => {
    if (upper === 1) return upperQuantity
    if (upper === 2 && upperQuantity === 0) return lowerQuantity
    if (upper === palletHeight && lower === 1) return lowerQuantity
    return NaN
  }, [upper, upperQuantity, lower, lowerQuantity, palletHeight])

  const palletCount = useMemo(() => {
    const palletArea = palletLength * palletWidth
    if (upper === palletHeight && lower === 1) {
      return Math.floor(upperQuantity / palletArea)
    } else if (upper === 2 && upperQuantity === 0) {
      return Math.floor(upperQuantity / palletArea)
    } else {
      return Math.floor((upperQuantity + lowerQuantity) / palletArea)
    }
  }, [
    palletLength,
    palletHeight,
    palletWidth,
    upper,
    upperQuantity,
    lower,
    lowerQuantity,
  ])

  return (
    <AppContext.Provider
      value={{
        palletLength,
        setPalletLength,
        palletWidth,
        setPalletWidth,
        palletHeight,
        setPalletHeight,
        caseCount,
        setCaseCount,
        caseDimensions,
        setCaseDimensions,
        palletDimensions,
        upper,
        upperQuantity,
        lower,
        lowerQuantity,
        plus,
        palletCount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
