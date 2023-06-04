import { API_CONFIG } from "../config";

export const deleteItemFromServer = (user_Id) => {
  const urlWithId = `${API_CONFIG.baseUrl}/items/${user_Id}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  fetch(urlWithId, requestOptions).catch((error) =>
    console.log("error", error)
  );
};
