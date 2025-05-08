"use client"

import { useState } from "react"
import Incrementer from "./components/Incrementer"
import Header from "./components/Header"
import Footer from "./components/Footer"
import BreakInfo from "./components/BreakInfo"
import Scene from "./components/Scene"
import Case from "./components/Case"
import SettingsButton from "./components/SettingsButton"
import { dimensions } from "./components/Case"

const Home = () => {
  const [caseCount, setCaseCount] = useState(118)
  const [palletDimensions, setPalletDimensions] = useState({
    length: 3,
    height: 6,
    width: 3,
  })
  const maxProducts = 34
  const maxCaseCount = 270

  class Break {
    constructor(dimensions, caseCount) {
      this.caseCount = caseCount
      this.dimensions = dimensions

      const { upper, upperQuantity, lower, lowerQuantity } =
        this.#computeBreak()
      this.upper = upper
      this.upperQuantity = upperQuantity
      this.lower = lower
      this.lowerQuantity = lowerQuantity

      this.plus = this.#computePlus()
      this.palletCount = this.#computePalletCount()
      this.pallets = this.#createPallets()
    }

    #computeBreak() {
      const { length: L, width: W, height: H } = this.dimensions
      const A = L * W

      for (let h = H; h >= 1; h--) {
        const q = Math.floor(this.caseCount / (A * h))
        const r1 = this.caseCount % (A * h)
        const r2 = A * h - r1

        if (q > 0) {
          if (h === H && 0 <= r1 && r1 <= A) {
            return {
              upper: h,
              upperQuantity: A * q,
              lower: 1,
              lowerQuantity: r1,
            }
          } else if (h + 1 <= H && r1 <= A * q) {
            return {
              upper: h + 1,
              upperQuantity: r1,
              lower: h,
              lowerQuantity: A * q - r1,
            }
          } else if (h - 1 > 0 && r2 <= A * (q + 1)) {
            return {
              upper: h,
              upperQuantity: A * (q + 1) - r2,
              lower: h - 1,
              lowerQuantity: r2,
            }
          }
        }
      }

      return {
        upper: 1,
        upperQuantity: this.caseCount,
        lower: 0,
        lowerQuantity: 0,
      }
    }

    #computePlus() {
      const { height: H } = this.dimensions

      if (this.upper === 1) return this.upperQuantity
      if (this.upper === 2 && this.upperQuantity === 0)
        return this.lowerQuantity
      if (this.upper === H && this.lower === 1) return this.lowerQuantity
      return NaN
    }

    #computePalletCount() {
      const { length: L, width: W, height: H } = this.dimensions
      const A = L * W

      let count
      if (this.upper === H && this.lower === 1) {
        count = this.upperQuantity / A
      } else if (this.upper === 2 && this.upperQuantity === 0) {
        count = this.upperQuantity / A
      } else {
        count = (this.upperQuantity + this.lowerQuantity) / A
      }

      return Math.floor(count)
    }

    #createPallets() {
      const { length: L, width: W } = this.dimensions
      const A = L * W
      const perfectUpperPallets = Math.floor(this.upperQuantity / A)
      const perfectLowerPallets = Math.floor(this.lowerQuantity / A)

      const remainingUpperQuantity = this.upperQuantity % A
      const remainingLowerQuantity = this.lowerQuantity % A

      const pallets = []

      for (let i = 0; i < perfectUpperPallets; i++) {
        pallets.push(new PerfectPallet(this.dimensions, this.upper))
      }

      for (let i = 0; i < perfectLowerPallets; i++) {
        pallets.push(new PerfectPallet(this.dimensions, this.lower))
      }

      if (remainingUpperQuantity + remainingLowerQuantity === A) {
        if (
          L === W &&
          L % 2 === 1 &&
          remainingUpperQuantity / (L - 1) === remainingLowerQuantity
        ) {
          pallets.push(new DonutPallet(this.dimensions, this.upper))
        } else {
          pallets.push(
            new UnevenPallet(
              this.dimensions,
              this.upper,
              remainingUpperQuantity,
              this.lower,
              remainingLowerQuantity
            )
          )
        }
      }

      return pallets
    }
  }

  class Pallet {
    constructor(dimensions) {
      this.dimensions = dimensions
    }
  }

  class PerfectPallet extends Pallet {
    constructor(dimensions, height) {
      super(dimensions)
      this.height = height

      this.stacks = []
      for (let i = 0; i < this.dimensions.length; i++) {
        const row = []
        for (let j = 0; j < this.dimensions.length; j++) {
          row.push(new Stack(this.dimensions.height, height))
        }
        this.stacks.push(row)
      }
    }
  }

  class DonutPallet extends Pallet {
    constructor(dimensions, height) {
      super(dimensions)
      this.height = height

      this.stacks = []
      const center = Math.floor(this.dimensions.length / 2)
      for (let i = 0; i < this.dimensions.length; i++) {
        const row = []
        for (let j = 0; j < this.dimensions.length; j++) {
          if (i === center && j === center) {
            row.push(new Stack(this.dimensions.height, height - 1))
          } else {
            row.push(new Stack(this.dimensions.height, height))
          }
        }
        this.stacks.push(row)
      }
    }
  }

  class UnevenPallet extends Pallet {
    constructor(dimensions, upper, upperQuantity, lower, lowerQuantity) {
      super(dimensions)
      this.height = height
      this.upperQuantity = upperQuantity

      this.stacks = []
      const total = this.dimensions.length
      for (let i = 0; i < total; i++) {
        const row = []
        for (let j = 0; j < total; j++) {
          const index = i * total + j
          if (index < upperQuantity) {
            row.push(new Stack(this.dimensions.height, upper))
          } else {
            row.push(new Stack(this.dimensions.height, lower))
          }
        }
        this.stacks.push(row)
      }
    }
  }

  class Stack {
    constructor(maxHeight, height, color) {
      this.maxHeight = maxHeight
      this.height = height
      this.color = color
      this.cases = []

      for (let i = 0; i < maxHeight; i++) {
        this.cases.push(
          <Case
            key={i}
            position={0}
            color={color}
            opacity={i < height ? 1 : 0}
          />
        )
      }
    }
  }

  const breakk = new Break(palletDimensions, caseCount)

  return (
    <div className="flex-col justify-center justify-items-center">
      <Header />
      <Scene
        breakk={breakk}
        palletDimensions={palletDimensions}
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
      <SettingsButton
        palletDimensions={palletDimensions}
        width="40px"
        height="40px"
      />
      <Footer />
    </div>
  )
}

export default Home
