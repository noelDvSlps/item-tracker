import { createContext, useContext, useEffect, useState } from "react";
import { getUserByUsername } from "../api/user/getUserFromServer";
import { toast } from "react-hot-toast";
import { registerFetch } from "../api/user/register";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const register = ({ username, password, fullName }) => {
    return registerFetch({ username, password, fullName }).then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      return setUser(user);
    });
  };

  const login = async ({ username, password }) => {
    const user = await getUserByUsername({ username });
    if (user.password !== password) {
      setLoginSuccess(false);
      throw new Error("wrong password");
    }

    setLoginSuccess(true);
    toast.success(`Welcome ${username}`);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const maybeUser = localStorage.getItem("user");
  useEffect(() => {
    if (maybeUser) {
      setUser(JSON.parse(maybeUser));
    }
  }, [maybeUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginSuccess,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
