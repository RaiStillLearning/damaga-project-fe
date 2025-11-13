"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function AccountPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState({
    username: "",
    email: "",
    avatar: "/placeholder-avatar.jpg",
  });
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Ambil profile dari token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({
            username: data.user.username || "",
            email: data.user.email || "",
            avatar: data.user.avatar || "/placeholder-avatar.jpg",
          });
        }
      })
      .catch(() => console.log("Failed to load profile"));
  }, [router]);

  // ✅ Upload avatar preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/"))
      return alert("Please select a valid image file.");
    if (file.size > 5 * 1024 * 1024)
      return alert("Image size should be less than 5MB.");

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUser((prev) => ({ ...prev, avatar: result }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Save profile (PUT ke backend)
  // ✅ Save profile (PUT ke backend)
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: user.username,
          avatar: user.avatar,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      // 🔧 Pastikan bentuknya top-level (tidak nested di updated.user)
      const payloadUser = updated.user ? updated.user : updated;

      // ✅ Simpan ke state dan localStorage
      setUser({
        username: payloadUser.username,
        email: payloadUser.email,
        avatar: payloadUser.avatar || "/placeholder-avatar.jpg",
      });

      localStorage.setItem("user", JSON.stringify(payloadUser));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your profile and account settings
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="bg-background/80 backdrop-blur-sm border border-border">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile photo and personal details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.username || "User"}
                    className="h-full w-full object-cover"
                    width={96}
                    height={96}
                  />
                ) : (
                  <span className="text-2xl text-foreground font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-2 -right-2 p-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">
                {user.username}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Change Photo
              </Button>
            </div>
          </div>

          <Separator />

          {/* Input fields */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={user.username || ""}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, username: e.target.value }))
                }
                placeholder="Enter your full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={user.email || ""}
                disabled
                placeholder="Enter your email"
              />
            </div>
          </div>

          <Separator />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
