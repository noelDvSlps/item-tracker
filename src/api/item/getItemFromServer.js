import { getItems } from "./getItems";

export const getItemFromServer = ({ item_Id }) => {
  return getItems()
    .then((items) =>
      items.find((item) => {
        return item.id === item_Id;
      })
    )
    .then((item) => {
      if (!item) {
        throw new Error("item not found");
      }
      return item;
    });
};
