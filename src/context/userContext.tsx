"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

type User = {
  username: string;
  email: string;
  avatar?: string;
  divisi?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User, token?: string) => void; // ✅ tambahkan token optional
  clearUser: () => void;
  setLoading: (loading: boolean) => void; // ✅ tambahkan setLoading
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  clearUser: () => {},
  loading: true,
  setLoading: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userFromStorage = localStorage.getItem("user");

    if (token && userFromStorage) {
      setUser(JSON.parse(userFromStorage));
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }

    console.log("🔑 Token from localStorage:", token); // debug
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("👤 Stored user:", parsedUser); // debug
      setUserState(parsedUser);
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then((res) => {
        console.log("📡 Profile response status:", res.status);
        if (res.status === 401)
          throw new Error("Unauthorized: token invalid or expired");
        return res.json();
      })
      .then((data) => {
        if (data?.user) setUserState(data.user);
        else clearUser();
      })
      .catch((err) => {
        console.error("❌ Profile fetch error:", err);
        clearUser();
      })
      .finally(() => setLoading(false));
  }, []);

  const setUser = useCallback((user: User, token?: string) => {
    console.log("💾 setUser called with:", user, token); // ✅ tambahkan log
    setUserState(user);
    localStorage.setItem("user", JSON.stringify(user)); // ⚠️ ini tidak jalan
    if (token) {
      localStorage.setItem("token", token);
    }
    console.log(
      "✅ After save - localStorage user:",
      localStorage.getItem("user")
    ); // ✅ debug
  }, []);

  const clearUser = useCallback(() => {
    setUserState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, clearUser, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
