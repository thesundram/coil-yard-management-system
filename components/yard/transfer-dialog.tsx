"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllAreaCodes, getZonesByArea, transferCoil, getCoilsInZone, findCoilLocation } from "@/lib/data"
import type { Coil, Zone } from "@/lib/types"
import { ArrowRight, AlertTriangle, CheckCircle } from "lucide-react"

interface TransferDialogProps {
  coil: Coil | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onTransferComplete: () => void
}

export function TransferDialog({ coil, open, onOpenChange, onTransferComplete }: TransferDialogProps) {
  const [selectedArea, setSelectedArea] = useState<string>("")
  const [selectedZone, setSelectedZone] = useState<string>("")
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [availableZones, setAvailableZones] = useState<(Zone & { available: number })[]>([])

  const areaCodes = getAllAreaCodes()
  const currentLocation = coil ? findCoilLocation(coil.id) : null

  useEffect(() => {
    if (selectedArea) {
      const zones = getZonesByArea(selectedArea)
      const zonesWithAvailability = zones.map((zone) => {
        const coilsInZone = getCoilsInZone(zone.id)
        return {
          ...zone,
          available: zone.maxCapacity - coilsInZone.length,
        }
      })
      setAvailableZones(zonesWithAvailability)
      setSelectedZone("")
    }
  }, [selectedArea])

  useEffect(() => {
    if (!open) {
      setSelectedArea("")
      setSelectedZone("")
      setResult(null)
    }
  }, [open])

  const handleTransfer = () => {
    if (!coil || !selectedZone) return

    const transferResult = transferCoil(coil.id, selectedZone)
    setResult(transferResult)

    if (transferResult.success) {
      setTimeout(() => {
        onTransferComplete()
        onOpenChange(false)
      }, 1500)
    }
  }

  if (!coil) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Transfer Coil
            <Badge variant="outline" className="font-mono">
              {coil.id}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current Location */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="text-sm">
              <span className="text-muted-foreground">Current Location:</span>
              <span className="font-semibold ml-2">{currentLocation ? currentLocation.zone.id : "Not Allocated"}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <span className="text-muted-foreground">New:</span>
              <span className="font-semibold ml-2">{selectedZone || "Select Zone"}</span>
            </div>
          </div>

          {/* Area Selection */}
          <div className="space-y-2">
            <Label>Target Area</Label>
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger>
                <SelectValue placeholder="Select area..." />
              </SelectTrigger>
              <SelectContent>
                {areaCodes.map((code) => (
                  <SelectItem key={code} value={code}>
                    {code === "S1" ? "Shade-1" : code === "S2" ? "Shade-2" : "Open Area"} ({code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Zone Selection */}
          {selectedArea && (
            <div className="space-y-2">
              <Label>Target Zone</Label>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select zone..." />
                </SelectTrigger>
                <SelectContent>
                  {availableZones.map((zone) => (
                    <SelectItem
                      key={zone.id}
                      value={zone.id}
                      disabled={zone.available === 0 || zone.id === currentLocation?.zone.id}
                    >
                      <div className="flex items-center justify-between w-full gap-3">
                        <span>{zone.id}</span>
                        <Badge variant={zone.available > 0 ? "secondary" : "destructive"} className="text-[10px]">
                          {zone.available} slots
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Result Message */}
          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? (
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleTransfer} disabled={!selectedZone || result?.success}>
            Transfer Coil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
