"use client";
import { useState, useEffect } from "react";

export type UserType = {
  username: string;
  email: string;
  avatar?: string;
};

export function useUser() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    const handleStorage = () => {
      const updated = localStorage.getItem("user");
      setUser(updated ? JSON.parse(updated) : null);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateUser = (newUser: UserType) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const clearUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, updateUser, clearUser };
}
