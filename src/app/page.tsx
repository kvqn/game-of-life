"use client"

import { About } from "~/components/About"
import { Generation } from "~/components/Generation"
import { Grid } from "~/components/Grid"
import { PlaybackStatus } from "~/components/PlaybackStatus"
import { Settings } from "~/components/Settings"
import { GameContextProvider } from "~/contexts/gameContext"
import { ThemeProvider } from "next-themes"
import { themes } from "~/lib/themes"

export default function HomePage() {
  return (
    <div>
      <ThemeProvider enableSystem={false} defaultTheme={"gray"} themes={themes}>
        <GameContextProvider>
          <Grid />
          <Generation />
          <Settings />
          <PlaybackStatus />
          <About />
        </GameContextProvider>
      </ThemeProvider>
    </div>
  )
}
