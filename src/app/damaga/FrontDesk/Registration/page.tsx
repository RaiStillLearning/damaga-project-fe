"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HotelRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl print:w-full print:shadow-none print:border-none">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Hotel Guest Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Nationality
              </label>
              <Input
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Enter nationality"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Arrival Date
              </label>
              <Input
                name="arrivalDate"
                type="date"
                value={formData.arrivalDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Arrival Time
              </label>
              <Input
                name="arrivalTime"
                type="time"
                value={formData.arrivalTime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Departure Date
              </label>
              <Input
                name="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Departure Time
              </label>
              <Input
                name="departureTime"
                type="time"
                value={formData.departureTime}
                onChange={handleChange}
              />
            </div>
          </form>

          <div className="flex justify-end mt-6 gap-4 print:hidden">
            <Button
              variant="outline"
              onClick={() =>
                setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  address: "",
                  nationality: "",
                  arrivalDate: "",
                  arrivalTime: "",
                  departureDate: "",
                  departureTime: "",
                })
              }
            >
              Clear
            </Button>
            <Button onClick={handlePrint}>Print Form</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
