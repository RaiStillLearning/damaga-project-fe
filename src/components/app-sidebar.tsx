"use client";

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
// import { useUserContext } from "@/context/userContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

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
  // const { setUser, setLoading } = useUserContext();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   setLoading(true);
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Failed to fetch profile");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       // ✅ Tambahkan null check
  //       if (data && data.user) {
  //         setUser(data.user, token);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch profile:", error);
  //       // Optional: clear user jika token invalid
  //       // clearUser();
  //     })
  //     .finally(() => setLoading(false));
  // }, [setUser, setLoading]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{/* logout button bisa disini */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
