import type { Metadata } from "next";
import { WaiterLayout } from "@/components/layouts/WaiterLayout";

export const metadata: Metadata = {
  title: "Staff — Tavolo",
  description: "Waiter floor and orders"
};

export default function StaffSectionLayout({ children }: { children: React.ReactNode }) {
  return <WaiterLayout>{children}</WaiterLayout>;
}
