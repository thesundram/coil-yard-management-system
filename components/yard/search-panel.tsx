"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { searchCoils, findCoilLocation } from "@/lib/data"
import { statusColors } from "@/lib/types"
import type { Coil } from "@/lib/types"
import { Search, MapPin, X } from "lucide-react"

interface SearchPanelProps {
  onLocateCoil: (zoneId: string) => void
}

export function SearchPanel({ onLocateCoil }: SearchPanelProps) {
  const [query, setQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [results, setResults] = useState<Coil[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    const searchResults = searchCoils(query, typeFilter, statusFilter)
    setResults(searchResults)
    setHasSearched(true)
  }

  const handleClear = () => {
    setQuery("")
    setTypeFilter("all")
    setStatusFilter("all")
    setResults([])
    setHasSearched(false)
  }

  const handleLocate = (coilId: string) => {
    const location = findCoilLocation(coilId)
    if (location) {
      // Trigger the locate callback which will set highlighted zone
      onLocateCoil(location.zone.id)
    }
  }

  return (
    <Card className="h-[280px] overflow-hidden flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="text-sm flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search Coils
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 overflow-hidden">
        <div className="flex gap-2">
          <Input
            placeholder="Coil ID or Grade..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="h-9"
          />
          <Button size="sm" onClick={handleSearch} className="h-9">
            <Search className="h-4 w-4" />
          </Button>
          {hasSearched && (
            <Button size="sm" variant="outline" onClick={handleClear} className="h-9 bg-transparent">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="CR">CR</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
              <SelectItem value="Issued">Issued</SelectItem>
              <SelectItem value="Blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasSearched && <div className="text-xs text-muted-foreground">Found {results.length} coil(s)</div>}

        {hasSearched && results.length > 0 && (
          <ScrollArea className="h-[120px]">
            <div className="space-y-2">
              {results.map((coil) => {
                const location = findCoilLocation(coil.id)
                return (
                  <div
                    key={coil.id}
                    className="flex items-center justify-between p-2 rounded border bg-muted/30 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold">{coil.id}</span>
                        <Badge variant="outline" className="text-[10px] px-1">
                          {coil.type}
                        </Badge>
                        <Badge className={`${statusColors[coil.status].bg} text-white text-[10px] px-1`}>
                          {coil.status}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        {coil.grade} | {coil.width}mm | {coil.weight}T
                      </div>
                    </div>
                    {location && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300"
                        onClick={() => handleLocate(coil.id)}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        Locate
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
