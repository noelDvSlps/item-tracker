import { API_CONFIG } from "../config"

export const getItems =  () => {
    return  fetch(API_CONFIG.baseUrl + "/items")
    .then((response) => {
        if(!response.ok)  {
            throw new Error("could not get items");
        }
        return(response.json());
    })
    
};