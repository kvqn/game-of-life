"use client"

import { useEffect, useState } from "react"
import { IoMenu } from "react-icons/io5"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Slider } from "./ui/slider"
import { blankGrid, useGameContext } from "~/contexts/gameContext"
import { useTheme } from "next-themes"
import { cn } from "~/lib/utils"

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
  }

  function backToDefaults() {
    setScale(1)
    setGenerationGapState(250)
    setOffset({ x: 0, y: 0 })
  }

  function backToCenter() {
    setOffset({ x: 0, y: 0 })
  }

  const [generationGapState, setGenerationGapState] = useState(250)

  useEffect(() => {
    generationGap.current = generationGapState
  }, [generationGapState, generationGap])

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="fixed bottom-2 left-2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-2xl shadow-md hover:bg-gray-200"
          onClick={() => setShowMenu(!showMenu)}
        >
          <IoMenu />
        </div>
      </DialogTrigger>
      <DialogContent>
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
                defaultValue={[250]}
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
          <ThemeSettings />
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
      </DialogContent>
    </Dialog>
  )
}

function ThemeCard({
  colors,
  name,
  selected,
  onClick,
}: {
  colors: string[]
  name: string
  selected: boolean
  onClick: () => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className={cn(
        "relative flex h-20 w-20 cursor-pointer overflow-hidden rounded-md border border-black",
        selected && "border-2",
      )}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {colors.map((color) => (
        <div
          key={color}
          style={{
            width: 100 / colors.length + "%",
            backgroundColor: color,
          }}
        />
      ))}
      <div
        className={cn(
          "absolute -bottom-6 z-10 w-full border-t border-neutral-200 bg-white text-center text-xs font-semibold transition-transform",
          {
            "-translate-y-6": hover || selected,
          },
        )}
      >
        {name}
      </div>
    </div>
  )
}

function ThemeSettings() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <h3 className="text-xl font-semibold">Theme</h3>
      <div className="flex flex-wrap justify-center gap-2">
        <ThemeCard
          colors={["#f5f5f5", "#a3a3a3", "#404040", "#450a0a"]}
          name="Gray"
          selected={theme === "gray"}
          onClick={() => setTheme("gray")}
        />
        <ThemeCard
          colors={["#fee2e2", "#f87171", "#b91c1c"]}
          name="Red"
          selected={theme === "red"}
          onClick={() => setTheme("red")}
        />
        <ThemeCard
          colors={["#dcfce7", "#4ade80", "#15803d"]}
          name="Green"
          selected={theme === "green"}
          onClick={() => setTheme("green")}
        />
      </div>
    </div>
  )
}
