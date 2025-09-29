"use client";

import React, { useEffect, useState } from "react";
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

type UserType = {
  name: string;
  email: string;
  avatar?: string;
};

const data = {
  navMain: [
    { title: "Home", url: "/damaga", icon: House, isActive: true },
    {
      title: "Client Relations",
      url: "#",
      icon: UserPlus,
      items: [{ title: "Guest History Record", url: "#" }],
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
    { title: "Financial", url: "#", icon: ChartNoAxesCombined },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    avatar: "/default-avatar.png",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // token dari login
          },
        });

        const data = await res.json();
        setUser({
          name: data.username, // ✅ ambil dari backend
          email: data.email,
          avatar: "/default-avatar.png", // bisa diganti kalau ada avatar di DB
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>{/* Tombol logout bisa disini */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
