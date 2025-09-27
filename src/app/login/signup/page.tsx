import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const divisions = [
  { value: "Lorem", label: "Lorem" },
  { value: "Lorem", label: "Lorem" },
  { value: "Lorem", label: "Lorem" },
  { value: "Lorem", label: "Lorem" },
  { value: "Lorem", label: "Lorem" },
];

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Fill the form below to sign up</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Your Username" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="division">Division</Label>
            <select
              id="division"
              className="border rounded px-3 py-2"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select your division
              </option>
              {divisions.map((div) => (
                <option key={div.value} value={div.value}>
                  {div.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <Button variant="outline" className="w-full">
          Sign Up with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
