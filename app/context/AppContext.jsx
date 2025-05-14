import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react"

import { useSearchParams, useRouter } from "next/navigation"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const rootElement = window.document.documentElement
    const computedStyle = window.getComputedStyle(rootElement)
    const primaryColor = computedStyle.getPropertyValue("--color-primary")
    const secondaryColor = computedStyle.getPropertyValue("--color-secondary")
    const tertionaryColor = computedStyle.getPropertyValue("--color-tertionary")

    if (primaryColor) {
      setPrimaryColor(primaryColor.trim())
    }

    if (secondaryColor) {
      setSecondaryColor(secondaryColor.trim())
    }

    if (tertionaryColor) {
      setTertionaryColor(tertionaryColor.trim())
    }
  }, [])

  const [palletColor, setPalletColor] = useState(null)
  const [palletLength, setPalletLength] = useState(null)
  const [palletHeight, setPalletHeight] = useState(null)
  const [palletWidth, setPalletWidth] = useState(null)
  const [caseCount, setCaseCount] = useState(2)

  const validateHexColor = (currentValue, newValue) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      return newValue
    } else {
      return currentValue
    }
  }

  const validateBetweenRange = (oldValue, newValue, min, max) => {
    const parsedValue = parseInt(newValue)

    if (!isNaN(parsedValue)) {
      if (parsedValue < min) {
        return min
      } else if (parsedValue > max) {
        return max
      } else {
        return parsedValue
      }
    } else if (newValue !== "") {
      return oldValue
    } else {
      return ""
    }
  }

  const settings = {
    palletLength: {
      defaultValue: 3,
      value: palletLength,
      set: setPalletLength,
      validator: (newValue) =>
        validateBetweenRange(palletLength, newValue, 2, 11),
    },
    palletHeight: {
      defaultValue: 6,
      value: palletHeight,
      set: setPalletHeight,
      validator: (newValue) =>
        validateBetweenRange(palletHeight, newValue, 2, 11),
    },
    palletWidth: {
      defaultValue: 3,
      value: palletWidth,
      set: setPalletWidth,
      validator: (newValue) =>
        validateBetweenRange(palletWidth, newValue, 2, 11),
    },
    caseCount: {
      defaultValue: 53,
      value: caseCount,
      set: setCaseCount,
      validator: (newValue) =>
        validateBetweenRange(caseCount, newValue, 0, maxCaseCount),
    },
    palletColor: {
      defaultValue: "#3377ff",
      value: palletColor,
      set: setPalletColor,
      validator: (newValue) => validateHexColor(palletColor, newValue),
    },
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    Object.keys(settings).forEach((key) => {
      if (params.has(key)) {
        const value = params.get(key)
        const parsedValue = isNaN(value) ? value : Number(value)

        if (settings[key].validator(parsedValue) !== "") {
          settings[key].set(parsedValue)
        } else {
          settings[key].set(settings[key].defaultValue)
        }
      } else {
        params.set(key, settings[key].defaultValue)
        settings[key].set(settings[key].defaultValue)
      }

      router.replace(`?${params.toString()}`, { scroll: false })
    })
  }, [searchParams, router])

  const [primaryColor, setPrimaryColor] = useState(null)
  const [secondaryColor, setSecondaryColor] = useState(null)
  const [tertionaryColor, setTertionaryColor] = useState(null)

  const [tmpPalletLength, setTmpPalletLength] = useState(palletLength)
  const [tmpPalletWidth, setTmpPalletWidth] = useState(palletWidth)
  const [tmpPalletHeight, setTmpPalletHeight] = useState(palletHeight)

  const caseDimensions = { length: 2, height: 1.717, width: 2 }
  const maxProducts = 34
  const maxCaseCount = 500
  const cameraHomePosition = [0, 10, 50]
  const cameraHomeLookAt = [0, 0, 0]

  const deconstructedGap = caseDimensions.length * 2

  const deconstructedTargetPositions = useMemo(() => {
    const A = palletLength * palletWidth
    const startX = caseDimensions.length * (A - 1)
    const startY =
      (caseDimensions.height * palletHeight) / 2 + caseDimensions.height
    const startZ = caseDimensions.width * 2
    const delta = deconstructedGap

    const positions = []

    for (let i = 0; i < palletLength * palletWidth; i++) {
      const xPos = startX - delta * i
      positions.push([xPos, startY, startZ])
    }

    return positions
  })

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

  const palletCount = useMemo(() => {
    const palletArea = palletLength * palletWidth
    if (
      upperQuantity % palletArea === 0 &&
      0 <= lowerQuantity % palletArea &&
      lowerQuantity % palletArea <= palletArea &&
      lower === 1
    ) {
      return Math.floor(upperQuantity / palletArea)
    }
    if (upper === 2 && upperQuantity === 0) {
      return Math.floor(upperQuantity / palletArea)
    }

    return Math.floor((upperQuantity + lowerQuantity) / palletArea)
  }, [
    palletLength,
    palletHeight,
    palletWidth,
    upper,
    upperQuantity,
    lower,
    lowerQuantity,
  ])

  const plus = useMemo(() => {
    const palletArea = palletDimensions.length * palletDimensions.width

    if (upper === 1) return upperQuantity
    if (upper === 2 && upperQuantity === 0) return lowerQuantity
    if (upper === palletHeight && lower === 1) {
      if (lowerQuantity === 0) {
        return 0
      }

      const diff = -palletArea * palletCount + (upperQuantity + lowerQuantity)

      if (diff > 0) return lowerQuantity
    }
    return NaN
  }, [upper, upperQuantity, lower, lowerQuantity, palletHeight])

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
        maxProducts,
        maxCaseCount,
        palletDimensions,
        upper,
        upperQuantity,
        lower,
        lowerQuantity,
        plus,
        palletCount,
        settings,
        palletColor,
        setPalletColor,
        primaryColor,
        setPrimaryColor,
        tertionaryColor,
        setTertionaryColor,
        tmpPalletLength,
        setTmpPalletLength,
        tmpPalletWidth,
        setTmpPalletWidth,
        tmpPalletHeight,
        setTmpPalletHeight,
        deconstructedTargetPositions,
        cameraHomePosition,
        cameraHomeLookAt,
        deconstructedGap,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
