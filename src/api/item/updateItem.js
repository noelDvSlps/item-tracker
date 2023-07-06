import { API_CONFIG } from "../config";
export const updateItem = (item_Id, user_Id, itemStatus) => {
  return fetch(`${API_CONFIG.baseUrl}/items/${item_Id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PATCH",
    body: JSON.stringify({
      user_Id,
      status: itemStatus,
    }),
  });
};
