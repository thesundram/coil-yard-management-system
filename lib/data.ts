import type { Zone, Coil, CoilAllocation } from "./types"

// Zone Master Data
export const zones: Zone[] = [
  // Shade-1: 10 zones
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `S1-Z${String(i + 1).padStart(2, "0")}`,
    areaType: "Shade" as const,
    areaCode: "S1",
    zoneNo: i + 1,
    maxCapacity: 30,
  })),
  // Shade-2: 10 zones
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `S2-Z${String(i + 1).padStart(2, "0")}`,
    areaType: "Shade" as const,
    areaCode: "S2",
    zoneNo: i + 1,
    maxCapacity: 30,
  })),
  // Open Area: 5 zones
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `OP-Z${String(i + 1).padStart(2, "0")}`,
    areaType: "Open" as const,
    areaCode: "OP",
    zoneNo: i + 1,
    maxCapacity: 50,
  })),
]

// Coil Master Data (Sample)
export const coils: Coil[] = [
  { id: "C001", type: "HR", grade: "IS2062", width: 1250, thickness: 3.5, weight: 18.2, status: "Free" },
  {
    id: "C002",
    type: "CR",
    grade: "IS513",
    width: 1000,
    thickness: 1.2,
    weight: 14.5,
    status: "Reserved",
    reservedFor: "Slitter-1",
  },
  { id: "C003", type: "HR", grade: "IS2062", width: 1500, thickness: 4.0, weight: 22.1, status: "Free" },
  {
    id: "C004",
    type: "CR",
    grade: "IS513",
    width: 900,
    thickness: 0.8,
    weight: 12.3,
    status: "Blocked",
    reservedFor: "Quality Hold",
  },
  { id: "C005", type: "HR", grade: "SA516", width: 1200, thickness: 6.0, weight: 25.0, status: "Free" },
  {
    id: "C006",
    type: "CR",
    grade: "IS513",
    width: 1100,
    thickness: 1.0,
    weight: 15.8,
    status: "Reserved",
    reservedFor: "CTL-2",
  },
  {
    id: "C007",
    type: "HR",
    grade: "IS2062",
    width: 1350,
    thickness: 5.0,
    weight: 20.5,
    status: "Issued",
    reservedFor: "ORD-2024-001",
  },
  { id: "C008", type: "HR", grade: "SA516", width: 1400, thickness: 8.0, weight: 28.0, status: "Free" },
  { id: "C009", type: "CR", grade: "IS277", width: 950, thickness: 0.6, weight: 10.2, status: "Free" },
  {
    id: "C010",
    type: "CR",
    grade: "IS513",
    width: 1050,
    thickness: 1.5,
    weight: 16.0,
    status: "Reserved",
    reservedFor: "Slitter-2",
  },
  { id: "C011", type: "HR", grade: "IS2062", width: 1300, thickness: 4.5, weight: 21.0, status: "Free" },
  { id: "C012", type: "HR", grade: "IS2062", width: 1250, thickness: 3.0, weight: 17.5, status: "Free" },
  {
    id: "C013",
    type: "HR",
    grade: "SA516",
    width: 1450,
    thickness: 10.0,
    weight: 32.0,
    status: "Blocked",
    reservedFor: "Dimension Check",
  },
  { id: "C014", type: "CR", grade: "IS277", width: 800, thickness: 0.5, weight: 8.5, status: "Free" },
  {
    id: "C015",
    type: "HR",
    grade: "IS2062",
    width: 1200,
    thickness: 2.5,
    weight: 15.0,
    status: "Issued",
    reservedFor: "ORD-2024-002",
  },
  { id: "C016", type: "CR", grade: "IS513", width: 1000, thickness: 1.0, weight: 13.0, status: "Free" },
  { id: "C017", type: "HR", grade: "IS2062", width: 1350, thickness: 3.5, weight: 19.0, status: "Free" },
  {
    id: "C018",
    type: "HR",
    grade: "SA516",
    width: 1500,
    thickness: 12.0,
    weight: 35.0,
    status: "Reserved",
    reservedFor: "CTL-1",
  },
]

