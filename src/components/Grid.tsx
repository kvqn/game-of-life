"use client"
import { useEffect } from "react"
import { useGameContext } from "~/contexts/gameContext"
import { cn, sleep } from "~/lib/utils"
import { DraggableZoomable } from "./DraggableZoomable"

export function Grid() {
  const { playbackRef, setGeneration, grid, setGrid, generationGap } =
    useGameContext()

  useEffect(() => {
    console.log("test")
    async function loop() {
      while (true) {
        await sleep(generationGap.current)
        if (playbackRef.current) {
          setGrid((prev) => nextGridState(prev))
          setGeneration((prev) => prev + 1)
        }
      }
    }
    void loop()
  }, [])

  return (
    <DraggableZoomable>
      <div className="flex flex-col gap-1 bg-white p-4">
        {grid.map((row, r) => (
          <div className="flex gap-1" key={r}>
            {row.map((cell, c) => (
              <div
                key={c}
                className={cn(
                  "bg-cell-dead hover:bg-cell-hover h-6 w-6 border transition-colors",
                  {
                    "bg-cell-live border-cell-live-border": cell === 1,
                  },
                )}
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
    </DraggableZoomable>
  )
}

function copyArray(arr: number[][]) {
  return arr.map((row) => row.slice())
}

function nextGridState(grid: number[][]) {
  const newGrid = copyArray(grid)
  const nRows = grid.length
  const nCols = grid[0]!.length
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
