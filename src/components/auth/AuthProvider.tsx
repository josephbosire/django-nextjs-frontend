"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const LOCAL_STORAGE_KEY = "is_authenticated";
const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";
const LOCAL_USERNAME_KEY = "username";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username?: string) => void;
  logout: () => void;
  loginRequiredRedirect: () => void;
  username?: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuthStatus) {
      const parsedIntKey = parseInt(storedAuthStatus);
      setIsAuthenticated(parsedIntKey === 1);
    }
    const storedUsername = localStorage.getItem(LOCAL_USERNAME_KEY);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const login = (username) => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "1");
    const nextUrl = searchParams.get("next");
    const invalidNextUrl = ["/logout", "/login"];
    const nextUrlValid =
      nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl);
    console.log(nextUrlValid);
    if (nextUrlValid) {
      router.replace(nextUrl);
    } else {
      router.replace(LOGIN_REDIRECT_URL);
    }

    if (username) {
      localStorage.setItem(LOCAL_USERNAME_KEY, username);
      setUsername(username);
    } else {
      localStorage.removeItem(LOCAL_USERNAME_KEY);
    }
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    let loginWithNextUrl = LOGIN_REQUIRED_URL;
    if (LOGIN_REQUIRED_URL !== pathName) {
      loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathName}`;
    }
    router.replace(loginWithNextUrl);
  };

  const loginRequiredRedirect = () => {
    // User is not logged in via API
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    router.replace(LOGIN_REQUIRED_URL);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loginRequiredRedirect,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
