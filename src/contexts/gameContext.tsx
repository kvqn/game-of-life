"use client"

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
  useRef,
} from "react"

const GameContext = createContext<{
  showHelp: boolean
  setShowHelp: Dispatch<SetStateAction<boolean>>
  playbackRef: React.MutableRefObject<boolean>
  playbackState: boolean
  setPlaybackState: Dispatch<SetStateAction<boolean>>
  generation: number
  setGeneration: Dispatch<SetStateAction<number>>
} | null>(null)

export function useGameContext() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [showHelp, setShowHelp] = useState(false)
  const playbackRef = useRef(false)
  const [playbackState, setPlaybackState] = useState(playbackRef.current)
  const [generation, setGeneration] = useState(0)

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
          generation,
          setGeneration,
        }}
      >
        {children}
      </GameContext.Provider>
    </div>
  )
}
