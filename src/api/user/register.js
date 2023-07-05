import { API_CONFIG } from "../config";

export const registerFetch = ({
  username,
  password,
  fullName,
  userType = "regular",
}) =>
  fetch(API_CONFIG.baseUrl + "/users", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username, password, fullName, userType }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("registering user failed");
    }
    return response.json();
  });
