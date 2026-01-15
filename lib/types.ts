// Zone & Coil Data Types for MES/YMS

export type AreaType = "Shade" | "Open"

export type CoilType = "HR" | "CR"

export type CoilStatus = "Free" | "Reserved" | "Issued" | "Blocked"

export interface Zone {
  id: string
  areaType: AreaType
  areaCode: string
  zoneNo: number
  maxCapacity: number
}

export interface Coil {
  id: string
  type: CoilType
  grade: string
  width: number // in mm
  thickness: number // in mm
  weight: number // in tonnes
  status: CoilStatus
  reservedFor?: string // e.g., "Slitter", "CTL", Order ID
}

export interface CoilAllocation {
  zoneId: string
  coilId: string
  stackNo: number
  entryDate: Date
}

// Status color mapping
export const statusColors: Record<CoilStatus, { bg: string; label: string }> = {
  Free: { bg: "bg-blue-500", label: "Available" },
  Reserved: { bg: "bg-amber-500", label: "Reserved" },
  Issued: { bg: "bg-emerald-500", label: "Issued" },
  Blocked: { bg: "bg-red-500", label: "Blocked/Hold" },
}

export const emptyZoneColor = "bg-slate-200 dark:bg-slate-700"
