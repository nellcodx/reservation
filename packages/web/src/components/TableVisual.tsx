"use client";

import type { TableInfo } from "@/data/mock";
import { cn } from "@/lib/cn";

const statusClass: Record<TableInfo["status"], string> = {
  free: "border-emerald-400/80 bg-emerald-50 text-emerald-900 shadow-emerald-200/50",
  occupied: "border-red-400/80 bg-red-50 text-red-900 shadow-red-200/50",
  reserved: "border-amber-400/80 bg-amber-50 text-amber-950 shadow-amber-200/50",
  payment: "border-violet-400/80 bg-violet-50 text-violet-900 shadow-violet-200/50"
};

const size = (seats: number) => (seats >= 6 ? "min-w-[4.5rem] min-h-[4.5rem] px-2" : "min-w-[3.75rem] min-h-14 px-1.5");

export function TableVisual({
  table,
  onSelect,
  className
}: {
  table: TableInfo;
  onSelect?: (t: TableInfo) => void;
  className?: string;
}) {
  const interactive = Boolean(onSelect);
  return (
    <button
      type="button"
      style={{ left: table.x, top: table.y, position: "absolute" }}
      onClick={onSelect ? () => onSelect(table) : undefined}
      className={cn(
        "flex -translate-x-0 -translate-y-0 flex-col items-center justify-center gap-0.5 border-2 text-left shadow-sm transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500/70",
        table.shape === "circle" ? "rounded-full" : "rounded-xl",
        size(table.seats),
        statusClass[table.status],
        interactive && "cursor-pointer hover:brightness-[0.98] active:scale-[0.98]",
        !interactive && "pointer-events-none",
        className
      )}
    >
      <span className="text-[0.7rem] font-bold leading-tight">#{table.number}</span>
      <span className="text-[0.6rem] text-stone-600">{table.seats} pax</span>
      {table.status === "reserved" && (table.reservationTime || table.reservationGuest) && (
        <span className="max-w-full truncate text-[0.55rem] leading-tight text-amber-900/90">
          {table.reservationTime} {table.reservationGuest}
        </span>
      )}
      {table.status === "occupied" && table.waiter && (
        <span className="max-w-full truncate text-[0.55rem] text-red-800/80">{table.waiter}</span>
      )}
    </button>
  );
}
