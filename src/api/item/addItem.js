import { API_CONFIG } from "../config";

export const addItem = ({ name, description, image, imagePublicId }) =>
  fetch(API_CONFIG.baseUrl + "/items", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      image,
      imagePublicId,
      status: "available",
      user_Id: null,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("adding Item failed");
    }
    return response.json();
  });
