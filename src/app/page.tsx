"use client"

import {
  useContext,
  createContext,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import { Grid } from "~/components/Grid"
import { Help } from "~/components/Help"

const gameContext = createContext<{
  showHelp: boolean
  setShowHelp: Dispatch<SetStateAction<boolean>>
  playbackRef: React.MutableRefObject<boolean>
  playbackState: boolean
  setPlaybackState: Dispatch<SetStateAction<boolean>>
} | null>(null)

export function useGameContext() {
  const context = useContext(gameContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}

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
      <gameContext.Provider
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
      </gameContext.Provider>
    </div>
  )
}