// Coil-Zone Allocation (Transaction Data)
export const allocations: CoilAllocation[] = [
  { zoneId: "S1-Z01", coilId: "C001", stackNo: 1, entryDate: new Date("2024-01-10") },
  { zoneId: "S1-Z01", coilId: "C003", stackNo: 2, entryDate: new Date("2024-01-11") },
  { zoneId: "S1-Z02", coilId: "C002", stackNo: 1, entryDate: new Date("2024-01-10") },
  { zoneId: "S1-Z03", coilId: "C004", stackNo: 1, entryDate: new Date("2024-01-09") },
  { zoneId: "S1-Z05", coilId: "C005", stackNo: 1, entryDate: new Date("2024-01-12") },
  { zoneId: "S1-Z07", coilId: "C006", stackNo: 1, entryDate: new Date("2024-01-11") },
  { zoneId: "S1-Z07", coilId: "C007", stackNo: 2, entryDate: new Date("2024-01-12") },
  { zoneId: "S2-Z01", coilId: "C008", stackNo: 1, entryDate: new Date("2024-01-08") },
  { zoneId: "S2-Z02", coilId: "C009", stackNo: 1, entryDate: new Date("2024-01-13") },
  { zoneId: "S2-Z03", coilId: "C010", stackNo: 1, entryDate: new Date("2024-01-10") },
  { zoneId: "S2-Z05", coilId: "C011", stackNo: 1, entryDate: new Date("2024-01-11") },
  { zoneId: "S2-Z06", coilId: "C012", stackNo: 1, entryDate: new Date("2024-01-09") },
  { zoneId: "S2-Z08", coilId: "C013", stackNo: 1, entryDate: new Date("2024-01-07") },
  { zoneId: "OP-Z01", coilId: "C014", stackNo: 1, entryDate: new Date("2024-01-14") },
  { zoneId: "OP-Z02", coilId: "C015", stackNo: 1, entryDate: new Date("2024-01-13") },
  { zoneId: "OP-Z02", coilId: "C016", stackNo: 2, entryDate: new Date("2024-01-14") },
  { zoneId: "OP-Z03", coilId: "C017", stackNo: 1, entryDate: new Date("2024-01-12") },
  { zoneId: "OP-Z05", coilId: "C018", stackNo: 1, entryDate: new Date("2024-01-10") },
]

// Helper functions
export function getZonesByArea(areaCode: string): Zone[] {
  return zones.filter((z) => z.areaCode === areaCode)
}

export function getCoilsInZone(zoneId: string): (Coil & { stackNo: number; entryDate: Date })[] {
  const zoneAllocations = allocations.filter((a) => a.zoneId === zoneId)
  return zoneAllocations
    .map((alloc) => {
      const coil = coils.find((c) => c.id === alloc.coilId)
      if (!coil) return null
      return { ...coil, stackNo: alloc.stackNo, entryDate: alloc.entryDate }
    })
    .filter(Boolean) as (Coil & { stackNo: number; entryDate: Date })[]
}

export function getZoneStatus(zoneId: string): {
  isEmpty: boolean
  coilCount: number
  primaryStatus: Coil["status"] | null
} {
  const coilsInZone = getCoilsInZone(zoneId)
  if (coilsInZone.length === 0) {
    return { isEmpty: true, coilCount: 0, primaryStatus: null }
  }
  // Priority: Blocked > Reserved > Issued > Free
  const statusPriority: Coil["status"][] = ["Blocked", "Reserved", "Issued", "Free"]
  const primaryStatus = statusPriority.find((s) => coilsInZone.some((c) => c.status === s)) || "Free"
  return { isEmpty: false, coilCount: coilsInZone.length, primaryStatus }
}

