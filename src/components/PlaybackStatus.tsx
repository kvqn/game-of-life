"use client"

import { IoPause, IoPlay } from "react-icons/io5"
import { useGameContext } from "~/contexts/gameContext"
import { cn } from "~/lib/utils"

export function PlaybackStatus() {
  const { playbackState, setPlaybackState, playbackRef } = useGameContext()

  return (
    <>
      <div
        className="fixed bottom-2 right-2 flex cursor-pointer items-center gap-2 divide-x divide-gray-300 rounded-md border border-gray-300 bg-gray-100 text-xl shadow-md transition-colors hover:bg-gray-200"
        onClick={() => {
          setPlaybackState(!playbackState)
          playbackRef.current = !playbackState
        }}
      >
        {!playbackState && (
          <div
            className={"flex h-full w-auto items-center justify-center pl-2"}
          >
            Paused
          </div>
        )}
        <div className={"flex h-10 w-10 items-center justify-center"}>
          {playbackState ? <IoPlay /> : <IoPause />}
        </div>
      </div>
      <div
        className={cn(
          "fixed bottom-2 left-1/2 -translate-x-1/2 select-none rounded-md border border-gray-300 bg-white px-4 py-1 text-xl opacity-0 shadow-md transition-opacity hover:opacity-20",
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
