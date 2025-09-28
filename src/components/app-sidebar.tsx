"use client";

import * as React from "react";
import {
  UserPlus,
  NotebookPen,
  Users,
  Box,
  ChartNoAxesCombined,
  House,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Damaga",
    email: "@damagaproject.com",
    avatar: "/photos/logo/DAMAGA SUITES MRR.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/damaga",
      icon: House,
      isActive: true,
      // Hapus items atau jangan tulis sama sekali
      // items: [],  ← jangan ada
    },
    {
      title: "Client Relations",
      url: "#",
      icon: UserPlus,
      items: [
        {
          title: "Guest History Record",
          url: "#",
        },
      ],
    },
    {
      title: "Reservations",
      url: "#",
      icon: NotebookPen,
      items: [
        { title: "Book A Room", url: "#" },
        { title: "Reservation History", url: "#" },
      ],
    },
    {
      title: "Front Desk",
      url: "#",
      icon: Users,
      items: [
        { title: "Expected Arrivals", url: "#" },
        { title: "In House", url: "#" },
        { title: "Expected Departures", url: "#" },
      ],
    },
    {
      title: "Inventory",
      url: "#",
      icon: Box,
      items: [
        { title: "Availability", url: "#" },
        { title: "Room Status", url: "#" },
      ],
    },
    {
      title: "Financial",
      url: "#",
      icon: ChartNoAxesCombined,
      // Hapus items atau biarkan kosong
      // items: [],  ← jangan ada
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* User Profile di atas */}
        <NavUser user={data.user} />

        {/* Team Switcher tetap bisa di header */}
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer bisa dikosongkan atau buat tombol lain */}
      <SidebarFooter>{/* misal tombol logout tambahan */}</SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
