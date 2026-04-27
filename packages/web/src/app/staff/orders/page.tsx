"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { CheckCircle2, ChefHat, Clock, Loader2 } from "lucide-react";
import { orders, type Order } from "@/data/mock";
import { cn } from "@/lib/cn";

async function getOrders() {
  return { orders: [...orders] as Order[] };
}

const statusLabel: Record<Order["status"], string> = {
  new: "New",
  in_progress: "In progress",
  ready: "Ready to serve",
  served: "Served",
  paid: "Paid"
};

const statusStyle: Record<Order["status"], string> = {
  new: "bg-sky-100 text-sky-900 border-sky-200",
  in_progress: "bg-amber-100 text-amber-950 border-amber-200",
  ready: "bg-emerald-100 text-emerald-900 border-emerald-200",
  served: "bg-stone-200 text-stone-800 border-stone-300",
  paid: "bg-zinc-200 text-zinc-800 border-zinc-300"
};

export default function WaiterOrdersPage() {
  const client = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["staff", "orders"], queryFn: getOrders });
  const list = data?.orders ?? [];

  if (isLoading) {
    return <p className="text-sm text-stone-500">Loading orders…</p>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-stone-900">Active orders</h1>
        <p className="text-sm text-stone-500">From mock data — use actions for demo toasts only.</p>
      </div>

      <ul className="space-y-3">
        {list.map((o) => (
          <li key={o.id} className="rr-card !p-0 overflow-hidden">
            <div
              className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 bg-stone-50/50 px-4 py-2.5"
            >
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Order <span className="font-mono text-xs">#{o.id}</span> · table {o.tableNumber}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-500">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDistanceToNow(new Date(o.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
                    statusStyle[o.status]
                  )}
                >
                  {o.status === "in_progress" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {o.status === "ready" && <CheckCircle2 className="h-3.5 w-3.5" />}
                  {o.status === "new" && <ChefHat className="h-3.5 w-3.5" />}
                  {statusLabel[o.status]}
                </span>
                <span className="text-sm font-semibold text-stone-800">${o.total.toFixed(2)}</span>
              </div>
            </div>
            <ul className="divide-y divide-stone-100">
              {o.items.map((line, i) => (
                <li key={i} className="flex justify-between gap-2 px-4 py-2 text-sm">
                  <span className="text-stone-800">
                    {line.quantity}× {line.menuItem.nameEn}
                  </span>
                  <span className="text-stone-500">{(line.menuItem.price * line.quantity).toFixed(2)} $</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-stone-100 bg-stone-50/30 px-3 py-2 text-right text-xs text-stone-500">
              <button
                type="button"
                onClick={() => {
                  void client.invalidateQueries({ queryKey: ["staff", "orders"] });
                  toast.success("Queue refreshed (mock).");
                }}
                className="text-amber-800 underline-offset-2 hover:underline"
              >
                Nudge kitchen (mock)
              </button>
            </div>
          </li>
        ))}
      </ul>

      {list.length === 0 && (
        <p className="rounded-lg border border-dashed border-stone-200 p-6 text-center text-sm text-stone-500">No orders.</p>
      )}
    </div>
  );
}
