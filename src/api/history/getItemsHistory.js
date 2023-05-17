import { API_CONFIG } from "../config"

export const getItemsHistory = () => {
    return fetch(API_CONFIG.baseUrl + "/itemsHistory")
    .then((response) => {
        if(!response.ok)  {
            throw new Error("could not get items");
        }
        return(response.json());
    })
};