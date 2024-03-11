import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state

useEffect(() => {
  const checkAuthentication = async () => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    // ...check with your backend if needed...
    if (token && role) {
      setIsLoggedIn(true);
      setUser({ token, role }); // Update user state with role
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    setIsLoading(false);
  };

  checkAuthentication();
}, []);
  const login = (userData) => {
    // Cookies.set("token", userData.token); // example token storage
    setUser({ token: userData.token, role: userData.role });
    setIsLoggedIn(true);
    Cookies.set("role", userData.role);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, setIsLoggedIn, login, logout, isLoggedIn, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
