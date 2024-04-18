"use client"

import { Generation } from "~/components/Generation"
import { Grid } from "~/components/Grid"
import { PlaybackStatus } from "~/components/PlaybackStatus"
import { Settings } from "~/components/Settings"
import { GameContextProvider } from "~/contexts/gameContext"

export default function HomePage() {
  return (
    <div>
      <GameContextProvider>
        <Grid />
        {/* <Help /> */}
        <Generation />
        <Settings />
        <PlaybackStatus />
      </GameContextProvider>
    </div>
  )
}
