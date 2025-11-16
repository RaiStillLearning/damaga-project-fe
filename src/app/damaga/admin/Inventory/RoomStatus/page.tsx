"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Room {
  number: string;
  type: string;
  floor: string;
  status: string;
}

export default function RoomStatusPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("");
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  const [filters, setFilters] = useState({
    roomType: "",
    floor: "",
    status: "",
  });

  // Check user role
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserRole(parsed.role || parsed.divisi || "");
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    initializeRooms();
  }, []);

  const initializeRooms = () => {
    const rooms: Room[] = [
      // Floor 2
      { number: "201", type: "DSD", floor: "2", status: "VD" },
      { number: "202", type: "DST", floor: "2", status: "VD" },
      { number: "203", type: "DDD", floor: "2", status: "VC" },
      { number: "204", type: "DDT", floor: "2", status: "VCI" },
      { number: "205", type: "DSTD", floor: "2", status: "OD" },
      { number: "206", type: "DSTT", floor: "2", status: "OC" },
      { number: "207", type: "DDT", floor: "2", status: "VC" },
      { number: "208", type: "DSTD", floor: "2", status: "VCI" },
      { number: "209", type: "DSTT", floor: "2", status: "OD" },
      { number: "210", type: "DSTT", floor: "2", status: "OC" },

      // Floor 3
      { number: "301", type: "DSD", floor: "3", status: "VD" },
      { number: "302", type: "DST", floor: "3", status: "VD" },
      { number: "303", type: "DDD", floor: "3", status: "VC" },
      { number: "304", type: "DDT", floor: "3", status: "VCI" },
      { number: "305", type: "DSTD", floor: "3", status: "OD" },
      { number: "306", type: "DSTT", floor: "3", status: "OC" },
      { number: "307", type: "DDT", floor: "3", status: "VC" },
      { number: "308", type: "DSTD", floor: "3", status: "VCI" },
      { number: "309", type: "DSTT", floor: "3", status: "OD" },
      { number: "310", type: "DSTT", floor: "3", status: "OC" },

      // Floor 4
      { number: "401", type: "DSD", floor: "4", status: "OD" },
      { number: "402", type: "DST", floor: "4", status: "VD" },
      { number: "403", type: "DDD", floor: "4", status: "VC" },
      { number: "404", type: "DDT", floor: "4", status: "VCI" },
      { number: "405", type: "DSTD", floor: "4", status: "OD" },
      { number: "406", type: "DSTT", floor: "4", status: "OC" },
      { number: "407", type: "DDT", floor: "4", status: "VC" },
      { number: "408", type: "DSTD", floor: "4", status: "VCI" },
      { number: "409", type: "DSTT", floor: "4", status: "OD" },
      { number: "410", type: "DSTT", floor: "4", status: "OC" },
    ];

    setAllRooms(rooms);
    setFilteredRooms(rooms);
  };

  const handleSort = () => {
    let filtered = [...allRooms];

    if (filters.roomType) {
      filtered = filtered.filter((room) => room.type === filters.roomType);
    }

    if (filters.floor) {
      filtered = filtered.filter((room) => room.floor === filters.floor);
    }

    if (filters.status) {
      filtered = filtered.filter((room) => room.status === filters.status);
    }

    setFilteredRooms(filtered);
  };

  const handleClear = () => {
    setFilters({
      roomType: "",
      floor: "",
      status: "",
    });
    setFilteredRooms(allRooms);
  };

  const getRoomsByFloor = (floor: string) => {
    return filteredRooms.filter((room) => room.floor === floor);
  };

  const getStatusLabel = (code: string) => {
    const statusMap: { [key: string]: string } = {
      VD: "Vacant Dirty",
      VC: "Vacant Clean",
      VCI: "Vacant Clean Inspected",
      OD: "Occupied Dirty",
      OC: "Occupied Clean",
      OS: "Out of Service",
      OO: "Out of Order",
    };
    return statusMap[code] || code;
  };

  // Check if user is admin
  if (userRole.toLowerCase() !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Access Denied
              </h2>
              <p className="text-gray-600">
                This page is only accessible to administrators.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              ROOM STATUS
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/damaga")}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block text-blue-900">
                  Sort by :
                </Label>
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block text-blue-900">
                  Room Type
                </Label>
                <Input
                  placeholder="e.g., DSD, DST"
                  value={filters.roomType}
                  onChange={(e) =>
                    setFilters({ ...filters, roomType: e.target.value })
                  }
                  className="border-blue-300"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block text-blue-900">
                  Floor
                </Label>
                <Select
                  value={filters.floor}
                  onValueChange={(val) =>
                    setFilters({ ...filters, floor: val })
                  }
                >
                  <SelectTrigger className="border-blue-300">
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Floor 2</SelectItem>
                    <SelectItem value="3">Floor 3</SelectItem>
                    <SelectItem value="4">Floor 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block text-blue-900">
                  Status
                </Label>
                <Select
                  value={filters.status}
                  onValueChange={(val) =>
                    setFilters({ ...filters, status: val })
                  }
                >
                  <SelectTrigger className="border-blue-300">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VD">VD - Vacant Dirty</SelectItem>
                    <SelectItem value="VC">VC - Vacant Clean</SelectItem>
                    <SelectItem value="VCI">
                      VCI - Vacant Clean Inspected
                    </SelectItem>
                    <SelectItem value="OD">OD - Occupied Dirty</SelectItem>
                    <SelectItem value="OC">OC - Occupied Clean</SelectItem>
                    <SelectItem value="OS">OS - Out of Service</SelectItem>
                    <SelectItem value="OO">OO - Out of Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSort}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                SORT
              </Button>
              <Button onClick={handleClear} variant="outline" className="px-8">
                CLEAR
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Room Tables - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Floor 2 */}
          <Card className="bg-white shadow-md">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="border-2 border-blue-400 p-3 text-left font-bold text-blue-900 text-sm">
                      ROOM NUMBER
                    </th>
                    <th className="border-2 border-blue-400 p-3 text-left font-bold text-blue-900 text-sm">
                      ROOM TYPE
                    </th>
                    <th className="border-2 border-blue-400 p-3 text-left font-bold text-blue-900 text-sm">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getRoomsByFloor("2").map((room) => (
                    <tr key={room.number} className="hover:bg-blue-50">
                      <td className="border border-blue-200 p-3 text-center font-semibold text-gray-800">
                        {room.number}
                      </td>
                      <td className="border border-blue-200 p-3 text-center text-gray-700">
                        {room.type}
                      </td>
                      <td className="border border-blue-200 p-3 text-center font-medium text-gray-800">
                        <span title={getStatusLabel(room.status)}>
                          {room.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Floor 3 */}
          <Card className="bg-white shadow-md">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="border-2 border-blue-400 p-3 text-left font-bold text-blue-900 text-sm">
                      ROOM NUMBER
                    </th>
                    <th className="border-2 border-blue-400 p-3 text-left font-bold text-blue-900 text-sm">
                      ROOM TYPE
                    </th>
                    <th className="border-2 border-blue-400 p-3 text-left font-bold text-blue-900 text-sm">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getRoomsByFloor("3").map((room) => (
                    <tr key={room.number} className="hover:bg-blue-50">
                      <td className="border border-blue-200 p-3 text-center font-semibold text-gray-800">
                        {room.number}
                      </td>
                      <td className="border border-blue-200 p-3 text-center text-gray-700">
                        {room.type}
                      </td>
                      <td className="border border-blue-200 p-3 text-center font-medium text-gray-800">
                        <span title={getStatusLabel(room.status)}>
                          {room.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Floor 4 */}
          <Card className="bg-white shadow-md">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="border-2 border-blue-400 p-3 text-left font-bold text-blue-900 text-sm">
                      ROOM NUMBER
                    </th>
                    <th className="border-2 border-blue-400 p-3 text-left font-bold text-blue-900 text-sm">
                      ROOM TYPE
                    </th>
                    <th className="border-2 border-blue-400 p-3 text-left font-bold text-blue-900 text-sm">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getRoomsByFloor("4").map((room) => (
                    <tr key={room.number} className="hover:bg-blue-50">
                      <td className="border border-blue-200 p-3 text-center font-semibold text-gray-800">
                        {room.number}
                      </td>
                      <td className="border border-blue-200 p-3 text-center text-gray-700">
                        {room.type}
                      </td>
                      <td className="border border-blue-200 p-3 text-center font-medium text-gray-800">
                        <span title={getStatusLabel(room.status)}>
                          {room.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Status Legend */}
        <Card className="mt-6 bg-blue-50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              ROOM STATUS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-900">VD</span>
                <span className="text-sm text-gray-700">Vacant Dirty</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-900">VC</span>
                <span className="text-sm text-gray-700">Vacant Clean</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-900">VCI</span>
                <span className="text-sm text-gray-700">
                  Vacant Clean Inspected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-900">OD</span>
                <span className="text-sm text-gray-700">Occupied Dirty</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-900">OC</span>
                <span className="text-sm text-gray-700">Occupied Clean</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-900">OS</span>
                <span className="text-sm text-gray-700">Out of Service</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-900">OO</span>
                <span className="text-sm text-gray-700">Out of Order</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
