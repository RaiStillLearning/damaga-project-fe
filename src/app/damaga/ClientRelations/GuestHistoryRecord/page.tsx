"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, User, RefreshCw } from "lucide-react";

interface GuestBooking {
  _id: string;
  FirstName: string;
  LastName: string;
  IDNo?: string;
  Phone: number;
  DateOfBirth?: string;
  Address: string;
  Country: string;
  Request?: string;
  createdAt: string;
  updatedAt: string;
}

export default function GuestHistoryRecord() {
  const [searchParams, setSearchParams] = useState({
    LastName: "",
    FirstName: "",
    Phone: "",
  });

  const [searchAll, setSearchAll] = useState("");
  const [guestData, setGuestData] = useState<GuestBooking[]>([]);
  const [allData, setAllData] = useState<GuestBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(() => {
      fetchAllData();
      setLastUpdate(new Date());
    }, 50000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book-a-room`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const bookings = Array.isArray(data) ? data : data.bookings || [];
      setAllData(bookings);
      setGuestData(bookings);
      setLastUpdate(new Date());
    } catch (err: unknown) {
      console.error("Submit error:", err);
      alert("Gagal submit booking");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setLoading(true);
    try {
      const filtered = allData.filter((guest) => {
        const matchesField = (
          guestValue: string | number,
          searchValue: string
        ) =>
          !searchValue ||
          String(guestValue).toLowerCase().includes(searchValue.toLowerCase());

        const matchesAll =
          !searchAll ||
          Object.values(guest)
            .join(" ")
            .toLowerCase()
            .includes(searchAll.toLowerCase());

        return (
          matchesField(guest.FirstName || "", searchParams.FirstName) &&
          matchesField(guest.LastName || "", searchParams.LastName) &&
          matchesField(guest.Phone || "", searchParams.Phone) &&
          matchesAll
        );
      });
      setGuestData(filtered);
    } catch (err) {
      console.error(err);
      alert("Gagal melakukan pencarian");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchParams({
      LastName: "",
      FirstName: "",
      Phone: "",
    });
    setSearchAll("");
    setGuestData(allData);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-sm border">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-sky-500">
            Guest History Record
          </h2>

          {/* 🔁 Auto Refresh */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-sky-50 px-4 py-3 rounded-lg border border-sky-200 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                Auto-refresh aktif (50 detik)
              </span>
            </div>
            <div className="flex items-center gap-3">
              {hydrated && (
                <span className="text-xs text-gray-500">
                  Last update: {lastUpdate.toLocaleTimeString("id-ID")}
                </span>
              )}
              <Button
                onClick={fetchAllData}
                variant="outline"
                size="sm"
                className="h-8 px-3"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh Now
              </Button>
            </div>
          </div>

          {/* 🔍 Global Search */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block text-sky-500">
              Search by Any Data
            </Label>
            <Input
              placeholder="Type any keyword..."
              value={searchAll}
              onChange={(e) => setSearchAll(e.target.value)}
              className="w-full h-10"
            />
          </div>

          {/* 🔎 Search Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-6">
            <div>
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                First Name
              </Label>
              <Input
                name="FirstName"
                value={searchParams.FirstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="h-10"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Last Name
              </Label>
              <Input
                name="LastName"
                value={searchParams.LastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="h-10"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Phone Number
              </Label>
              <Input
                name="Phone"
                value={searchParams.Phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="h-10"
              />
            </div>
          </div>

          {/* 🔘 Buttons */}
          <div className="flex gap-3 justify-end mb-8 pb-6 border-b">
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* 🧾 Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Guest Records ({guestData.length})
            </h3>

            {loading ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                <div className="w-12 h-12 mx-auto mb-3 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500">Loading guest data...</p>
              </div>
            ) : guestData.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                <User className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">No guest records found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full min-w-max">
                  <thead className="bg-sky-50 border-b">
                    <tr>
                      {[
                        "No",
                        "First Name",
                        "Last Name",
                        "ID No",
                        "Phone number",
                        "Date Of Birth",
                        "Address",
                        "Nationality",
                        "Note",
                      ].map((head) => (
                        <th
                          key={head}
                          className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {guestData.map((guest, index) => (
                      <tr key={guest._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {guest.FirstName}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {guest.LastName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {guest.IDNo || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {guest.Phone || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {guest.DateOfBirth
                            ? new Date(guest.DateOfBirth).toLocaleDateString(
                                "id-ID"
                              )
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {guest.Address || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {guest.Country || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {guest.Request || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
