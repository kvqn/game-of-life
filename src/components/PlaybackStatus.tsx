"use client"

import { IoPause, IoPlay } from "react-icons/io5"
import { useGameContext } from "~/contexts/gameContext"
import { cn } from "~/lib/utils"

export function PlaybackStatus() {
  const { playbackState, setPlaybackState, playbackRef } = useGameContext()

  return (
    <>
      <div className="fixed bottom-2 right-2 flex items-center gap-2">
        <p
          className={cn("text-xl opacity-0 transition-opacity lg:opacity-0", {
            "opacity-100": !playbackState,
          })}
        >
          Paused
        </p>
        <div
          className={cn(
            "flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-xl shadow-md transition-colors hover:bg-gray-200",
          )}
          onClick={() => {
            setPlaybackState(!playbackState)
            playbackRef.current = !playbackState
          }}
        >
          {playbackState ? <IoPlay /> : <IoPause />}
        </div>
      </div>
      <div
        className={cn(
          "fixed bottom-2 left-1/2 -translate-x-1/2 text-xl opacity-0 transition-opacity",
          {
            "lg:opacity-100": !playbackState,
          },
        )}
      >
        Press space to resume playback
      </div>
    </>
  )
}