export function searchCoils(query: string, typeFilter?: string, statusFilter?: string): Coil[] {
  return coils.filter((coil) => {
    const matchesQuery =
      !query ||
      coil.id.toLowerCase().includes(query.toLowerCase()) ||
      coil.grade.toLowerCase().includes(query.toLowerCase())
    const matchesType = !typeFilter || typeFilter === "all" || coil.type === typeFilter
    const matchesStatus = !statusFilter || statusFilter === "all" || coil.status === statusFilter
    return matchesQuery && matchesType && matchesStatus
  })
}

export function findCoilLocation(coilId: string): { zone: Zone; allocation: CoilAllocation } | null {
  const allocation = allocations.find((a) => a.coilId === coilId)
  if (!allocation) return null
  const zone = zones.find((z) => z.id === allocation.zoneId)
  if (!zone) return null
  return { zone, allocation }
}

export function transferCoil(coilId: string, toZoneId: string): { success: boolean; message: string } {
  const allocationIndex = allocations.findIndex((a) => a.coilId === coilId)
  if (allocationIndex === -1) {
    return { success: false, message: "Coil not found in any zone" }
  }

  const targetZone = zones.find((z) => z.id === toZoneId)
  if (!targetZone) {
    return { success: false, message: "Target zone not found" }
  }

  const coilsInTargetZone = getCoilsInZone(toZoneId)
  if (coilsInTargetZone.length >= targetZone.maxCapacity) {
    return { success: false, message: `Target zone ${toZoneId} is at max capacity (${targetZone.maxCapacity})` }
  }

  // Update allocation
  const newStackNo = coilsInTargetZone.length + 1
  allocations[allocationIndex] = {
    ...allocations[allocationIndex],
    zoneId: toZoneId,
    stackNo: newStackNo,
    entryDate: new Date(),
  }

  // Reorder stack numbers in source zone
  const sourceZoneId = allocations[allocationIndex].zoneId
  const sourceAllocations = allocations.filter((a) => a.zoneId === sourceZoneId)
  sourceAllocations.sort((a, b) => a.stackNo - b.stackNo)
  sourceAllocations.forEach((alloc, idx) => {
    alloc.stackNo = idx + 1
  })

  return { success: true, message: `Coil ${coilId} transferred to ${toZoneId}` }
}

