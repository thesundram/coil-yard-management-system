"use client"

import { forwardRef, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import type { Zone, Coil } from "@/lib/types"
import { statusColors, emptyZoneColor } from "@/lib/types"
import { getZoneStatus } from "@/lib/data"

interface ZoneCellProps {
  zone: Zone
  isSelected: boolean
  isHighlighted: boolean
  onClick: () => void
}

export const ZoneCell = forwardRef<HTMLButtonElement, ZoneCellProps>(function ZoneCell(
  { zone, isSelected, isHighlighted, onClick },
  ref,
) {
  const { isEmpty, coilCount, primaryStatus } = getZoneStatus(zone.id)
  const internalRef = useRef<HTMLButtonElement>(null)

  const bgColor = isEmpty ? emptyZoneColor : statusColors[primaryStatus as Coil["status"]].bg

  useEffect(() => {
    if (isHighlighted && internalRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        internalRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        })
      }, 100)
    }
  }, [isHighlighted])

  return (
    <button
      ref={(el) => {
        // Handle both forwarded ref and internal ref
        internalRef.current = el
        if (typeof ref === "function") {
          ref(el)
        } else if (ref) {
          ref.current = el
        }
      }}
      data-zone-id={zone.id}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-md p-2 min-h-[60px] transition-all duration-200",
        "hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        bgColor,
        isEmpty ? "text-slate-600 dark:text-slate-300" : "text-white",
        isSelected && "ring-2 ring-offset-2 ring-blue-600 scale-105",
        isHighlighted &&
          "ring-4 ring-offset-2 ring-amber-400 animate-pulse scale-110 shadow-xl shadow-amber-300/50 z-10",
      )}
      title={`Zone ${zone.id} - ${isEmpty ? "Empty" : `${coilCount} coil(s)`}`}
    >
      <span className="text-xs font-bold">Z{String(zone.zoneNo).padStart(2, "0")}</span>
      {!isEmpty && <span className="text-[10px] mt-0.5 opacity-90">{coilCount}x</span>}
    </button>
  )
})
