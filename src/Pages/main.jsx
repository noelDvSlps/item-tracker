/* eslint-disable react-refresh/only-export-components */
//Components
import { PageBackground } from "../Components/PageBackground";
import { LoginForm } from "../Components/LoginForm";
import { RegisterForm } from "../Components/RegisterForm";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { getUsers } from "../api/user/getUsers";
import { useAuth } from "../providers/authProvider";

export const Main = () => {
  const { validateUser, user } = useAuth();
  const allUsers = useLoaderData();
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState("Login");
  const maybeUser = JSON.parse(localStorage.getItem("userInformation"));
  maybeUser && validateUser(maybeUser.username);

  useEffect(() => {
    user && navigate("../User");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section>
      <div>
        <PageBackground />
      </div>
      <div
        style={{
          backgroundColor: "rgba(76,86,49, 0.5)",
          borderRadius: "25px",
          padding: "30px",
        }}
      >
        {currentForm === "Login" ? (
          <LoginForm />
        ) : (
          <RegisterForm allUsers={allUsers} />
        )}
        <div style={{ textAlign: "right", padding: "10px" }}>
          <Link
            onClick={() => {
              setCurrentForm(currentForm === "Login" ? "Register" : "Login");
            }}
            style={{
              color: "orange",
            }}
          >
            {currentForm === "Login" ? "Register" : "Login"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export const allUsersLoader = async () => {
  const res = await getUsers();
  return res;
};
