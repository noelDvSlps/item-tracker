import { API_CONFIG } from "../config";

export const updateHistory = ({ user_Id, transaction, item_Id, timeStamp }) =>
  fetch(API_CONFIG.baseUrl + "/itemsHistory", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    body: JSON.stringify({
      user_Id,
      transaction,
      item_Id,
      timeStamp: new Date(timeStamp),
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("adding History failed");
    }
    return response.json();
  });
