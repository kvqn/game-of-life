"use client"

import { FaQuestion } from "react-icons/fa"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { useState } from "react"
import { cn } from "~/lib/utils"
import AboutTheGame from "~/markdown/about-the-game.mdx"

export function About() {
  const [tab, setTab] = useState<0 | 1>(0)
  return (
    <Dialog>
      <DialogTrigger>
        <div className="fixed right-2 top-2 cursor-pointer rounded-md border border-gray-300 bg-gray-100 p-2 text-xl shadow-md transition-colors hover:bg-gray-200">
          <FaQuestion />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-2xl font-bold">About</h1>
          <div className="flex justify-evenly border-b">
            <h2
              className={cn(
                "m-1 w-1/2 cursor-pointer self-center rounded-md p-1 text-center transition-colors hover:bg-gray-100",
                {
                  "bg-gray-200 hover:bg-gray-300": tab === 0,
                },
              )}
              onClick={() => setTab(0)}
            >
              {"Conway's Game of Life"}
            </h2>
            <h2
              className={cn(
                "m-1 w-1/2 cursor-pointer self-center rounded-md p-1 text-center transition-colors hover:bg-gray-100",
                {
                  "bg-gray-200 hover:bg-gray-300": tab === 1,
                },
              )}
              onClick={() => setTab(1)}
            >
              {"How to Play"}
            </h2>
          </div>
          {tab === 0 ? <AboutTheGame /> : <HowToPlay />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AboutGame() {
  return <div></div>
}

function HowToPlay() {
  return <div>How to play</div>
}
