"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import type { Zone, Coil } from "@/lib/types"
import { statusColors } from "@/lib/types"
import { getCoilsInZone } from "@/lib/data"
import { TransferDialog } from "./transfer-dialog"
import { Package, Layers, Calendar, Ruler, Scale, ArrowRightLeft } from "lucide-react"

interface CoilDetailsPanelProps {
  selectedZone: Zone | null
  onDataChange: () => void
}

export function CoilDetailsPanel({ selectedZone, onDataChange }: CoilDetailsPanelProps) {
  const [transferCoil, setTransferCoil] = useState<(Coil & { stackNo: number; entryDate: Date }) | null>(null)
  const [isTransferOpen, setIsTransferOpen] = useState(false)

  const handleTransferClick = (coil: Coil & { stackNo: number; entryDate: Date }) => {
    setTransferCoil(coil)
    setIsTransferOpen(true)
  }

  const handleTransferComplete = () => {
    setTransferCoil(null)
    onDataChange()
  }

  if (!selectedZone) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm">Zone Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <Package className="h-12 w-12 mb-3 opacity-50" />
            <p className="text-sm">Select a zone to view details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const coilsInZone = getCoilsInZone(selectedZone.id)

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Zone {selectedZone.id}</CardTitle>
            <Badge variant="outline" className="text-xs">
              {selectedZone.areaType === "Shade" ? "Covered" : "Open"} Area
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {coilsInZone.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
              <Package className="h-10 w-10 mb-2 opacity-50" />
              <p className="text-sm font-medium">Zone Empty</p>
              <p className="text-xs">Available for allocation</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-3">
              <div className="space-y-3">
                {coilsInZone
                  .sort((a, b) => a.stackNo - b.stackNo)
                  .map((coil) => (
                    <div key={coil.id} className="rounded-lg border bg-card p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono font-semibold text-sm">{coil.id}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge className={`${statusColors[coil.status].bg} text-white text-xs`}>{coil.status}</Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => handleTransferClick(coil)}
                            title="Transfer Coil"
                          >
                            <ArrowRightLeft className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Type:</span>
                          <Badge variant="secondary" className="text-xs px-1.5">
                            {coil.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Grade:</span>
                          <span className="font-medium">{coil.grade}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Ruler className="h-3 w-3 text-muted-foreground" />
                          <span>
                            {coil.width} x {coil.thickness} mm
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Scale className="h-3 w-3 text-muted-foreground" />
                          <span>{coil.weight} T</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>
                            Stack #{coil.stackNo} - {coil.entryDate.toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {coil.reservedFor && (
                        <div className="text-xs bg-muted px-2 py-1 rounded">
                          <span className="text-muted-foreground">Reserved for: </span>
                          <span className="font-medium">{coil.reservedFor}</span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <TransferDialog
        coil={transferCoil}
        open={isTransferOpen}
        onOpenChange={setIsTransferOpen}
        onTransferComplete={handleTransferComplete}
      />
    </>
  )
}
