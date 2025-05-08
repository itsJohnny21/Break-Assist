"use client"

import { useState } from "react"
import Incrementer from "./components/Incrementer"
import Header from "./components/Header"
import Footer from "./components/Footer"
import BreakInfo from "./components/BreakInfo"
import Scene from "./components/Scene"
import SettingsButton from "./components/SettingsButton"
import { usePalletDimensions } from "./context/PalletDimensionsContext"

const Home = () => {
  const [caseCount, setCaseCount] = useState(118)
  const palletDimensions = usePalletDimensions()
  const maxProducts = 34
  const maxCaseCount = 270

  class Break {
    constructor(
      dimensions,
      upper,
      upperQuantity,
      lower = 0,
      lowerQuantity = 0
    ) {
      this.dimensions = dimensions
      this.upper = upper
      this.upperQuantity = upperQuantity
      this.lower = lower
      this.lowerQuantity = lowerQuantity
      this.dimensions = dimensions

      const area = this.dimensions.length * this.dimensions.width

      this.plus =
        this.upper === 1
          ? this.upperQuantity
          : this.upper === 2 && this.upperQuantity === 0
          ? this.lowerQuantity
          : this.upper === this.dimensions.height && this.lower === 1
          ? this.lowerQuantity
          : NaN

      this.palletCount =
        this.upper === this.dimensions.height && this.lower === 1
          ? this.upperQuantity / area
          : this.upper == 2 && this.upperQuantity == 0
          ? this.upperQuantity / area
          : (this.upperQuantity + this.lowerQuantity) / area

      this.palletCount = Math.floor(this.palletCount)
    }
  }

  const getBreak = (caseCount, dimensions) => {
    const { length: L, width: W, height: H } = dimensions
    const A = L * W

    for (let h = H; h >= 1; h--) {
      const q = Math.floor(caseCount / (A * h))
      const r1 = caseCount % (A * h)
      const r2 = A * h - r1

      if (q > 0) {
        if (h === H && 0 <= r1 && r1 <= A) {
          return new Break(dimensions, h, A * q, 1, r1)
        } else if (h + 1 < H + 1 && r1 <= A * q) {
          return new Break(dimensions, h + 1, r1, h, A * q - r1)
        } else if (h - 1 > 0 && r2 <= A * (q + 1)) {
          return new Break(dimensions, h, A * (q + 1) - r2, h - 1, r2)
        }
      }
    }
    return new Break(dimensions, 1, caseCount)
  }

  const breakk = getBreak(caseCount, palletDimensions)

  return (
    <div className="flex-col justify-center justify-items-center">
      <Header />
      <Scene
        breakk={breakk}
        style={{
          width: "70vw",
          height: "60vh",
          background: "#123123",
        }}
      />
      <Incrementer
        caseCountState={[caseCount, setCaseCount]}
        maxCaseCount={maxCaseCount}
      ></Incrementer>
      <BreakInfo className="my-4" breakk={breakk}></BreakInfo>
      <SettingsButton width="40px" height="40px" />
      <Footer />
    </div>
  )
}

export default Home
