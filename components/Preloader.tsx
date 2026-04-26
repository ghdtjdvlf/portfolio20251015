"use client"

import { useEffect } from "react"

export function Preloader({ urls }: { urls: string[] }) {
  useEffect(() => {
    urls.forEach((url) => {
      if (!url) return
      if (url.endsWith(".mp4") || url.endsWith(".webm")) {
        const video = document.createElement("video")
        video.preload = "auto"
        video.src = url
      } else {
        const img = new window.Image()
        img.src = url
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
