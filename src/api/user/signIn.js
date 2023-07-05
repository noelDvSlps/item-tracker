import { API_CONFIG } from "../config";

export const signIn = ({ username, password }) =>
  fetch(API_CONFIG.baseUrl + "/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("login failed");
    }
    return response.json();
  });
