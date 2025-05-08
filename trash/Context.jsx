import { createContext, useContext, useState } from "react"

const Context = createContext()

export const ContextProvider = ({ children }) => {
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
    settings.palletLength * settings.palletHeight * settings.palletWidth * 5

  const caseDimensions = { length: 2, height: 1.717, width: 2 }

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
        caseDimensions,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useAppContext = () => useContext(Context)
