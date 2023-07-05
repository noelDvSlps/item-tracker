import { useState } from "react";
import { useAuth } from "../providers/authProvider";
import { toast } from "react-hot-toast";
import {
  onlyTextValidation,
  passwordValidation,
  alphaNumericValidation,
  comparePasswords,
} from "../validations/validations";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const RegisterForm = ({ allUsers }) => {
  const [fullNameInput, setFullNameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [inputErrors, setInputErrors] = useState({
    usernameError: undefined,
    passwordInputError: undefined,
    confirmPasswordInputError: undefined,
    fullNameError: undefined,
  });
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const isUsernameExist = (username) => {
    // eslint-disable-next-line react/prop-types
    const result = allUsers.find((user) => user.username === username);
    return result ? true : false;
  };

  const isOkToRegister = () => {
    if (
      onlyTextValidation(fullNameInput) &&
      alphaNumericValidation(usernameInput) &&
      passwordValidation(passwordInput) &&
      comparePasswords(confirmPasswordInput)
    ) {
      return false;
    } else {
      if (
        fullNameInput.trim() === "" ||
        usernameInput.trim() === "" ||
        passwordInput.trim() === "" ||
        confirmPasswordInput.trim() === ""
      ) {
        toast.error("Field(s) cannot be blank");
        return false;
      }
    }

    isUsernameExist(usernameInput) && toast.error("Username already taken");
    return !isUsernameExist(usernameInput);
  };

  return (
    <section>
      <h2 style={{ color: "white" }}>Create User</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (isOkToRegister()) {
            const newUser = {
              username: usernameInput,
              password: passwordInput,
              fullName: fullNameInput,
            };
            register(newUser)
              .then(() => {
                login({ username: usernameInput, password: passwordInput });
                toast.success("registered");
              })
              .catch(() => {
                toast.error("registration failed");
              });
            // localStorage.setItem("user", JSON.stringify(newUser));

            setUsernameInput("");
            setPasswordInput("");
            setFullNameInput("");
            navigate("User/");
            // navigate(0) //refresh so user in localStorage will reflect
          } else {
            toast.error("Please check your inputs");
          }
        }}
      >
        <input
          name="fullName"
          type="text"
          placeholder="fullname"
          onChange={(e) => {
            setFullNameInput(e.target.value);
          }}
          value={fullNameInput}
          autoComplete=""
          onBlur={(e) => {
            const err = !onlyTextValidation(e.target.value)
              ? "Alphabetic only"
              : undefined;
            setInputErrors((existingValues) => ({
              ...existingValues,
              ["fullNameError"]: err,
            }));
          }}
        />
        <div
          style={{
            color: "white",
            borderRadius: "12px",
            backgroundColor: "maroon",
          }}
        >
          {inputErrors.fullNameError}
        </div>

        <input
          name="username"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
          value={usernameInput}
          autoComplete=""
          onBlur={(e) => {
            const err = !alphaNumericValidation(e.target.value)
              ? "Alphanumeric only"
              : undefined;
            setInputErrors((existingValues) => ({
              ...existingValues,
              ["usernameError"]: err,
            }));
          }}
        />
        <div
          style={{
            color: "white",
            borderRadius: "12px",
            backgroundColor: "maroon",
          }}
        >
          {inputErrors.usernameError}
        </div>

        <input
          name="passwordInput"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
          value={passwordInput}
          autoComplete=""
          onBlur={(e) => {
            const err = !passwordValidation(e.target.value)
              ? "Invalid Password: numbers and letters, special characters allowed !@#$%^&*()_+, number of characters should be greater than 8 but less than 21 "
              : undefined;
            setInputErrors((existingValues) => ({
              ...existingValues,
              ["passwordInputError"]: err,
            }));
          }}
          //
        />
        <div
          style={{
            color: "white",
            borderRadius: "12px",
            backgroundColor: "maroon",
          }}
        >
          {inputErrors.passwordInputError}
        </div>
        <input
          name="confirmPasswordInput"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setConfirmPasswordInput(e.target.value);
          }}
          value={confirmPasswordInput}
          autoComplete=""
          onBlur={(e) => {
            const err = !comparePasswords(passwordInput, e.target.value)
              ? "Passwords should be the same "
              : undefined;
            setInputErrors((existingValues) => ({
              ...existingValues,
              ["confirmPasswordInputError"]: err,
            }));
          }}
        />
        <div
          style={{
            color: "white",
            borderRadius: "12px",
            backgroundColor: "maroon",
          }}
        >
          {inputErrors.confirmPasswordInputError}
        </div>
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
