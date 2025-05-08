"use client"

import "./globals.css"
import { PalletDimensionsProvider } from "./context/PalletDimensionsContext"

const RootLayout = ({ children }) => {
  return (
    <PalletDimensionsProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </PalletDimensionsProvider>
  )
}

export default RootLayout
