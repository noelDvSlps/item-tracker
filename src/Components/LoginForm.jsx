import { useEffect, useState } from "react";
import { useAuth } from "../providers/authProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const { login, loginSuccess } = useAuth();

  useEffect(() => {
    loginSuccess && navigate("../User");
  }, [loginSuccess, navigate]);

  return (
    <section>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          login({ username: usernameInput, password: passwordInput }).catch(
            (e) => {
              toast.error(e.message);
              throw new Error(e.message);
            }
          );
        }}
      >
        <h2 style={{ color: "white" }}>Login</h2>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
          value={usernameInput}
          autoComplete=""
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
          value={passwordInput}
          autoComplete=""
        />

        <input
          type="submit"
          value="submit"
          style={{
            background:
              "linear-gradient(90deg, rgba(57,95,43,0.9921218487394958) 5%, rgba(247,123,60,1) 50%, rgba(57,95,43,1) 95%)",
          }}
        />
      </form>
    </section>
  );
};
