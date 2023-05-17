import { API_CONFIG } from "../config";

export const getUsers = () => 
    fetch(API_CONFIG.baseUrl + "/users")
    .then((response) => {
        if(!response.ok)  {
            throw new Error("could not get user");
        }
        
        return(response.json());
    })

    