"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { importCoilsFromData, clearAllStock } from "@/lib/data"
import type { Coil, CoilAllocation, CoilType, CoilStatus } from "@/lib/types"
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle, Download, X, Trash2 } from "lucide-react"
import * as XLSX from "xlsx"

interface ExcelUploadProps {
  onImportComplete: () => void
}

interface ImportResult {
  success: boolean
  message: string
  imported: number
  errors: string[]
}

export function ExcelUpload({ onImportComplete }: ExcelUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setResult(null)

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)

      const stockSheet = workbook.Sheets["Stock"] || workbook.Sheets[workbook.SheetNames[0]]

      if (!stockSheet) {
        setResult({
          success: false,
          message: "Excel file must have a 'Stock' sheet",
          imported: 0,
          errors: ["Missing required sheet"],
        })
        setIsProcessing(false)
        return
      }

      const stockData = XLSX.utils.sheet_to_json<Record<string, unknown>>(stockSheet)

      const newCoils: Coil[] = []
      const newAllocations: CoilAllocation[] = []
      const seenCoilIds = new Set<string>()

      for (const row of stockData) {
        const coilId = String(row["CoilID"] || row["coilId"] || row["id"] || "").trim()

        if (!coilId) continue

        // Only add each coil once
        if (!seenCoilIds.has(coilId)) {
          seenCoilIds.add(coilId)
          newCoils.push({
            id: coilId,
            type: String(row["Type"] || row["type"] || "HR").toUpperCase() as CoilType,
            grade: String(row["Grade"] || row["grade"] || ""),
            width: Number(row["Width"] || row["width"]) || 0,
            thickness: Number(row["Thickness"] || row["thickness"]) || 0,
            weight: Number(row["Weight"] || row["weight"]) || 0,
            status: String(row["Status"] || row["status"] || "Free") as CoilStatus,
            reservedFor:
              row["ReservedFor"] || row["reservedFor"] ? String(row["ReservedFor"] || row["reservedFor"]) : undefined,
          })
        }

        // Add allocation if ZoneID is provided
        const zoneId = String(row["ZoneID"] || row["zoneId"] || "").trim()
        if (zoneId) {
          newAllocations.push({
            zoneId,
            coilId,
            stackNo: Number(row["StackNo"] || row["stackNo"]) || 1,
            entryDate:
              row["EntryDate"] || row["entryDate"]
                ? new Date(String(row["EntryDate"] || row["entryDate"]))
                : new Date(),
          })
        }
      }

      const importResult = importCoilsFromData(newCoils, newAllocations)
      setResult(importResult)

      if (importResult.imported > 0) {
        onImportComplete()
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Failed to parse Excel file",
        imported: 0,
        errors: [error instanceof Error ? error.message : "Unknown error"],
      })
    }

    setIsProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClearStock = () => {
    if (window.confirm("Are you sure you want to clear all stock data? This action cannot be undone.")) {
      const clearResult = clearAllStock()
      setResult({
        success: true,
        message: `Cleared ${clearResult.clearedCoils} coils and ${clearResult.clearedAllocations} allocations`,
        imported: 0,
        errors: [],
      })
      onImportComplete()
    }
  }

  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new()

    const stockData = [
      {
        CoilID: "C100",
        Type: "HR",
        Grade: "IS2062",
        Width: 1250,
        Thickness: 3.5,
        Weight: 18.2,
        Status: "Free",
        ReservedFor: "",
        ZoneID: "S1-Z04",
        StackNo: 1,
        EntryDate: "2024-01-15",
      },
      {
        CoilID: "C101",
        Type: "CR",
        Grade: "IS513",
        Width: 1000,
        Thickness: 1.2,
        Weight: 14.5,
        Status: "Reserved",
        ReservedFor: "Slitter-1",
        ZoneID: "S1-Z04",
        StackNo: 2,
        EntryDate: "2024-01-16",
      },
      {
        CoilID: "C102",
        Type: "HR",
        Grade: "SA516",
        Width: 1400,
        Thickness: 6.0,
        Weight: 25.0,
        Status: "Free",
        ReservedFor: "",
        ZoneID: "S2-Z01",
        StackNo: 1,
        EntryDate: "2024-01-14",
      },
      {
        CoilID: "C103",
        Type: "CR",
        Grade: "IS277",
        Width: 950,
        Thickness: 0.8,
        Weight: 12.0,
        Status: "Blocked",
        ReservedFor: "Quality Hold",
        ZoneID: "OP-Z02",
        StackNo: 1,
        EntryDate: "2024-01-13",
      },
    ]
    const stockSheet = XLSX.utils.json_to_sheet(stockData)

    // Set column widths for better readability
    stockSheet["!cols"] = [
      { wch: 10 }, // CoilID
      { wch: 6 }, // Type
      { wch: 10 }, // Grade
      { wch: 8 }, // Width
      { wch: 10 }, // Thickness
      { wch: 8 }, // Weight
      { wch: 10 }, // Status
      { wch: 15 }, // ReservedFor
      { wch: 10 }, // ZoneID
      { wch: 8 }, // StackNo
      { wch: 12 }, // EntryDate
    ]

    XLSX.utils.book_append_sheet(wb, stockSheet, "Stock")

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "coil_stock_template.xlsx"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearResult = () => setResult(null)

  return (
    <Card className="h-[280px] overflow-hidden flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="text-sm flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Stock Upload (Excel)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 overflow-hidden">
        <div className="text-xs text-muted-foreground">
          <p>
            Upload Excel file with a single <strong>"Stock"</strong> sheet containing coil details and zone allocation.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="excel-upload"
          />
          <Button
            size="sm"
            className="flex-1 h-9"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            <Upload className="h-4 w-4 mr-1" />
            {isProcessing ? "Processing..." : "Upload File"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-9 bg-transparent"
            onClick={downloadTemplate}
            title="Download Template"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-9 bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleClearStock}
            title="Empty Stock"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {result && (
          <Alert variant={result.success && result.errors.length === 0 ? "default" : "destructive"} className="py-2">
            <div className="flex items-start gap-2">
              {result.success && result.errors.length === 0 ? (
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
              ) : (
                <AlertTriangle className="h-4 w-4 mt-0.5" />
              )}
              <div className="flex-1 space-y-1">
                <AlertDescription className="text-xs">{result.message}</AlertDescription>
                {result.errors.length > 0 && (
                  <ScrollArea className="h-[40px]">
                    <ul className="text-[10px] text-muted-foreground space-y-0.5">
                      {result.errors.map((err, i) => (
                        <li key={i}>- {err}</li>
                      ))}
                    </ul>
                  </ScrollArea>
                )}
              </div>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={clearResult}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </Alert>
        )}

        <div className="text-[10px] text-muted-foreground border rounded p-2 bg-muted/30">
          <p className="font-semibold mb-1">Expected Columns (Stock Sheet):</p>
          <div className="space-y-1">
            <p>
              <strong>Coil Info:</strong> CoilID, Type (HR/CR), Grade, Width, Thickness, Weight, Status
              (Free/Reserved/Issued/Blocked), ReservedFor
            </p>
            <p>
              <strong>Allocation:</strong> ZoneID (S1-Z01, S2-Z05, OP-Z01), StackNo, EntryDate
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
