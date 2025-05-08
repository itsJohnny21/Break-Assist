import { createContext, useContext, useState } from "react"

const Context = createContext()

export const Provider = ({ children }) => {
  const [caseCount, setCaseCount] = useState(53)

  const [settings, setSettings] = useState({
    palletLength: 3,
    palletHeight: 6,
    palletWidth: 3,
    donutHoleWidth: 1,
    donutEnable: false,
  })

  const [tmpSettings, setTmpSettings] = useState({ ...settings })

  const settingsValidators = {
    palletLength: () => true,
    palletHeight: () => true,
    palletWidth: () => true,
    donutHoleWidth: () => true,
    donutEnable: () => true,
  }

  const maxProducts = 34
  const maxCaseCount =
    palletDimensions.length *
    palletDimensions.height *
    palletDimensions.width *
    5

  return (
    <Context.Provider
      value={{
        caseCount,
        setCaseCount,
        settings,
        setSettings,
        tmpSettings,
        setTmpSettings,
        settingsValidators,
        maxProducts,
        maxCaseCount,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSettings = () => useContext(Context)
