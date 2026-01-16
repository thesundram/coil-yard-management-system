"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ZoneCell } from "./zone-cell"
import type { Zone } from "@/lib/types"
import { getCoilCountByArea } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

interface YardAreaProps {
  title: string
  zones: Zone[]
  selectedZoneId: string | null
  highlightedZoneId: string | null
  onZoneClick: (zone: Zone) => void
  onCoilDrop?: (coilId: string, zoneId: string) => void
  columns?: number
}

export function YardArea({
  title,
  zones,
  selectedZoneId,
  highlightedZoneId,
  onZoneClick,
  onCoilDrop,
  columns = 5,
}: YardAreaProps) {
  const areaCode = zones.length > 0 ? zones[0].areaCode : ""
  const totalCoils = areaCode ? getCoilCountByArea(areaCode) : 0

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {totalCoils} Coil{totalCoils !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {zones.map((zone) => (
            <ZoneCell
              key={zone.id}
              zone={zone}
              isSelected={selectedZoneId === zone.id}
              isHighlighted={highlightedZoneId === zone.id}
              onClick={() => onZoneClick(zone)}
              onCoilDrop={onCoilDrop}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
