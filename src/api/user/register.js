import { API_CONFIG } from "../config"

export const registerFetch = ({ username, password, fullName }) => fetch(API_CONFIG.baseUrl + "/users", {
    headers: {
        "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({  username, password, fullName }),
}).then((response) => {
    if(!response.ok) {
        throw new Error("registering user failed")
    }
    return response.json()
})