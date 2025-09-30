// app/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { UserProvider } from "@/context/userContext"; // ✅ import

export default function DamagaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />

          <div className="flex-1 flex flex-col">
            <header className="h-14 w-full flex items-center border-b px-4">
              <SidebarTrigger />
            </header>

            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </UserProvider>
  );
}