export function importCoilsFromData(
  newCoils: Coil[],
  newAllocations: CoilAllocation[],
): { success: boolean; message: string; imported: number; errors: string[] } {
  const errors: string[] = []
  let imported = 0

  // Create a map for quick lookup of new coils
  const newCoilMap = new Map<string, Coil>()
  for (const coil of newCoils) {
    newCoilMap.set(coil.id, coil)
  }

  for (const coil of newCoils) {
    // Check if coil already exists
    const existingCoilIndex = coils.findIndex((c) => c.id === coil.id)
    if (existingCoilIndex !== -1) {
      // Update existing coil instead of skipping
      coils[existingCoilIndex] = coil
    } else {
      coils.push(coil)
    }
    imported++
  }

  const zoneCountsDuringImport = new Map<string, number>()

  // Initialize with existing allocations
  for (const alloc of allocations) {
    const currentCount = zoneCountsDuringImport.get(alloc.zoneId) || 0
    zoneCountsDuringImport.set(alloc.zoneId, currentCount + 1)
  }

  for (const alloc of newAllocations) {
    // Check if coil exists (in existing coils or new coils)
    const coilExists = coils.find((c) => c.id === alloc.coilId) || newCoilMap.get(alloc.coilId)
    if (!coilExists) {
      errors.push(`Allocation for ${alloc.coilId} skipped - coil not found`)
      continue
    }

    // Check if zone exists
    const zoneExists = zones.find((z) => z.id === alloc.zoneId)
    if (!zoneExists) {
      errors.push(`Allocation for ${alloc.coilId} skipped - zone ${alloc.zoneId} not found`)
      continue
    }

    // Check if already allocated - if so, update it
    const existingAllocIndex = allocations.findIndex((a) => a.coilId === alloc.coilId)
    if (existingAllocIndex !== -1) {
      // Get old zone to decrement count
      const oldZoneId = allocations[existingAllocIndex].zoneId
      if (oldZoneId !== alloc.zoneId) {
        const oldCount = zoneCountsDuringImport.get(oldZoneId) || 0
        zoneCountsDuringImport.set(oldZoneId, Math.max(0, oldCount - 1))
      }
      // Update existing allocation
      allocations[existingAllocIndex] = alloc
      // Update count for new zone if different
      if (oldZoneId !== alloc.zoneId) {
        const newCount = zoneCountsDuringImport.get(alloc.zoneId) || 0
        zoneCountsDuringImport.set(alloc.zoneId, newCount + 1)
      }
    } else {
      // Check zone capacity for new allocations using tracked counts
      const currentZoneCount = zoneCountsDuringImport.get(alloc.zoneId) || 0
      const zone = zones.find((z) => z.id === alloc.zoneId)!
      if (currentZoneCount >= zone.maxCapacity) {
        errors.push(
          `Allocation for ${alloc.coilId} skipped - zone ${alloc.zoneId} at max capacity (${zone.maxCapacity})`,
        )
        continue
      }
      allocations.push(alloc)
      zoneCountsDuringImport.set(alloc.zoneId, currentZoneCount + 1)
    }
  }

  return {
    success: errors.length === 0,
    message:
      errors.length > 0
        ? `Imported ${imported} coils. ${errors.length} allocation(s) skipped due to capacity limits.`
        : `Imported ${imported} coils`,
    imported,
    errors,
  }
}

export function getAllAreaCodes(): string[] {
  return [...new Set(zones.map((z) => z.areaCode))]
}

export function getZoneById(zoneId: string): Zone | undefined {
  return zones.find((z) => z.id === zoneId)
}

export function clearAllStock(): {
  success: boolean
  message: string
  clearedCoils: number
  clearedAllocations: number
} {
  const clearedCoils = coils.length
  const clearedAllocations = allocations.length

  // Clear coils array
  coils.length = 0

  // Clear allocations array
  allocations.length = 0

  return {
    success: true,
    message: `Cleared all stock data`,
    clearedCoils,
    clearedAllocations,
  }
}

export function getCoilCountByArea(areaCode: string): number {
  const areaZones = zones.filter((z) => z.areaCode === areaCode)
  const areaZoneIds = new Set(areaZones.map((z) => z.id))

  // Count allocations directly for this area
  let totalCoils = 0
  for (const alloc of allocations) {
    if (areaZoneIds.has(alloc.zoneId)) {
      // Verify the coil exists
      const coilExists = coils.find((c) => c.id === alloc.coilId)
      if (coilExists) {
        totalCoils++
      }
    }
  }
  return totalCoils
}

export function getTotalCoilCount(): number {
  // Count unique coils that have allocations
  const allocatedCoilIds = new Set(allocations.map((a) => a.coilId))
  let count = 0
  for (const coilId of allocatedCoilIds) {
    if (coils.find((c) => c.id === coilId)) {
      count++
    }
  }
  return count
}

export function getTotalWeight(): number {
  const allocatedCoilIds = new Set(allocations.map((a) => a.coilId))
  let weight = 0
  for (const coilId of allocatedCoilIds) {
    const coil = coils.find((c) => c.id === coilId)
    if (coil) {
      weight += coil.weight
    }
  }
  return weight
}

export function getBlockedCoilsCount(): number {
  const allocatedCoilIds = new Set(allocations.map((a) => a.coilId))
  let count = 0
  for (const coilId of allocatedCoilIds) {
    const coil = coils.find((c) => c.id === coilId)
    if (coil && coil.status === "Blocked") {
      count++
    }
  }
  return count
}
