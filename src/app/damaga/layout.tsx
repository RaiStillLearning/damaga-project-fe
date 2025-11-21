// src/app/damaga/layout.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { UserProvider, useUserContext } from "@/context/userContext";
import ForbiddenPage from "@/components/Forbidden";

function DamagaInnerLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useUserContext();

  // Bisa diganti skeleton / spinner kalau mau
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-sm text-gray-500">
          Checking permission...
        </div>
      </div>
    );
  }

  // Ambil role dari user (sesuaikan dengan struktur AppUser kamu)
  const rawRole = user?.role ?? user?.divisi ?? "";

  const role = String(rawRole || "").toLowerCase();

  // 🔐 Aturan role yang boleh akses area /damaga
  const allowedRoles = ["admin", "office", "frontdesk", "superadmin"];

  if (!user || !role || !allowedRoles.includes(role)) {
    // Tidak ada user / role tidak diizinkan -> 403
    return <ForbiddenPage />;
  }

  // ✅ Kalau lolos guard, baru render layout asli kamu
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 h-14 w-full flex items-center border-b px-4 bg-white shadow-sm">
            <SidebarTrigger />
          </header>

          <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 bg-[url('/BackgroundLayout/background-layout.jpg')] bg-cover bg-center overflow-auto bg-gray-50">
            <div className="w-full max-w-full">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function DamagaLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <DamagaInnerLayout>{children}</DamagaInnerLayout>
    </UserProvider>
  );
}
