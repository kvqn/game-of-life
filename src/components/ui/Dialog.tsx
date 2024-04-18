"use client"
import * as RadixDialog from "@radix-ui/react-dialog"
import { RxCross2 } from "react-icons/rx"

import "~/styles/RadixDialog.css"

export function Dialog({
  trigger,
  content,
}: {
  trigger: React.ReactNode
  content: React.ReactNode
}) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="DialogOverlay" />
        <RadixDialog.Content className="DialogContent">
          <RadixDialog.Close className="absolute right-2 top-2">
            <div className="cursor-pointer rounded-full border border-white p-1 hover:border-gray-300">
              <RxCross2 />
            </div>
          </RadixDialog.Close>
          {content}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
