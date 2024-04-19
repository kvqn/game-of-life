"use client"

import { useGameContext } from "~/contexts/gameContext"
import { toFixedIfNecessary } from "~/lib/utils"

export function Generation() {
  const { generation, generationGap } = useGameContext()

  return (
    <div className="fixed left-2 top-2 rounded-md border bg-white px-2 py-1 shadow-md">
      Generation: {generation} (
      {toFixedIfNecessary(1000 / generationGap.current, 2)} gen/s)
    </div>
  )
}
