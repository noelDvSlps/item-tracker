import { API_CONFIG } from "../config";

export const deleteItemFromServer = (userId) => {
  const urlWithId = `${API_CONFIG.baseUrl}/items/${userId}`;
  let requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  };
  return fetch(urlWithId, requestOptions)
    .then((response) => {
      if (!response.ok) {
        console.log("error", response.statusText);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
