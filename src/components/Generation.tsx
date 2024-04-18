"use client"

import { useGameContext } from "~/contexts/gameContext"

export function Generation() {
  const { generation } = useGameContext()

  return (
    <div className="fixed left-2 top-2 rounded-md border bg-white px-2 py-1 shadow-md">
      Generation: {generation}
    </div>
  )
}
