import "~/styles/globals.css"
import "~/styles/colors.css"

import { Inter } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Game of Life",
  description: "Idea by John Conway, implemented by me.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable} font-geist`}
      >
        {children}
      </body>
    </html>
  )
}
