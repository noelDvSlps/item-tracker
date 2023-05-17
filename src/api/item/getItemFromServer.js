import { getItems } from "./getItems";

export const getItemFromServer=  ( {itemId} ) =>
   { 
    return  getItems()
    .then((items) => items.find((item) => {
      
        return item.id === itemId;
    }))
    .then((item) => {
      if (!item) {
       
        throw new Error("item not found");
      }
     
      return item;
    });}