"use client"

import Image from "next/image"
import { BiPause } from "react-icons/bi"
import { FaPlay } from "react-icons/fa"
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
      <div className="fixed bottom-0 right-0 flex items-center font-geist text-xl font-semibold">
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
    <button
      className={cn(
        "fixed bottom-2 left-2 flex w-36 items-center justify-evenly gap-2 rounded-md border border-black p-2 text-xl font-bold shadow-md transition-colors duration-500",
        {
          "bg-red-300": !playbackState,
          "bg-green-300": playbackState,
        },
      )}
      onClick={() => {
        setPlaybackState(!playbackState)
        playbackRef.current = !playbackState
      }}
    >
      {playbackState ? (
        <>
          <IoPlay />
          Playing
        </>
      ) : (
        <>
          <IoPause />
          Paused
        </>
      )}
    </button>
  )
}
