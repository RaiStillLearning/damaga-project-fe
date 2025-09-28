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
import Image from "next/image";

const divisions = [
  { value: "Lorem1", label: "Lorem 1" },
  { value: "Lorem2", label: "Lorem 2" },
  { value: "Lorem3", label: "Lorem 3" },
  { value: "Lorem4", label: "Lorem 4" },
  { value: "Lorem5", label: "Lorem 5" },
];

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <Image
          src="/logo/DAMAGA SUITES MRR.png"
          alt="DAMAGA Logo"
          width={150}
          height={150}
          className="mx-auto"
        />
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
              {divisions.map((div, idx) => (
                <option key={idx} value={div.value}>
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
          <a href="/login">Sign up</a>
        </Button>
        <p className="text-muted-foreground text-sm">
          {" "}
          I`ll promise never share your data with anyone else. pinky promise!
        </p>
      </CardFooter>
    </Card>
  );
}
