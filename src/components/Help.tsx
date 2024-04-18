"use client"

import Image from "next/image"
import { IoPause, IoPlay } from "react-icons/io5"
import { useGameContext } from "~/contexts/gameContext"
import { keys } from "~/lib/assets"
import { cn } from "~/lib/utils"

function Keybinds() {
  return (
    <div className="fixed left-1/2 top-1/2 flex w-60 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-md border bg-white p-4 shadow-xl">
      <h2 className="text-center text-2xl font-bold">Help</h2>
      <div className="flex flex-col divide-y-2 divide-dotted">
        <div className="flex items-center justify-around p-1">
          <Image
            src={keys.mouseLeftLight}
            width={30}
            height={30}
            alt="mouse left"
          />
          Toggle Cell
        </div>
        <div className="flex items-center justify-around p-1">
          <Image
            src={keys.mouseMiddleLight}
            width={30}
            height={30}
            alt="mouse middle"
          />
          Adjust Zoom
        </div>
        <div className="flex items-center justify-around p-1">
          <Image
            src={keys.mouseMiddleLight}
            width={30}
            height={30}
            alt="mouse middle"
          />
          Adjust Zoom
        </div>
        <div className="flex items-center justify-around p-1">
          <Image
            src={keys.spaceLight}
            width={60}
            height={40}
            alt="mouse middle"
          />
          Toggle Playback
        </div>
      </div>
    </div>
  )
}

export function Help() {
  const { showHelp } = useGameContext()

  return (
    <>
      <PlaybackStatus />
      <div className="fixed bottom-0 left-0 flex items-center font-geist text-xl font-semibold">
        Help
        <Image src={keys.questionLight} width={50} height={50} alt="?" />
      </div>
      {showHelp && <Keybinds />}
    </>
  )
}

function PlaybackStatus() {
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
            "rounded-md border border-black bg-gray-100 p-2 text-xl shadow-md transition-colors hover:bg-gray-200",
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
