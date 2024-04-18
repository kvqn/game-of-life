"use client"

import { Generation } from "~/components/Generation"
import { Grid } from "~/components/Grid"
import { Help } from "~/components/Help"
import { GameContextProvider } from "~/contexts/gameContext"

export default function HomePage() {
  return (
    <div>
      <GameContextProvider>
        <Grid />
        <Help />
        <Generation />
      </GameContextProvider>
    </div>
  )
}
