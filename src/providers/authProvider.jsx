/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getUserByUsername } from "../api/user/getUserFromServer";
import { toast } from "react-hot-toast";
import { registerFetch } from "../api/user/register";
import { getUsers } from "../api/user/getUsers";
import { signIn } from "../api/user/signIn";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const register = ({ username, password, fullName }) => {
    return registerFetch({ username, password, fullName }).then((user) => {
      return setUser(user);
    });
  };

  const login = async ({ username, password }) => {
    const userMaybe = await getUserByUsername({ username }); //will throw an error if !username
    const signInResponse = await signIn({ username, password }); //will throw an err if password failed
    //if no error proceed with code below
    setLoginSuccess(true);
    toast.success(`Welcome ${username}`);
    localStorage.setItem("token", signInResponse.token);
    localStorage.setItem(
      "userInformation",
      JSON.stringify(signInResponse.userInformation)
    );
    setUser(userMaybe);
  };

  const logout = () => {
    setUser(null);
    setLoginSuccess(false);
    localStorage.clear();
  };

  //check if a user is still logged in
  const maybeUser = localStorage.getItem("userInformation");

  const validateUser = async (username) => {
    const allUsers = await getUsers();
    const user = await allUsers.find((user) => user.username === username);

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
