import { Card, CardContent } from "@/components/ui/card"
import { zones, allocations, getTotalCoilCount, getTotalWeight, getBlockedCoilsCount } from "@/lib/data"
import { Package, Warehouse, AlertTriangle, CheckCircle, Layers } from "lucide-react"

export function StatsBar() {
  const totalZones = zones.length
  const occupiedZones = new Set(allocations.map((a) => a.zoneId)).size
  const emptyZones = totalZones - occupiedZones
  const totalCoils = getTotalCoilCount()
  const blockedCoils = getBlockedCoilsCount()
  const totalWeight = getTotalWeight()

  const stats = [
    { label: "Total Zones", value: totalZones, icon: Warehouse, color: "text-slate-600" },
    { label: "Occupied", value: occupiedZones, icon: Package, color: "text-blue-600" },
    { label: "Empty Zones", value: emptyZones, icon: CheckCircle, color: "text-emerald-600" },
    { label: "Blocked Coils", value: blockedCoils, icon: AlertTriangle, color: "text-red-600" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card">
          <CardContent className="p-3 flex items-center gap-3">
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="bg-card">
        <CardContent className="p-3 flex items-center gap-3">
          <Layers className="h-8 w-8 text-blue-900" />
          <div>
            <p className="text-2xl font-bold">{totalCoils}</p>
            <p className="text-xs text-muted-foreground">Total Coils</p>
            <p className="text-sm font-semibold text-cyan-600">{totalWeight.toFixed(1)} MT</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
