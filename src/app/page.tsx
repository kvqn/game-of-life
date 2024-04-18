"use client"

import { useRef, useState } from "react"
import { Grid } from "~/components/Grid"
import { Help } from "~/components/Help"
import { GameContext } from "~/contexts/gameContext"

export default function HomePage() {
  const [showHelp, setShowHelp] = useState(false)
  const playbackRef = useRef(false)
  const [playbackState, setPlaybackState] = useState(playbackRef.current)

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "?") {
          console.log("toggle help")
          setShowHelp((prev) => !prev)
        }
        if (e.key === " ") {
          playbackRef.current = !playbackRef.current
          setPlaybackState(playbackRef.current)
        }
      }}
      tabIndex={0}
    >
      <GameContext.Provider
        value={{
          showHelp,
          setShowHelp,
          playbackRef,
          playbackState,
          setPlaybackState,
        }}
      >
        <Grid />
        <Help />
      </GameContext.Provider>
    </div>
  )
}
