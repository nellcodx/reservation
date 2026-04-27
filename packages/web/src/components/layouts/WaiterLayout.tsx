"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ListOrdered, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/staff/floor", label: "Floor", icon: LayoutGrid },
  { href: "/staff/orders", label: "Orders", icon: ListOrdered }
] as const;

export function WaiterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-dvh flex flex-col bg-stone-100/90">
      <header className="border-b border-stone-200 bg-white/95 shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-stone-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/90 text-white">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">HoReCa BOSS · staff</p>
              <p className="text-xs text-stone-500">waiter</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              const I = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition",
                    active ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"
                  )}
                >
                  <I className="h-4 w-4 opacity-80" />
                  {l.label}
                </Link>
              );
            })}
            <Link href="/" className="ml-0 rounded-lg px-3 py-1.5 text-sm text-amber-800/90 hover:underline sm:ml-1">
              Exit to site
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5">{children}</main>
    </div>
  );
}
