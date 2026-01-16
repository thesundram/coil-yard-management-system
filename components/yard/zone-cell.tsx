"use client"

import type React from "react"

import { forwardRef, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { Zone, Coil } from "@/lib/types"
import { statusColors, emptyZoneColor } from "@/lib/types"
import { getZoneStatus } from "@/lib/data"

interface ZoneCellProps {
  zone: Zone
  isSelected: boolean
  isHighlighted: boolean
  onClick: () => void
  onCoilDrop?: (coilId: string, zoneId: string) => void
}

export const ZoneCell = forwardRef<HTMLButtonElement, ZoneCellProps>(function ZoneCell(
  { zone, isSelected, isHighlighted, onClick, onCoilDrop },
  ref,
) {
  const { isEmpty, coilCount, primaryStatus } = getZoneStatus(zone.id)
  const internalRef = useRef<HTMLButtonElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const bgColor = isEmpty ? emptyZoneColor : statusColors[primaryStatus as Coil["status"]].bg

  useEffect(() => {
    if (isHighlighted && internalRef.current) {
      setTimeout(() => {
        internalRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        })
      }, 100)
    }
  }, [isHighlighted])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const coilId = e.dataTransfer.getData("coilId")
    if (coilId && onCoilDrop) {
      onCoilDrop(coilId, zone.id)
    }
  }

  return (
    <button
      ref={(el) => {
        internalRef.current = el
        if (typeof ref === "function") {
          ref(el)
        } else if (ref) {
          ref.current = el
        }
      }}
      data-zone-id={zone.id}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-md p-2 min-h-[60px] transition-all duration-200",
        "hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        bgColor,
        isEmpty ? "text-slate-600 dark:text-slate-300" : "text-white",
        isSelected && "ring-2 ring-offset-2 ring-blue-600 scale-105",
        isHighlighted &&
          "ring-4 ring-offset-2 ring-amber-400 animate-pulse scale-110 shadow-xl shadow-amber-300/50 z-10",
        isDragOver && "ring-4 ring-offset-2 ring-green-400 scale-110 shadow-xl shadow-green-300/50 z-10",
      )}
      title={`Zone ${zone.id} - ${isEmpty ? "Empty" : `${coilCount} coil(s)`}${isDragOver ? " - Drop here" : ""}`}
    >
      <span className="text-xs font-bold">Z{String(zone.zoneNo).padStart(2, "0")}</span>
      {!isEmpty && <span className="text-[10px] mt-0.5 opacity-90">{coilCount}x</span>}
      {isDragOver && (
        <span className="absolute inset-0 flex items-center justify-center bg-green-500/30 rounded-md">
          <span className="text-[10px] font-bold text-white bg-green-600 px-1 rounded">DROP</span>
        </span>
      )}
    </button>
  )
})
