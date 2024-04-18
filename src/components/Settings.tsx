"use client"

import { useEffect, useState } from "react"
import { IoMenu } from "react-icons/io5"
import { Dialog } from "./ui/Dialog"
import { Slider } from "./ui/slider"
import { blankGrid, useGameContext } from "~/contexts/gameContext"

export function Settings() {
  const {
    scale,
    setScale,
    setGrid,
    setGeneration,
    setPlaybackState,
    playbackRef,
    setOffset,
    generationGap,
  } = useGameContext()
  const [showMenu, setShowMenu] = useState(false)

  function resetGrid() {
    playbackRef.current = false
    setPlaybackState(false)
    setGrid(blankGrid())
    setGeneration(0)
    backToDefaults()
  }

  function backToDefaults() {
    setScale(1)
    setGenerationGapState(1000)
    setOffset({ x: 0, y: 0 })
  }

  function backToCenter() {
    setOffset({ x: 0, y: 0 })
  }

  const [generationGapState, setGenerationGapState] = useState(1000)

  useEffect(() => {
    generationGap.current = generationGapState
  }, [generationGapState, generationGap])

  return (
    <Dialog
      trigger={
        <div
          className="fixed bottom-2 left-2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-2xl shadow-md hover:bg-gray-200"
          onClick={() => setShowMenu(!showMenu)}
        >
          <IoMenu />
        </div>
      }
      content={
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <div>
            <h3 className="text-xl font-medium">Scale</h3>
            <div className="flex gap-2">
              <Slider
                value={[scale]}
                defaultValue={[1]}
                min={0.1}
                max={2}
                step={0.01}
                onValueChange={([value]) => {
                  if (value) setScale(value)
                }}
              />
              <p className="font-geist-mono rounded-md border px-2">
                {scale.toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium">Generation Gap (ms)</h3>
            <div className="flex gap-2">
              <Slider
                value={[generationGapState]}
                defaultValue={[1000]}
                min={100}
                max={5000}
                step={10}
                onValueChange={([value]) => {
                  if (value) setGenerationGapState(value)
                }}
              />
              <p className="font-geist-mono rounded-md border px-2">
                {generationGapState}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <div
              className="w-full cursor-pointer rounded-md border border-gray-400 bg-gray-300 px-4 py-2 text-center transition-colors hover:bg-gray-400"
              onClick={backToCenter}
            >
              Snap grid to center
            </div>
            <div
              className="w-full cursor-pointer rounded-md border border-blue-400 bg-blue-300 px-4 py-2 text-center transition-colors hover:bg-blue-400 lg:w-40"
              onClick={backToDefaults}
            >
              Back to Defaults
            </div>
            <div
              className="w-full cursor-pointer rounded-md border border-red-400 bg-red-300 px-4 py-2 text-center transition-colors hover:bg-red-400 lg:w-40"
              onClick={resetGrid}
            >
              Reset Grid
            </div>
          </div>
        </div>
      }
    />
  )
}
