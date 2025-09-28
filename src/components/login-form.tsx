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

interface User {
  _id: string;
  username: string;
  email: string;
  divisi: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  // login function
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

      const data = await res.json();

      if (!res.ok || !data.token) {
        return alert(data.error || "Login gagal");
      }

      localStorage.setItem("token", data.token);

      // setelah login, ambil data users
      await fetchUsers();

      router.push("/damaga");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan, coba lagi.");
    }
  }

  // fetch users function
  async function fetchUsers() {
    const token = localStorage.getItem("token");
    if (!token) return alert("Anda harus login");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) return alert(data.error || "Gagal ambil users");

      setUsers(data.data); // simpan ke state kalau mau ditampilkan
      console.log("Users:", data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <Image
            src="/logo/DAMAGA SUITES MRR.png"
            alt="DAMAGA Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login to continue to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
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
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href="/login/signup/"
                  className="underline underline-offset-4"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* tampilkan list user kalau mau */}
      {/* {users.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Users List:</h2>
          <ul>
            {users.map((u) => (
              <li key={u._id}>
                {u.username} - {u.email} - {u.divisi}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
