'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check initial theme on component mount
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
    setIsDarkMode(!isDarkMode)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDarkMode}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}