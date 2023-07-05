import { API_CONFIG } from "../config";

export const deleteItemFromServer = (user_Id) => {
  const urlWithId = `${API_CONFIG.baseUrl}/items/${user_Id}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const res = fetch(urlWithId, requestOptions)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
  return res;
};
