"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookARoomForm() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    Country: "",
    Phone: "",
    RoomType: "",
    ArrDate: new Date().toISOString().split("T")[0],
    DeptDate: new Date().toISOString().split("T")[0],
    TypeOfGuest: "",
    City: "",
    ZipCode: "",
    Fax: "",
    RoomRate: "",
    NumberOfPerson: "",
    ArrTime: "",
    DeptTime: "",
    Payment: "",
    ReservationMadeBy: "Direct",
    Request: "",
    Clerk: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book-a-room`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      alert("Booking berhasil!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Gagal submit booking");
    }
  };

  return (
    <div className=" p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-sm border">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-sky-500">
            Book A Room
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
            {/* First Name */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                First Name
              </Label>
              <Input
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full h-10"
              />
            </div>

            {/* Last Name */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Last Name
              </Label>
              <Input
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full h-10"
              />
            </div>

            {/* Phone */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Phone
              </Label>
              <Input
                name="Phone"
                type="tel"
                value={formData.Phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full h-10"
              />
            </div>

            {/* Address */}
            <div className="w-full sm:col-span-2 lg:col-span-1">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Address
              </Label>
              <Input
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full h-10"
              />
            </div>

            {/* City */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                City
              </Label>
              <Input
                name="City"
                value={formData.City}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full h-10"
              />
            </div>

            {/* Country */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Country
              </Label>
              <Input
                name="Country"
                value={formData.Country}
                onChange={handleChange}
                placeholder="Enter country"
                className="w-full h-10"
              />
            </div>

            {/* ZipCode */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Zip Code
              </Label>
              <Input
                name="ZipCode"
                type="number"
                value={formData.ZipCode}
                onChange={handleChange}
                placeholder="Enter zip code"
                className="w-full h-10"
              />
            </div>

            {/* Fax */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Fax
              </Label>
              <Input
                name="Fax"
                value={formData.Fax}
                onChange={handleChange}
                placeholder="Enter Fax"
                className="w-full h-10"
              />
            </div>

            {/* Room Type */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Room Type
              </Label>
              <Select
                name="RoomType"
                value={formData.RoomType}
                onValueChange={(val) =>
                  setFormData({ ...formData, RoomType: val })
                }
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type of Guest */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Type of Guest
              </Label>
              <Input
                name="TypeOfGuest"
                value={formData.TypeOfGuest}
                onChange={handleChange}
                placeholder="e.g., Business, Tourist"
                className="w-full h-10"
              />
            </div>

            {/* Number of Persons */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Number of Persons
              </Label>
              <Input
                name="NoOfPerson"
                type="number"
                min="1"
                value={formData.NumberOfPerson}
                onChange={handleChange}
                placeholder="Enter number"
                className="w-full h-10"
              />
            </div>

            {/* Arrival Date */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Arrival Date
              </Label>
              <Input
                name="ArrDate"
                type="date"
                value={formData.ArrDate}
                onChange={handleChange}
                className="w-full h-10"
              />
            </div>

            {/* Arrival Time */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Arrival Time
              </Label>
              <Input
                name="ArrTime"
                type="time"
                value={formData.ArrTime}
                onChange={handleChange}
                className="w-full h-10"
              />
            </div>

            {/* Departure Date */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Departure Date
              </Label>
              <Input
                name="DeptDate"
                type="date"
                value={formData.DeptDate}
                onChange={handleChange}
                className="w-full h-10"
              />
            </div>

            {/* Departure Time */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Departure Time
              </Label>
              <Input
                name="DeptTime"
                type="time"
                value={formData.DeptTime}
                onChange={handleChange}
                className="w-full h-10"
              />
            </div>

            {/* Room Rate */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Room Rate ($)
              </Label>
              <Input
                name="RoomRate"
                type="number"
                min="0"
                step="0.01"
                value={formData.RoomRate}
                onChange={handleChange}
                placeholder="Enter rate"
                className="w-full h-10"
              />
            </div>

            {/* Payment */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Payment Method
              </Label>
              <Input
                name="Payment"
                value={formData.Payment}
                onChange={handleChange}
                placeholder="e.g., Credit Card"
                className="w-full h-10"
              />
            </div>

            {/* Reservation Made By */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Reservation Made By
              </Label>
              <Select
                name="ReservationMadeBy"
                value={formData.ReservationMadeBy}
                onValueChange={(val) =>
                  setFormData({ ...formData, ReservationMadeBy: val })
                }
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phone">Phone</SelectItem>
                  <SelectItem value="Direct">Direct</SelectItem>
                  <SelectItem value="Letter">Letter</SelectItem>
                  <SelectItem value="Fax">Fax</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full">
            <Label className="text-sm font-medium mb-2 block text-sky-500 mx-auto">
              Request
            </Label>
            <Input
              name="Request"
              value={formData.Request}
              onChange={handleChange}
              placeholder="Enter Request"
              className="w-full h-20"
            />
          </div>
          <div className="w-full">
            <Label className="text-sm font-medium mb-2 block text-sky-500 mt-4">
              Clerk
            </Label>
            <Input
              name="Clerk"
              value={formData.Clerk}
              onChange={handleChange}
              placeholder="Enter Clerk"
              className="w-full h-10"
            />
          </div>
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleSubmit}
              className="px-8 h-11 text-base font-medium bg-sky-600 hover:bg-sky-700 text-white"
            >
              Book A Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
