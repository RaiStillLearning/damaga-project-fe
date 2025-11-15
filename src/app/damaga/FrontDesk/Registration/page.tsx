"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function HotelRegistrationFormPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <HotelRegistrationForm />
    </Suspense>
  );
}

interface RegistrationFormData {
  arrivalDate: string;
  departureDate: string;
  numberOfRooms: string;
  roomType: string;
  dailyRate: string;
  currency: string;
  lastName: string;
  firstName: string;
  address: string;
  advanceDeposit: string;
  companyName: string;
  companyPhone: string;
  companyAddress: string;
  dateOfBirth: string;
  passportId: string;
  nationality: string;
  dateOfIssue: string;
  paymentCash: boolean;
  paymentCredit: boolean;
  voucherNumber: string;
  creditCardNumber: string;
  approvalCode: string;
  remark: string;
  clerk: string;
  roomNo: string;
  discount: string;
  person: string;
}

 function HotelRegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    arrivalDate: "",
    departureDate: "",
    numberOfRooms: "",
    roomType: "",
    dailyRate: "",
    currency: "USD",
    lastName: "",
    firstName: "",
    address: "",
    advanceDeposit: "",
    companyName: "",
    companyPhone: "",
    companyAddress: "",
    dateOfBirth: "",
    passportId: "",
    nationality: "",
    dateOfIssue: "",
    paymentCash: false,
    paymentCredit: false,
    voucherNumber: "",
    creditCardNumber: "",
    approvalCode: "",
    remark: "",
    clerk: "",
    roomNo: "",
    discount: "",
    person: "",
  });

  // Auto-fill clerk name from logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const clerkName = parsed.username || parsed.name || "Admin";
        setFormData((prev) => ({
          ...prev,
          clerk: clerkName,
        }));
      } catch (error) {
        console.error("Failed to parse user from localStorage");
        console.error(error);
      }
    }
  }, []);

  // Fetch booking data if bookingId exists
  useEffect(() => {
    if (bookingId) {
      fetchBookingData(bookingId);
    }
  }, [bookingId]);

  const fetchBookingData = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book-a-room/${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch booking data");

      const booking = await res.json();

      setFormData((prev) => ({
        ...prev,
        arrivalDate: booking.ArrDate
          ? new Date(booking.ArrDate).toISOString().split("T")[0]
          : "",
        departureDate: booking.DeptDate
          ? new Date(booking.DeptDate).toISOString().split("T")[0]
          : "",
        numberOfRooms: booking.NoOfRoom?.toString() || "",
        roomType: booking.RoomType || "",
        dailyRate: booking.RoomRate?.toString() || "",
        currency: "USD",
        lastName: booking.LastName || "",
        firstName: booking.FirstName || "",
        address: booking.Address || "",
        advanceDeposit: "",
        companyName: "",
        companyPhone: booking.Phone?.toString() || "",
        companyAddress: "",
        dateOfBirth: booking.DateOfBirth
          ? new Date(booking.DateOfBirth).toISOString().split("T")[0]
          : "",
        passportId: booking.IDNumber || "",
        nationality: booking.Country || "",
        dateOfIssue: booking.DateOfIssue
          ? new Date(booking.DateOfIssue).toISOString().split("T")[0]
          : "",
        paymentCash: booking.Payment === "Cash",
        paymentCredit: booking.Payment === "Credit Card",
        voucherNumber: "",
        creditCardNumber: "",
        approvalCode: "",
        remark: booking.Request || "",
        roomNo: booking.RoomNumber || "",
        discount: booking.Discount?.toString() || "",
        person: booking.NoOfPerson?.toString() || "",
      }));
    } catch (error) {
      console.error("Error fetching booking:", error);
      alert("Gagal memuat data booking");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const buildPayload = () => {
    return {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Address: formData.address || "-",
      Country: formData.nationality || "Unknown",
      Phone: parseInt(formData.companyPhone) || 0,
      RoomType: formData.roomType || "Standard",
      NoOfRoom: parseInt(formData.numberOfRooms) || 1,
      RoomNumber: formData.roomNo || "",
      ArrDate: formData.arrivalDate,
      DeptDate: formData.departureDate,
      ArrTime: "12:00",
      DeptTime: "12:00",
      TypeOfGuest: "Walk-in",
      City: "-",
      ZipCode: 0,
      RoomRate: parseFloat(formData.dailyRate) || 0,
      NoOfPerson: parseInt(formData.person) || 1,
      Payment: formData.paymentCash
        ? "Cash"
        : formData.paymentCredit
        ? "Credit Card"
        : "Cash",
      ReservationMadeBy: "Direct",
      Clerk: formData.clerk,
      Request: formData.remark || "None",
      IDNumber: formData.passportId || "",
      DateOfIssue: formData.dateOfIssue || null,
      DateOfBirth: formData.dateOfBirth || null,
      Discount: parseInt(formData.discount) || 0,
      Source: "Registration Form",
      Note: formData.remark || "",
      status: "checked-in",
      checkInDate: new Date().toISOString(),
    };
  };

  const handleCheckIn = async () => {
    try {
      if (!formData.firstName || !formData.lastName) {
        alert("Please fill in guest name");
        return;
      }

      const payload = buildPayload();

      let response;
      if (bookingId) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/book-a-room/${bookingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/book-a-room`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to check-in");
      }

      const savedData = await response.json();
      console.log("✅ Check-in successful:", savedData);

      alert("Check-in successful!");
      setIsCheckedIn(true);
      setSaveSuccess(true);
    } catch (error) {
      console.error("Check-in error:", error);
      alert(
        `Check-in failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleSaveCheckIn = async () => {
    setIsSaving(true);
    try {
      if (!formData.firstName || !formData.lastName) {
        alert("Please fill in guest name");
        setIsSaving(false);
        return;
      }

      const payload = buildPayload();

      let response;
      if (bookingId) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/book-a-room/${bookingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/book-a-room`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save check-in data");
      }

      const savedData = await response.json();
      console.log("✅ Data saved successfully:", savedData);

      alert("Check-in data saved successfully! Redirecting to history...");
      setSaveSuccess(true);

      // Redirect with refresh trigger
      setTimeout(() => {
        router.push("/Reservation/ReservationHistory?refresh=true");
      }, 1500);
    } catch (error) {
      console.error("Save error:", error);
      alert(
        `Failed to save check-in data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    setIsCheckedIn(false);
  };

  if (!isCheckedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Damaga Suites
              </h1>
              <p className="text-gray-600">Guest Registration Form</p>
            </div>

            <div className="space-y-6">
              {/* Room Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arrival Date
                  </label>
                  <Input
                    name="arrivalDate"
                    type="date"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date
                  </label>
                  <Input
                    name="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Rooms
                  </label>
                  <Input
                    name="numberOfRooms"
                    type="number"
                    value={formData.numberOfRooms}
                    onChange={handleChange}
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <Input
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    placeholder="Standard/Deluxe/Suite"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Rate
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={(e) =>
                        setFormData({ ...formData, currency: e.target.value })
                      }
                      className="w-24 h-10 px-3 rounded-md border border-gray-300 bg-white"
                    >
                      <option value="USD">USD</option>
                      <option value="Rp">Rp</option>
                    </select>
                    <Input
                      name="dailyRate"
                      type="text"
                      value={formData.dailyRate}
                      onChange={handleChange}
                      placeholder="500,000"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Guest Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family Name/Last Name *
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="SMITH"
                      className="uppercase"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="JOHN"
                      className="uppercase"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Advance Deposit
                    </label>
                    <Input
                      name="advanceDeposit"
                      value={formData.advanceDeposit}
                      onChange={handleChange}
                      placeholder="Amount"
                    />
                  </div>
                </div>
              </div>

              {/* Company & Document Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Phone
                  </label>
                  <Input
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    placeholder="Phone number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Address
                  </label>
                  <Input
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    placeholder="Company address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passport/ID Card Number
                  </label>
                  <Input
                    name="passportId"
                    value={formData.passportId}
                    onChange={handleChange}
                    placeholder="A1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality
                  </label>
                  <Input
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Indonesian"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Issue
                  </label>
                  <Input
                    name="dateOfIssue"
                    type="date"
                    value={formData.dateOfIssue}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <Input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="max-w-xs"
                />
              </div>

              {/* Payment Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Form of Settlement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        name="paymentCash"
                        checked={formData.paymentCash}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">CASH</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voucher Number
                    </label>
                    <Input
                      name="voucherNumber"
                      value={formData.voucherNumber}
                      onChange={handleChange}
                      placeholder="Voucher number"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        name="paymentCredit"
                        checked={formData.paymentCredit}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">CREDIT CARD</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credit Card Number
                    </label>
                    <Input
                      name="creditCardNumber"
                      value={formData.creditCardNumber}
                      onChange={handleChange}
                      placeholder="Card number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credit Card Number
                    </label>
                    <Input
                      name="creditCardNumber"
                      value={formData.creditCardNumber}
                      onChange={handleChange}
                      placeholder="Card number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Approval Code
                    </label>
                    <Input
                      name="approvalCode"
                      value={formData.approvalCode}
                      onChange={handleChange}
                      placeholder="Approval code"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remark
                </label>
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  placeholder="Additional notes..."
                  className="w-full h-20 px-3 py-2 rounded-md border border-gray-300"
                />
              </div>

              {/* Clerk Name (Read-only) */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clerk (Staff Name)
                </label>
                <Input
                  name="clerk"
                  value={formData.clerk}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed text-gray-700"
                  placeholder="Loading..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  This field is automatically filled from your account
                </p>
              </div>

              {/* Additional Check-in Information */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Check-in Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Number
                    </label>
                    <Input
                      name="roomNo"
                      value={formData.roomNo}
                      onChange={handleChange}
                      placeholder="e.g., 101, 205"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount (%)
                    </label>
                    <Input
                      name="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Persons
                    </label>
                    <Input
                      name="person"
                      type="number"
                      min="1"
                      value={formData.person}
                      onChange={handleChange}
                      placeholder="e.g., 2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleCheckIn}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Check In & Continue →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Print View
  return (
    <div className="min-h-screen p-8 print:p-0">
      <div className="max-w-5xl mx-auto">
        <style>{`
          @media print {
            body { margin: 0; padding: 15px; }
            .no-print { display: none !important; }
            table { page-break-inside: avoid; border-collapse: collapse; width: 100%; }
            td, th { border: 2px solid #000; padding: 6px; font-size: 10px; }
            .blue-bg { background-color: #6CB4EE !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        `}</style>

        <div className="no-print mb-6 flex justify-between items-center">
          <Button variant="outline" onClick={handleBack}>
            ← Back to Form
          </Button>
          <div className="flex gap-3 items-center">
            {saveSuccess && (
              <span className="text-sm text-green-600 font-medium">
                ✓ Saved successfully
              </span>
            )}
            <Button
              onClick={handleSaveCheckIn}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSaving ? "Saving..." : "Save Check-In Data"}
            </Button>
            <Button
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Print / Save PDF
            </Button>
          </div>
        </div>

        <div className="bg-white border-4 border-blue-600 p-6 print:border-4">
          <div className="flex justify-between items-center mb-4">
      <Image
        src="/logo/DAMAGA SUITES MRR.png"
        alt="DAMAGA Logo"
        width={120}
        height={120}
        className="object-contain"
      />
            <h1 className="text-4xl font-bold tracking-wider">REGISTRATION</h1>
          </div>

          <table className="w-full border-2 border-black mb-0">
            <thead>
              <tr className="blue-bg bg-blue-300">
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Arrival Date
                </th>
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Departure Date
                </th>
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Number of Room
                </th>
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Room Type
                </th>
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Daily Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-black p-3 text-center text-sm">
                  {formData.arrivalDate}
                </td>
                <td className="border-2 border-black p-3 text-center text-sm">
                  {formData.departureDate}
                </td>
                <td className="border-2 border-black p-3 text-center text-sm">
                  {formData.numberOfRooms}
                </td>
                <td className="border-2 border-black p-3 text-center text-sm uppercase">
                  {formData.roomType}
                </td>
                <td className="border-2 border-black p-3 text-center text-sm">
                  {formData.currency}/{formData.dailyRate}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-2 border-black border-t-0 mb-0">
            <tbody>
              <tr>
                <td
                  className="border-2 border-black p-2 w-2/3 align-top"
                  colSpan={3}
                >
                  <div className="blue-bg bg-blue-300 font-bold text-xs mb-2 p-1 text-center">
                    PLEASE USE BLOCK LETTERS
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">
                        Family Name/Last Name
                      </span>
                      <span>:</span>
                      <span className="uppercase font-bold">
                        {formData.lastName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">First Name</span>
                      <span>:</span>
                      <span className="uppercase font-bold">
                        {formData.firstName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Address</span>
                      <span>:</span>
                      <span>{formData.address}</span>
                    </div>
                  </div>
                </td>
                <td className="border-2 border-black p-2 w-1/3 align-top">
                  <div className="blue-bg bg-blue-300 font-bold text-xs mb-2 p-1 text-center">
                    Advance Deposit
                  </div>
                  <div className="h-12 flex items-center justify-center text-base font-bold">
                    {formData.advanceDeposit || "-"}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-2 border-black border-t-0 mb-0">
            <tbody>
              <tr>
                <td className="border-2 border-black p-2 w-1/2 align-top">
                  <div className="blue-bg bg-blue-300 font-bold text-xs mb-2 p-1 text-center">
                    Company
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex gap-1">
                      <span className="font-semibold">Phone</span>
                      <span>:</span>
                      <span>{formData.companyPhone || "-"}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="font-semibold">Address</span>
                      <span>:</span>
                      <span>{formData.companyAddress || "-"}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <span className="font-semibold">
                        Passport/ID Card Number
                      </span>
                      <span>:</span>
                      <span>{formData.passportId || "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Nationality</span>
                      <span>:</span>
                      <span>{formData.nationality || "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Date of Issue</span>
                      <span>:</span>
                      <span>{formData.dateOfIssue || "-"}</span>
                    </div>
                  </div>
                </td>
                <td className="border-2 border-black p-2 w-1/2 align-top">
                  <div className="blue-bg bg-blue-300 font-bold text-xs mb-2 p-1 text-center">
                    Date of Birth
                  </div>
                  <div className="text-xs p-2">
                    <span className="font-semibold">Date of Birth</span>
                    <span>: </span>
                    <span>{formData.dateOfBirth || "-"}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-2 border-black border-t-0 mb-0">
            <tbody>
              <tr>
                <td className="border-2 border-black p-2" colSpan={4}>
                  <div className="blue-bg bg-blue-300 font-bold text-xs mb-2 p-1 text-center">
                    Form of Settlement
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">CASH</span>
                      <span>{formData.paymentCash ? "☑" : "☐"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">VOUCHER</span>
                      <span>:</span>
                      <span>{formData.voucherNumber || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">CREDIT CARD</span>
                      <span>{formData.paymentCredit ? "☑" : "☐"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Number</span>
                      <span>:</span>
                      <span>{formData.creditCardNumber || "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Number</span>
                      <span>:</span>
                      <span>{formData.creditCardNumber || "-"}</span>
                    </div>
                    <div className="col-span-2"></div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Approval Code</span>
                      <span>:</span>
                      <span>{formData.approvalCode || "-"}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-2 border-black border-t-0 mb-0">
            <tbody>
              <tr>
                <td className="border-2 border-black p-2" colSpan={5}>
                  <div className="text-xs leading-relaxed">
                    Money, jewels and other valuables must be placed in the
                    hotel safety box, otherwise the management will{" "}
                    <strong>not be responsible</strong> for any loss. Signature
                    authorizes after departure billing indicated in method of
                    payment.
                  </div>
                </td>
                <td
                  className="border-2 border-black p-2 text-center"
                  rowSpan={2}
                >
                  <div className="text-xs font-semibold mb-1">
                    Guest Signature
                  </div>
                  <div className="h-16"></div>
                </td>
              </tr>
              <tr className="blue-bg bg-blue-300">
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Room No
                </th>
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Discount
                </th>
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Person
                </th>
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Time
                </th>
                <th className="border-2 border-black p-2 text-xs font-bold">
                  Clerk
                </th>
              </tr>
              <tr>
                <td className="border-2 border-black p-3 text-center text-xs">
                  {formData.roomNo || "-"}
                </td>
                <td className="border-2 border-black p-3 text-center text-xs">
                  {formData.discount ? `${formData.discount}%` : "-"}
                </td>
                <td className="border-2 border-black p-3 text-center text-xs">
                  {formData.person || "-"}
                </td>
                <td className="border-2 border-black p-3 text-center text-xs">
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="border-2 border-black p-3 text-center text-xs">
                  {formData.clerk || "-"}
                </td>
                <td className="border-2 border-black p-2"></td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-2 border-black border-t-0">
            <tbody>
              <tr>
                <td className="border-2 border-black p-2">
                  <div className="text-xs">
                    <span className="font-semibold">Remark:</span>
                    <span className="ml-2">{formData.remark || "-"}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
