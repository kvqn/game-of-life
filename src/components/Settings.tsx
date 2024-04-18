"use client"

import { useState } from "react"
import { IoMenu } from "react-icons/io5"
import { Dialog } from "./ui/Dialog"

export function Settings() {
  const [showMenu, setShowMenu] = useState(false)
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
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
        </div>
      }
    />
  )
}
