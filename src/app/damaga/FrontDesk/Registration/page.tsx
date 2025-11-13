"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, FileText } from "lucide-react";
import image from "next/image";

export default function HotelRegistrationForm() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [formData, setFormData] = useState({
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
    roomNo: "",
    discount: "",
    person: "",
    time: "",
    clerk: "",
    remark: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />
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
                    <Calendar className="inline w-4 h-4 mr-2" />
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
                      onChange={handleChange}
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

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  <User className="inline w-5 h-5 mr-2" />
                  Guest Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family Name/Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="SMITH"
                      className="uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="JOHN"
                      className="uppercase"
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

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData({
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
                      roomNo: "",
                      discount: "",
                      person: "",
                      time: "",
                      clerk: "",
                      remark: "",
                    })
                  }
                >
                  Clear Form
                </Button>
                <Button
                  type="button"
                  onClick={handleCheckIn}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Check In →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <Button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Print / Save PDF
          </Button>
        </div>

        <div className="bg-white border-4 border-blue-600 p-6 print:border-4">
          <div className="flex justify-between items-center mb-4">
            <div className="w-24 h-24 bg-gray-800 flex items-center justify-center">
              <span className="text-white text-lg font-bold">DAMAGA</span>
            </div>
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
                    {formData.advanceDeposit || ":"}
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
                      <span className="font-semibold">Name</span>
                      <span>:</span>
                      <span>{formData.companyName || ":"}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="font-semibold">Phone</span>
                      <span>:</span>
                      <span>{formData.companyPhone || ":"}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="font-semibold">Address</span>
                      <span>:</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="font-semibold">
                        Passport/ID Card Number
                      </span>
                      <span>:</span>
                    </div>
                    <span>{formData.passportId}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Nationality</span>
                      <span>:</span>
                      <span>{formData.nationality}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Date of Issue</span>
                      <span>:</span>
                      <span>{formData.dateOfIssue}</span>
                    </div>
                  </div>
                </td>
                <td className="border-2 border-black p-2 w-1/2 align-top">
                  <div className="blue-bg bg-blue-300 font-bold text-xs mb-2 p-1 text-center">
                    Date of Birth
                  </div>
                  <span className="">Date of Birth</span>
                  <span>: </span>
                  <span>{formData.dateOfBirth}</span>
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
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{formData.paymentCash ? "☑" : "☐"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">VOUCHER</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>:</span>
                      <span>{formData.voucherNumber || ":"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">CREDIT CARD</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{formData.paymentCredit ? "☑" : "☐"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Number</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>:</span>
                      <span>{formData.creditCardNumber || ":"}</span>
                    </div>
                    <div className="col-span-2"></div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Approval Code</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>:</span>
                      <span>{formData.approvalCode || ":"}</span>
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
                    hotel safety box, otherwish the management will{" "}
                    <strong>not be responsible</strong> for any loss siganture
                    authorizes after departure billing indicated in methode of
                    payment
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
                  :
                </td>
                <td className="border-2 border-black p-3 text-center text-xs">
                  :
                </td>
                <td className="border-2 border-black p-3 text-center text-xs">
                  :
                </td>
                <td className="border-2 border-black p-3 text-center text-xs">
                  :
                </td>
                <td className="border-2 border-black p-3 text-center text-xs">
                  :
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
                    <span className="font-semibold">Remark :</span>
                    <span className="ml-2">{formData.remark || ":"}</span>
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
