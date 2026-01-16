"use client";

import { useState, useCallback, Suspense } from "react";
import { YardArea } from "@/components/yard/yard-area";
import { CoilTable } from "@/components/yard/coil-table";
import { SearchPanel } from "@/components/yard/search-panel";
import { Legend } from "@/components/yard/legend";
import { StatsBar } from "@/components/yard/stats-bar";
import { ExcelUpload } from "@/components/yard/excel-upload";
import { getZonesByArea, getZoneById, transferCoil } from "@/lib/data";
import type { Zone } from "@/lib/types";
import { Factory } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/footer";

function YardVisualizationContent() {
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [highlightedZoneId, setHighlightedZoneId] = useState<string | null>(
    null
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  const shade1Zones = getZonesByArea("S1");
  const shade2Zones = getZonesByArea("S2");
  const openZones = getZonesByArea("OP");

  const selectedZone = selectedZoneId
    ? getZoneById(selectedZoneId) ?? null
    : null;

  const handleZoneClick = (zone: Zone) => {
    setSelectedZoneId(zone.id);
    setHighlightedZoneId(null);
  };

  const handleLocateCoil = (zoneId: string) => {
    setHighlightedZoneId(zoneId);
    setSelectedZoneId(zoneId);
    setTimeout(() => setHighlightedZoneId(null), 3000);
  };

  const handleDataChange = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const handleCoilDrop = useCallback(
    (coilId: string, toZoneId: string) => {
      const result = transferCoil(coilId, toZoneId);
      if (result.success) {
        toast({
          title: "Coil Transferred",
          description: result.message,
        });
        setSelectedZoneId(toZoneId);
        setRefreshKey((k) => k + 1);
      } else {
        toast({
          title: "Transfer Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  return (
    <div className="min-h-screen bg-background" key={refreshKey}>
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Factory className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-balance">
                Coil Yard Management System
              </h1>
              <p className="text-sm text-muted-foreground">
                Real-time Yard Visualization & Allocation
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                By Uttam Innovatime Solution
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Bar */}
        <StatsBar />

        {/* Legend */}
        <Legend />

        {/* Top Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExcelUpload onImportComplete={handleDataChange} />
          <SearchPanel onLocateCoil={handleLocateCoil} />
        </div>

        {/* Yard Visualization - Full Width */}
        <div className="space-y-4">
          {/* Shaded Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <YardArea
              title="SHADE-1 (Covered Storage)"
              zones={shade1Zones}
              selectedZoneId={selectedZoneId}
              highlightedZoneId={highlightedZoneId}
              onZoneClick={handleZoneClick}
              onCoilDrop={handleCoilDrop}
              columns={5}
            />
            <YardArea
              title="SHADE-2 (Covered Storage)"
              zones={shade2Zones}
              selectedZoneId={selectedZoneId}
              highlightedZoneId={highlightedZoneId}
              onZoneClick={handleZoneClick}
              onCoilDrop={handleCoilDrop}
              columns={5}
            />
          </div>

          {/* Open Area */}
          <YardArea
            title="OPEN AREA (Outdoor Storage)"
            zones={openZones}
            selectedZoneId={selectedZoneId}
            highlightedZoneId={highlightedZoneId}
            onZoneClick={handleZoneClick}
            onCoilDrop={handleCoilDrop}
            columns={5}
          />
        </div>

        {/* Coil Details Table - Below Open Area */}
        <CoilTable
          selectedZone={selectedZone}
          onDataChange={handleDataChange}
        />
      </main>

      {/* Footer */}
      <div className="container mx-auto px-4 pb-4">
        <Footer />
      </div>
    </div>
  );
}

export default function YardVisualization() {
  return (
    <Suspense fallback={null}>
      <YardVisualizationContent />
    </Suspense>
  );
}
