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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

// List of countries
const countries = [
  { value: "afghanistan", label: "Afghanistan" },
  { value: "albania", label: "Albania" },
  { value: "algeria", label: "Algeria" },
  { value: "andorra", label: "Andorra" },
  { value: "argentina", label: "Argentina" },
  { value: "australia", label: "Australia" },
  { value: "austria", label: "Austria" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "belgium", label: "Belgium" },
  { value: "brazil", label: "Brazil" },
  { value: "brunei", label: "Brunei" },
  { value: "cambodia", label: "Cambodia" },
  { value: "canada", label: "Canada" },
  { value: "chile", label: "Chile" },
  { value: "china", label: "China" },
  { value: "colombia", label: "Colombia" },
  { value: "denmark", label: "Denmark" },
  { value: "egypt", label: "Egypt" },
  { value: "finland", label: "Finland" },
  { value: "france", label: "France" },
  { value: "germany", label: "Germany" },
  { value: "greece", label: "Greece" },
  { value: "india", label: "India" },
  { value: "indonesia", label: "Indonesia" },
  { value: "iran", label: "Iran" },
  { value: "iraq", label: "Iraq" },
  { value: "ireland", label: "Ireland" },
  { value: "italy", label: "Italy" },
  { value: "japan", label: "Japan" },
  { value: "jordan", label: "Jordan" },
  { value: "malaysia", label: "Malaysia" },
  { value: "mexico", label: "Mexico" },
  { value: "netherlands", label: "Netherlands" },
  { value: "new zealand", label: "New Zealand" },
  { value: "norway", label: "Norway" },
  { value: "pakistan", label: "Pakistan" },
  { value: "philippines", label: "Philippines" },
  { value: "poland", label: "Poland" },
  { value: "portugal", label: "Portugal" },
  { value: "qatar", label: "Qatar" },
  { value: "russia", label: "Russia" },
  { value: "saudi arabia", label: "Saudi Arabia" },
  { value: "singapore", label: "Singapore" },
  { value: "south africa", label: "South Africa" },
  { value: "south korea", label: "South Korea" },
  { value: "spain", label: "Spain" },
  { value: "sweden", label: "Sweden" },
  { value: "switzerland", label: "Switzerland" },
  { value: "thailand", label: "Thailand" },
  { value: "turkey", label: "Turkey" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "uk", label: "United Kingdom" },
  { value: "usa", label: "United States" },
  { value: "vietnam", label: "Vietnam" },
];

export default function BookARoomForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    Country: "",
    Phone: "",
    RoomType: "",
    NoOfRoom: 0,
    ArrDate: new Date().toISOString().split("T")[0],
    DeptDate: new Date().toISOString().split("T")[0],
    TypeOfGuest: "",
    City: "",
    ZipCode: 0,
    Fax: "",
    RoomRate: 0,
    NumberOfPerson: 1,
    ArrTime: "12:00",
    DeptTime: "12:00",
    Payment: "Cash",
    ReservationMadeBy: "Direct",
    Request: "None",
    Clerk: "Admin",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Validasi semua required field sesuai schema backend
      const requiredFields = [
        "FirstName",
        "LastName",
        "Address",
        "Country",
        "Phone",
        "RoomType",
        "NoOfRoom",
        "TypeOfGuest",
        "City",
        "ZipCode",
        "RoomRate",
        "NumberOfPerson",
        "ArrTime",
        "DeptTime",
        "Payment",
        "Request",
        "Clerk",
      ];

      for (const field of requiredFields) {
        const value = formData[field as keyof typeof formData];
        if (value === "" || value === null || value === undefined) {
          alert(`${field} harus diisi`);
          setIsSubmitting(false);
          return;
        }
      }

      // Konversi ke tipe yang sesuai
      const submitData = {
        ...formData,
        Phone: Number(formData.Phone),
        ZipCode: Number(formData.ZipCode) || 0,
        RoomRate: Number(formData.RoomRate) || 0,
        NumberOfPerson: Number(formData.NumberOfPerson) || 1,
      };

      console.log("Submitting data:", submitData);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book-a-room`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Error: ${res.status}`);
      }

      alert("Booking berhasil!");
      console.log("Response:", data);

      // Reset form ke default valid values
      setFormData({
        FirstName: "",
        LastName: "",
        Address: "",
        Country: "",
        Phone: "",
        RoomType: "",
        NoOfRoom: 0,
        ArrDate: new Date().toISOString().split("T")[0],
        DeptDate: new Date().toISOString().split("T")[0],
        TypeOfGuest: "",
        City: "",
        ZipCode: 0,
        Fax: "",
        RoomRate: 0,
        NumberOfPerson: 1,
        ArrTime: "12:00",
        DeptTime: "12:00",
        Payment: "Cash",
        ReservationMadeBy: "Direct",
        Request: "None",
        Clerk: "Admin",
      });
    } catch (err: unknown) {
      console.error("Submit error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      alert(`Gagal submit booking: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-sm border">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-sky-500">
            Book A Room
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
            {/* First Name */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                First Name *
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
                Last Name *
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
                Phone *
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
                Address *
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
                City *
              </Label>
              <Input
                name="City"
                value={formData.City}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full h-10"
              />
            </div>

            {/* Country - Searchable Dropdown */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Country *
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full h-10 justify-between font-normal"
                  >
                    {formData.Country
                      ? countries.find(
                          (country) => country.label === formData.Country
                        )?.label
                      : "Select country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {countries.map((country) => (
                        <CommandItem
                          key={country.value}
                          value={country.value}
                          onSelect={() => {
                            setFormData({
                              ...formData,
                              Country: country.label,
                            });
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              formData.Country === country.label
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          {country.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* ZipCode */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Zip Code *
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
                Room Type *
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

            {/* No Of Room*/}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                No Of Room *
              </Label>
              <Input
                name="NoOfRoom"
                type="number"
                value={formData.NoOfRoom}
                onChange={handleChange}
                placeholder="EnterNo Of Room"
                className="w-full h-10"
              />
            </div>

            {/* Type of Guest */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Type of Guest *
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
                No of Persons *
              </Label>
              <Input
                name="NumberOfPerson"
                type="number"
                min="1"
                step="1"
                value={formData.NumberOfPerson}
                onChange={handleChange}
                placeholder="Enter number"
                className="w-full h-10"
              />
            </div>

            {/* Arrival Date */}
            <div className="w-full">
              <Label className="text-sm font-medium mb-2 block text-sky-500">
                Arrival Date *
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
                Arrival Time *
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
                Departure Date *
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
                Departure Time *
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
                Room Rate ($) *
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
                Payment Method *
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
                Reservation Made By *
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

          <div className="w-full mb-4">
            <Label className="text-sm font-medium mb-2 block text-sky-500">
              Request *
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
            <Label className="text-sm font-medium mb-2 block text-sky-500">
              Clerk *
            </Label>
            <Input
              name="Clerk"
              value={formData.Clerk}
              onChange={handleChange}
              placeholder="Enter Clerk"
              className="w-full h-10"
            />
          </div>

          <div className="flex justify-end pt-4 border-t mt-6">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 h-11 text-base font-medium bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Book A Room"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
