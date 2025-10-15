"use client";
import { createContext, useState, ReactNode } from "react";
import { checkLogin } from "@/services/firestore";

interface User {
  username: string;
}

interface AppContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AppContext = createContext<AppContextProps>({
  user: null,
  login: async () => false,
  logout: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const isValid = await checkLogin(trimmedUsername, trimmedPassword);
    if (isValid) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
