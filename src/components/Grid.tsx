"use client"
import { useEffect, useRef, useState } from "react"
import { useGameContext } from "~/contexts/gameContext"
import { cn, sleep } from "~/lib/utils"

const nRows = 100
const nCols = 100

export function Grid() {
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

  const { setShowHelp, playbackRef } = useGameContext()

  useEffect(() => {
    void (async () => {
      while (true) {
        await sleep(200)
        if (playbackRef.current) {
          setGrid((prev) => nextGridState(prev))
        }
      }
    })()
  }, [])

  return (
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
  )
}

function copyArray(arr: number[][]) {
  return arr.map((row) => row.slice())
}

function nextGridState(grid: number[][]) {
  const newGrid = copyArray(grid)
  for (let r = 0; r < nRows; r++) {
    for (let c = 0; c < nCols; c++) {
      const count = [
        grid[r - 1]?.[c - 1],
        grid[r - 1]?.[c],
        grid[r - 1]?.[c + 1],
        grid[r]?.[c - 1],
        grid[r]?.[c + 1],
        grid[r + 1]?.[c - 1],
        grid[r + 1]?.[c],
        grid[r + 1]?.[c + 1],
      ].filter((v) => v === 1).length
      if (grid[r]![c] === 1) {
        if (count < 2 || count > 3) {
          newGrid[r]![c] = 0
        }
      } else {
        if (count === 3) {
          newGrid[r]![c] = 1
        }
      }
    }
  }
  return newGrid
}
