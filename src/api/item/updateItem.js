import { API_CONFIG } from "../config"
export const updateItem = ( itemId, userId, itemStatus ) => {
   
    return fetch(`${API_CONFIG.baseUrl}/items/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        userId,
        status: itemStatus,
      }),
    });
  };