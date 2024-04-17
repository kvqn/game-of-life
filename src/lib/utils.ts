import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
