"use client"

import { FaQuestion } from "react-icons/fa"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { useState } from "react"
import { cn } from "~/lib/utils"
import AboutTheGameMarkdown from "~/markdown/about-the-game.mdx"
import HowToPlayMarkdown from "~/markdown/how-to-play.mdx"
import Link from "next/link"
import { isMobile } from "react-device-detect"

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
          {tab === 0 ? <AboutTheGame setTab={setTab} /> : <HowToPlay />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AboutTheGame({ setTab }: { setTab: (tab: 0 | 1) => void }) {
  return (
    <>
      <AboutTheGameMarkdown />
      <div className="mt-4 flex justify-around">
        <Link
          href="/learn-more"
          className="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-300"
        >
          Learn More
        </Link>
        <div
          className="cursor-pointer rounded-md border border-gray-300 bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-300"
          onClick={() => setTab(1)}
        >
          How to Play
        </div>
      </div>
    </>
  )
}

function Keybinds() {
  return (
    <div className="flex flex-col divide-y border">
      <div className="flex divide-x">
        <div className="flex w-1/2 items-center justify-center">
          <p className="rounded-md border border-gray-400 bg-gray-200 px-2">
            {isMobile ? "Tap" : "Left Click"}
          </p>
        </div>
        <div className="w-1/2 p-2 text-center">Toggle Cell State</div>
      </div>
      <div className="flex divide-x">
        <div className="flex w-1/2 items-center justify-center">
          <p className="rounded-md border border-gray-400 bg-gray-200 px-2">
            {isMobile ? "Pinch" : "Mouse Wheel"}
          </p>
        </div>
        <div className="w-1/2 p-2 text-center">Adjust Zoom</div>
      </div>
      <div className="flex divide-x">
        <div className="flex w-1/2 items-center justify-center gap-2">
          {isMobile ? null : (
            <>
              <p className="rounded-md border border-gray-400 bg-gray-200 px-2">
                Spacebar
              </p>
              /
            </>
          )}

          <p className="rounded-md border border-gray-400 bg-gray-200 px-2">
            Playback Button
          </p>
        </div>
        <div className="w-1/2 p-2 text-center">Toggle Playback</div>
      </div>
    </div>
  )
}

function HowToPlay() {
  return (
    <div>
      <h2 className="pb-4 text-center text-xl font-bold">Keybinds</h2>
      <Keybinds />
    </div>
  )
}
