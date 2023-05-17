import { API_CONFIG } from "../config"

export const updateHistory = ({ userId, transaction, itemId, timeStamp }) => fetch(API_CONFIG.baseUrl + "/itemsHistory", {
    headers: {
        "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
        userId,
        transaction,
        itemId,
        timeStamp}),
}).then((response) => {
    if(!response.ok) {
        throw new Error("adding History failed")
    }
    return response.json()
})