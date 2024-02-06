import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkUserAuth, loginUser } from "../utils/apiReqHandler";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    //* if user's cookies are valid then skip login
    async function checkAuthStatus() {
      const data = await checkUserAuth();
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    }

    checkAuthStatus();
  }, []);

  const signup = async (name: string, email: string, password: string) => {};

  const login = async (email: string, password: string) => {
    const userData = await loginUser(email, password);

    if (userData) {
      setUser({ email: userData.email, name: userData.name });
      setIsLoggedIn(true);
    }
  };

  const logout = () => {};

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
