"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "~/lib/utils"

function copyArray(arr: number[][]) {
  return arr.map((row) => row.slice())
}
export default function HomePage() {
  const nRows = 100
  const nCols = 100
  const [grid, setGrid] = useState<number[][]>(
    new Array(nRows).fill(new Array(nCols).fill(0)),
  )

  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  const draggingData = useRef({
    dragging: false,
    startClientX: 0,
    startClientY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  })

  const [transformOrigin, setTransformOrigin] = useState([0, 0])

  const [scale, setScale] = useState(1)

  return (
    <div>
      <div
        className="fixed flex flex-col gap-1 transition-all duration-200"
        onMouseDown={(e) => {
          console.log("drag start")
          draggingData.current = {
            dragging: true,
            startClientX: e.clientX,
            startClientY: e.clientY,
            startOffsetX: xOffset,
            startOffsetY: yOffset,
          }
        }}
        onMouseUp={(e) => {
          draggingData.current.dragging = false
        }}
        onMouseMove={(e) => {
          if (draggingData.current.dragging) {
            setXOffset(
              draggingData.current.startOffsetX +
                e.clientX -
                draggingData.current.startClientX,
            )
            setYOffset(
              draggingData.current.startOffsetY +
                e.clientY -
                draggingData.current.startClientY,
            )
            console.log(xOffset, yOffset)
          }
        }}
        style={{
          top: yOffset,
          left: xOffset,
          scale: scale,
          transformOrigin: `${transformOrigin[0]}px ${transformOrigin[1]}px`,
        }}
        onWheel={(e) => {
          console.log(e.deltaY)
          setScale((prevScale) => prevScale - e.deltaY / 1000)
          setTransformOrigin([e.clientX, e.clientY])
        }}
      >
        {grid.map((row, r) => (
          <div className="flex gap-1" key={r}>
            {row.map((cell, c) => (
              <div
                key={c}
                className={cn("h-6 w-6 border bg-gray-50", {
                  "bg-gray-400": cell === 1,
                })}
                onClick={() => {
                  setGrid((prevGrid) => {
                    const newGrid = copyArray(prevGrid)
                    newGrid[r]![c] = 1 - newGrid[r]![c]!
                    return newGrid
                  })
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
