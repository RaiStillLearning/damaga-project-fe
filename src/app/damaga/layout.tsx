import type { Metadata } from "next";
import "../globals.css";
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
          <header className="h-14 w-full flex items-center border-b px-4">
            <SidebarTrigger />
          </header>

          {/* Konten utama - hapus justify-end dan ganti dengan padding yang proper */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
