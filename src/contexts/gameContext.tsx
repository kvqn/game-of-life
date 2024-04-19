"use client"

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
  useRef,
} from "react"

const nRows = 50
const nCols = 50

export function blankGrid() {
  const grid = new Array(nRows).fill(new Array(nCols).fill(0)) as number[][]
  return grid
}

const GameContext = createContext<{
  showHelp: boolean
  setShowHelp: Dispatch<SetStateAction<boolean>>
  playbackRef: React.MutableRefObject<boolean>
  playbackState: boolean
  setPlaybackState: Dispatch<SetStateAction<boolean>>
  generation: number
  setGeneration: Dispatch<SetStateAction<number>>
  scale: number
  setScale: Dispatch<SetStateAction<number>>
  grid: number[][]
  setGrid: Dispatch<SetStateAction<number[][]>>
  offset: { x: number; y: number }
  setOffset: Dispatch<SetStateAction<{ x: number; y: number }>>
  generationGap: React.MutableRefObject<number>
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
  const [scale, setScale] = useState(1)
  const [grid, setGrid] = useState<number[][]>(blankGrid())
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const generationGap = useRef(250)

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
      className="focus:outline-none"
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
          scale,
          setScale,
          grid,
          setGrid,
          offset,
          setOffset,
          generationGap,
        }}
      >
        {children}
      </GameContext.Provider>
    </div>
  )
}
