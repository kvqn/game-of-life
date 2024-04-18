"use client"

import { useGesture } from "@use-gesture/react"
import { useRef, useState } from "react"
import { useGameContext } from "~/contexts/gameContext"

function numInBounds(min: number, max: number, num: number) {
  return Math.min(Math.max(min, num), max)
}

export function DraggableZoomable({ children }: { children: React.ReactNode }) {
  const draggingData = useRef({
    dragging: false,
    startClientX: 0,
    startClientY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  })

  const dragging = useRef(false)

  const [transformOrigin, setTransformOrigin] = useState([0, 0])
  const { scale, setScale, offset, setOffset } = useGameContext()

  const binds = useGesture(
    {
      onDrag: ({ first, last, movement: [dx, dy] }) => {
        if (first) {
          draggingData.current = {
            dragging: true,
            startClientX: 0,
            startClientY: 0,
            startOffsetX: offset.x,
            startOffsetY: offset.y,
          }
          dragging.current = true
          console.log("drag start")
        } else if (last) {
          draggingData.current.dragging = false
          setTimeout(() => {
            dragging.current = false
          }, 0)
          console.log("drag end")
        } else {
          setOffset({
            x: draggingData.current.startOffsetX + dx,
            y: draggingData.current.startOffsetY + dy,
          })
        }
      },
      onClickCapture: ({ event }) => {
        if (dragging.current) {
          event.stopPropagation()
        }
      },
      onPinch: ({ delta }) => {
        setScale((prevScale) => prevScale + delta[0])
      },
      onWheel: (e) => {
        console.log(e)
        setTransformOrigin([e.event.clientX, e.event.clientY])
        setScale((prevScale) =>
          numInBounds(0.1, 2, prevScale - e.delta[1] / 1000),
        )
      },
    },
    {
      drag: {
        filterTaps: true,
      },
    },
  )
  return (
    <div
      className="fixed left-1/2 top-1/2"
      {...binds()}
      style={{
        transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
        scale: scale,
        transformOrigin: `${transformOrigin[0]}px ${transformOrigin[1]}px`,
        touchAction: "none",
      }}
    >
      {children}
    </div>
  )
}
