"use client"

import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useGameContext } from "~/app/page"
import { keys } from "~/lib/assets"

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
      className="fixed bottom-0 left-0 flex items-center gap-2 p-2 text-xl font-bold"
      onClick={() => {
        setPlaybackState(!playbackState)
        playbackRef.current = !playbackState
      }}
    >
      {playbackState ? (
        <>
          <FontAwesomeIcon icon={faPlay} />
          Playing
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faPause} />
          Paused
        </>
      )}
    </button>
  )
}
