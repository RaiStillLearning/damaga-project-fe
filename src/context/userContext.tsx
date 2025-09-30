"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type User = {
  username: string;
  email: string;
  avatar?: string;
  divisi?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  clearUser: () => {},
  loading: true,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      setLoading(false);
      return;
    }

    // Kalau ada user di localStorage, set dulu (biar ga flicker ke null)
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }

    // Fetch fresh dari backend biar data terbaru
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // ⬅️ penting biar ga dapet cache lama
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.user) {
          setUserState(data.user);
          localStorage.setItem("user", JSON.stringify(data.user)); // sync lagi
        } else {
          // Kalau token invalid → hapus
          clearUser();
        }
      })
      .catch(() => clearUser())
      .finally(() => setLoading(false));
  }, []);

  const setUser = (user: User, token: string) => {
    setUserState(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const clearUser = () => {
    setUserState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
