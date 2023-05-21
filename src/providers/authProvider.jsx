import { createContext, useContext, useEffect, useState } from "react";
import { getUserByUsername } from "../api/user/getUserFromServer";
import { toast } from "react-hot-toast";
import { registerFetch } from "../api/user/register";
import { getUsers } from "../api/user/getUsers";

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

  const validateUser = async (id) => {
    const allUsers = await getUsers();
    const user = await allUsers.find((user) => user.id === id);

    if (user === undefined) {
      setUser(null);
      return false;
    } else {
      setUser(user);
      return true;
    }
  };

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
        validateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
