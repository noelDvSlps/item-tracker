import { API_CONFIG } from "../config";

export const addItem = ({ name, description, image, publicId }) =>
  fetch(API_CONFIG.baseUrl + "/items", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      image,
      publicId,
      status: "available",
      userId: "null",
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("adding History failed");
    }
    return response.json();
  });
