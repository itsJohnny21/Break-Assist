"use client"

import { useState } from "react"
import Incrementer from "./components/Incrementer"
import Header from "./components/Header"
import Footer from "./components/Footer"
import BreakInfo from "./components/BreakInfo"
import Scene from "./components/Scene"
import Case from "./components/Case"
import Stack from "./components/Stack"
import Pallet from "./components/Pallet"
import SettingsButton from "./components/SettingsButton"
import { dimensions } from "./components/Case"
import { ContextProvider } from "/context/Context"

const Home = () => {
  const [caseCount, setCaseCount] = useState(53)

  return (
    <ContextProvider>
      <div className="flex-col justify-center justify-items-center">
        <Header />
        <Scene
          palletDimensions={palletDimensions}
          caseCount={caseCount}
          style={{
            width: "70vw",
            height: "60vh",
            background: "#ffffff",
          }}
        />
        <Incrementer
          caseCountState={[caseCount, setCaseCount]}
          maxCaseCount={maxCaseCount}
        />
        {/* <BreakInfo className="my-4" breakk={breakk} /> */}
        <SettingsButton
          palletDimensions={palletDimensions}
          settingsState={[settings, setSettings]}
          settingsValidators={settingsValidators}
          width="40px"
          height="40px"
        />
        <Footer />
      </div>
    </ContextProvider>
  )
}

export default Home
