//Components
import { PageBackground } from "../Components/PageBackground";
import { LoginForm } from "../Components/LoginForm";
import { RegisterForm } from "../Components/RegisterForm";
import { useEffect, useState } from "react";
import Background from "../assets/images/tools.png";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { getUsers } from "../api/user/getUsers";

export const Main = () => {
  const allUsers = useLoaderData();
  const navigate = useNavigate();
  const [form, setForm] = useState("Login");
  const [forms, setForms] = useState(["Login", "Register"]);
  const maybeUser = JSON.parse(localStorage.getItem("user"));
  const swapForms = () => {
    setForms([forms[1], forms[0]]);
    return forms[1];
  };

  useEffect(() => {
    maybeUser ? navigate("../User") : navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gridAutoFlow: "column",
        padding: "50px",
        backgroundImage: `url(${Background})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        alignItems: "center",
        gap: "25px",
      }}
    >
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
        {form === "Login" ? (
          <LoginForm />
        ) : (
          <RegisterForm allUsers={allUsers} />
        )}
        <div style={{ textAlign: "right", padding: "10px" }}>
          <Link
            onClick={() => setForm(swapForms())}
            style={{
              color: "orange",
            }}
          >
            {forms[1]}
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
