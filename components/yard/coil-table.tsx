"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Zone, Coil } from "@/lib/types"
import { statusColors } from "@/lib/types"
import { getCoilsInZone } from "@/lib/data"
import { TransferDialog } from "./transfer-dialog"
import { Package, ArrowRightLeft, GripVertical } from "lucide-react"

interface CoilTableProps {
  selectedZone: Zone | null
  onDataChange: () => void
}

export function CoilTable({ selectedZone, onDataChange }: CoilTableProps) {
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

  const handleDragStart = (e: React.DragEvent, coil: Coil & { stackNo: number; entryDate: Date }) => {
    e.dataTransfer.setData("coilId", coil.id)
    e.dataTransfer.effectAllowed = "move"
  }

  if (!selectedZone) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Coil Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Package className="h-10 w-10 mb-2 opacity-50" />
            <p className="text-sm">Click on a zone to view coil details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const coilsInZone = getCoilsInZone(selectedZone.id)

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              Coil Details - Zone {selectedZone.id}
              <Badge variant="outline" className="text-xs font-normal">
                {selectedZone.areaType === "Shade" ? "Covered" : "Open"} Area
              </Badge>
            </CardTitle>
            <Badge variant="secondary">{coilsInZone.length} Coil(s)</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {coilsInZone.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground border rounded-lg bg-muted/30">
              <Package className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm font-medium">Zone Empty</p>
              <p className="text-xs">Available for allocation</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-3 py-1.5 border-b text-xs text-muted-foreground flex items-center gap-1">
                <GripVertical className="h-3 w-3" />
                Drag a coil row and drop on a zone to transfer
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead className="w-[100px]">Coil ID</TableHead>
                    <TableHead className="w-[60px]">Type</TableHead>
                    <TableHead className="w-[80px]">Grade</TableHead>
                    <TableHead className="w-[80px] text-right">Width (mm)</TableHead>
                    <TableHead className="w-[80px] text-right">Thick (mm)</TableHead>
                    <TableHead className="w-[80px] text-right">Weight (T)</TableHead>
                    <TableHead className="w-[80px]">Status</TableHead>
                    <TableHead className="w-[60px] text-center">Stack #</TableHead>
                    <TableHead className="w-[100px]">Entry Date</TableHead>
                    <TableHead className="w-[120px]">Reserved For</TableHead>
                    <TableHead className="w-[60px] text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coilsInZone
                    .sort((a, b) => a.stackNo - b.stackNo)
                    .map((coil) => (
                      <TableRow
                        key={coil.id}
                        className="hover:bg-muted/30 cursor-grab active:cursor-grabbing"
                        draggable
                        onDragStart={(e) => handleDragStart(e, coil)}
                      >
                        <TableCell className="text-muted-foreground">
                          <GripVertical className="h-4 w-4" />
                        </TableCell>
                        <TableCell className="font-mono font-semibold">{coil.id}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {coil.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{coil.grade}</TableCell>
                        <TableCell className="text-right font-mono">{coil.width}</TableCell>
                        <TableCell className="text-right font-mono">{coil.thickness}</TableCell>
                        <TableCell className="text-right font-mono">{coil.weight}</TableCell>
                        <TableCell>
                          <Badge className={`${statusColors[coil.status].bg} text-white text-xs`}>{coil.status}</Badge>
                        </TableCell>
                        <TableCell className="text-center font-mono">{coil.stackNo}</TableCell>
                        <TableCell className="text-sm">{coil.entryDate.toLocaleDateString()}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{coil.reservedFor || "-"}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => handleTransferClick(coil)}
                            title="Transfer Coil"
                          >
                            <ArrowRightLeft className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
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
