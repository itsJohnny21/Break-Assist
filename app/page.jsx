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
import { AppProvider } from "./context/AppContext"
import { computeBreak } from "./components/Break"

const Home = () => {
  return (
    <AppProvider>
      <div className="flex-col justify-center justify-items-center">
        <Header />
        <Scene
          style={{
            width: "70vw",
            height: "60vh",
            background: "#ffffff",
          }}
        />
        <Incrementer className={"py-5"} />
        <BreakInfo className="my-4" />
        <SettingsButton className={} width="40px" height="40px" />
        <Footer />
      </div>
    </AppProvider>
  )
}

export default Home
