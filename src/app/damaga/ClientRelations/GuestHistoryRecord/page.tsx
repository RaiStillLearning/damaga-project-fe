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
  Address: string;
  Country: string;
  Phone: number;
  RoomType: string;
  ArrDate: string;
  DeptDate: string;
  TypeOfGuest: string;
  City: string;
  ZipCode: number;
  RoomRate: number;
  NoOfPerson: number;
  ArrTime: string;
  DeptTime: string;
  Payment: string;
  ReservationMadeBy: string;
  Clerk: string;
  Request?: string;
  Fax?: string;
  createdAt: string;
  updatedAt: string;
}

export default function GuestHistoryRecord() {
  const [searchParams, setSearchParams] = useState({
    LastName: "",
    FirstName: "",
    Phone: "",
    City: "",
    Country: "",
    RoomType: "",
    ArrDate: "",
  });

  const [guestData, setGuestData] = useState<GuestBooking[]>([]);
  const [allData, setAllData] = useState<GuestBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    fetchAllData();

    // Auto refresh setiap 10 detik
    const interval = setInterval(() => {
      fetchAllData();
      setLastUpdate(new Date());
    }, 10000);

    return () => clearInterval(interval);
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

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const bookings = Array.isArray(data) ? data : data.bookings || [];

      setAllData(bookings);
      setGuestData(bookings);
      setLastUpdate(new Date());
    } catch (err: unknown) {
      console.error("Submit error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      alert(`Gagal submit booking: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book-a-room?${queryParams}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      const bookings = Array.isArray(data) ? data : data.bookings || [];
      setGuestData(bookings);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data guest");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchParams({
      LastName: "",
      FirstName: "",
      Phone: "",
      City: "",
      Country: "",
      RoomType: "",
      ArrDate: "",
    });
    setGuestData(allData);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-sm border">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-sky-500">
            Guest History Record
          </h2>

          {/* Auto Refresh Indicator */}
          <div className="mb-6 flex items-center justify-between bg-sky-50 px-4 py-3 rounded-lg border border-sky-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                Auto-refresh aktif (setiap 10 detik)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                Last update: {lastUpdate.toLocaleTimeString("id-ID")}
              </span>
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

          {/* Search Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-6">
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                First Name
              </Label>
              <Input
                name="FirstName"
                value={searchParams.FirstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full h-10"
              />
            </div>

            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Last Name
              </Label>
              <Input
                name="LastName"
                value={searchParams.LastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full h-10"
              />
            </div>

            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Phone Number
              </Label>
              <Input
                name="Phone"
                type="tel"
                value={searchParams.Phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full h-10"
              />
            </div>

            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                City
              </Label>
              <Input
                name="City"
                value={searchParams.City}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full h-10"
              />
            </div>

            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Country
              </Label>
              <Input
                name="Country"
                value={searchParams.Country}
                onChange={handleChange}
                placeholder="Enter country"
                className="w-full h-10"
              />
            </div>

            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Room Type
              </Label>
              <Input
                name="RoomType"
                value={searchParams.RoomType}
                onChange={handleChange}
                placeholder="Enter room type"
                className="w-full h-10"
              />
            </div>

            <div className="w-full sm:col-span-2 lg:col-span-3">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Arrival Date
              </Label>
              <Input
                name="ArrDate"
                type="date"
                value={searchParams.ArrDate}
                onChange={handleChange}
                className="w-full h-10"
              />
            </div>
          </div>

          {/* Search Buttons */}
          <div className="flex gap-3 justify-end mb-8 pb-6 border-b">
            <Button
              onClick={handleClear}
              variant="outline"
              className="px-6 h-10 text-base font-medium"
            >
              Clear
            </Button>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="px-8 h-10 text-base font-medium bg-sky-600 hover:bg-sky-700 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Results Section - Table */}
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
                <p className="text-gray-500">
                  No guest records found. Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full min-w-max">
                  <thead className="bg-sky-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        First Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Last Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Room Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Check-in
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Check-out
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Guests
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Rate
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                        Clerk
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {guestData.map((guest, index) => (
                      <tr
                        key={guest._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {guest.FirstName}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {guest.LastName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.Phone || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.City || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.Country || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-sky-100 text-sky-800">
                            {guest.RoomType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(guest.ArrDate).toLocaleDateString("id-ID")}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(guest.DeptDate).toLocaleDateString("id-ID")}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.NoOfPerson}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                          ${guest.RoomRate.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.Payment || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.Clerk || "-"}
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
