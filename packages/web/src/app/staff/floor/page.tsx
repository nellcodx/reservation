"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { MapPin, Sparkles } from "lucide-react";
import { TableVisual } from "@/components/TableVisual";
import { tables, type TableInfo } from "@/data/mock";
import { cn } from "@/lib/cn";

async function getTables() {
  return { tables: [...tables] as TableInfo[] };
}

const zones = ["all", "Hall", "Terrace", "VIP"] as const;
type Z = (typeof zones)[number];

export default function WaiterFloorPage() {
  const [filter, setFilter] = useState<Z>("all");
  const { data, isLoading } = useQuery({ queryKey: ["staff", "tables"], queryFn: getTables });

  const visible = useMemo(() => {
    const list = data?.tables ?? [];
    return filter === "all" ? list : list.filter((t) => t.zone === filter);
  }, [data?.tables, filter]);

  if (isLoading) {
    return <p className="text-sm text-stone-500">Loading map…</p>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-stone-900">Dining room</h1>
        <p className="text-sm text-stone-500">Single floor plan (shared coordinates). Tap a table for a toast (mock).</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {zones.map((z) => (
          <button
            key={z}
            type="button"
            onClick={() => setFilter(z)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              filter === z ? "border-stone-800 bg-stone-900 text-white" : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            )}
          >
            {z === "all" ? "All tables" : z}
          </button>
        ))}
      </div>

      <section className="rr-card !border-stone-200/90 bg-white">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-800">
          <MapPin className="h-4 w-4 text-amber-600" />
          House floor
        </h2>
        <div
          className="relative w-full max-w-3xl overflow-x-auto overflow-y-hidden rounded-2xl border border-dashed border-stone-200 bg-gradient-to-b from-stone-50/80 to-amber-50/30 p-2"
          style={{ minHeight: 520 }}
        >
          <div className="relative mx-auto" style={{ width: 700, minHeight: 500, minWidth: 320 }}>
            {visible.map((table) => (
              <TableVisual
                key={table.id}
                table={table}
                onSelect={(t) =>
                  toast.message(`Table #${t.number} · ${t.zone}`, { description: `Status: ${t.status}` })
                }
              />
            ))}
          </div>
        </div>
        {filter !== "all" && <p className="mt-2 text-xs text-stone-500">Filter hides non-matching tables; layout references stay absolute.</p>}
      </section>

      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
        <span className="font-medium">Colors:</span>
        {(
          [
            ["free", "Open"],
            ["reserved", "Reserved"],
            ["occupied", "In service"],
            ["payment", "Check / pay"]
          ] as const
        ).map(([k, label]) => (
          <span
            key={k}
            className={cn(
              "inline-flex items-center gap-1 rounded-md border border-stone-200/80 bg-white px-2 py-0.5",
              k === "free" && "text-emerald-800",
              k === "reserved" && "text-amber-900",
              k === "occupied" && "text-red-800",
              k === "payment" && "text-violet-900"
            )}
          >
            <Sparkles className="h-3 w-3 opacity-60" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
