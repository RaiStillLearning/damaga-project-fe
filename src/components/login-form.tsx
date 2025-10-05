"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserContext } from "@/context/userContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        return alert("Login gagal: " + (errData.error || res.statusText));
      }

      const data = await res.json();
      console.log("🔐 Login response:", data); // ✅ debug

      if (!data.user || !data.token) {
        return alert("Login gagal: response invalid");
      }

      // Simpan token dulu
      localStorage.setItem("token", data.token);

      // Simpan user di context
      setUser(
        {
          username: data.user.username,
          email: data.user.email,
          avatar: data.user.avatar || "/default-avatar.png",
          divisi: data.user.divisi || "",
        },
        data.token
      );

      console.log("✅ User & token saved"); // ✅ debug
      console.log("Token in localStorage:", localStorage.getItem("token")); // ✅ debug
      console.log("User in localStorage:", localStorage.getItem("user")); // ✅ debug

      // Redirect ke dashboard
      router.push("/damaga");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan, coba lagi.");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white shadow-xl border border-gray-200 rounded-2xl">
        <CardHeader className="text-center">
          <Image
            src="/logo/DAMAGA SUITES MRR.png"
            alt="DAMAGA Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <CardTitle className="text-xl text-gray-800 font-bold">
            Welcome back
          </CardTitle>
          <CardDescription className="text-gray-500">
            Login to continue to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <a
                  href="/forgot-password"
                  className="ml-auto text-sm text-sky-600 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-md"
            >
              Login
            </Button>

            {/* Sign up link */}
            <div className="text-center text-sm mt-2 text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/login/signup/"
                className="underline underline-offset-4 text-sky-600 font-medium"
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs mt-4 text-stone-900">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
