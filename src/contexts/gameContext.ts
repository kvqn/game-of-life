import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react"

export const GameContext = createContext<{
  showHelp: boolean
  setShowHelp: Dispatch<SetStateAction<boolean>>
  playbackRef: React.MutableRefObject<boolean>
  playbackState: boolean
  setPlaybackState: Dispatch<SetStateAction<boolean>>
} | null>(null)

export function useGameContext() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
