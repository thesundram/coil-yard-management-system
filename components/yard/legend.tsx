import { statusColors, emptyZoneColor } from "@/lib/types"

export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-4 p-3 rounded-lg bg-muted/50 text-xs">
      <span className="font-medium text-muted-foreground">Legend:</span>
      <div className="flex items-center gap-1.5">
        <div className={`w-4 h-4 rounded ${emptyZoneColor}`} />
        <span>Empty</span>
      </div>
      {Object.entries(statusColors).map(([status, { bg, label }]) => (
        <div key={status} className="flex items-center gap-1.5">
          <div className={`w-4 h-4 rounded ${bg}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
