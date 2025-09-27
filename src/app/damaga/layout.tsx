import type { Metadata } from "next";
import "./../../app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "Damaga",
  description: "Dashboard Damaga",
};

export default function DamagaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar di kiri */}
        <AppSidebar />

        {/* Area utama di kanan */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 w-full flex items-center border-b">
            <SidebarTrigger />
          </header>

          {/* Konten utama pojok kanan */}
          <main className="flex-1 flex justify-end items-start p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
