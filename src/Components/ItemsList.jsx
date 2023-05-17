import { useEffect, useState } from "react";
import { getUsers } from "../api/user/getUsers";
import { ItemCard } from "./ItemCard";

export const ItemsList = ({ allItemsLoaded }) => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    return await getUsers().then((users) => {
      setAllUsers(users);
    });
  };

  const maybeItemFilterInput = localStorage.getItem("itemFilterInput");
  const [itemFilterInput, setItemFilterInput] = useState(
    maybeItemFilterInput
      ? JSON.parse(localStorage.getItem("itemFilterInput"))
      : ""
  );

  const items = allItemsLoaded;
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(itemFilterInput.toLowerCase())
      )
    );
  }, [items, itemFilterInput]);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section style={{ padding: "50px" }}>
      <label style={{ color: "white" }}>Search Item </label>
      <input
        style={{ width: "200px" }}
        type="text"
        placeholder="enter item name"
        onChange={(e) => {
          setItemFilterInput(e.target.value);
          localStorage.setItem(
            "itemFilterInput",
            JSON.stringify(e.target.value)
          );
        }}
        value={itemFilterInput}
      />

      <div
        style={{
          display: "grid",
          gap: "5px",
          margin: "10px",
          gridTemplateColumns: "repeat(auto-fill, 400px)",
          justifyContent: "space-around",
        }}
      >
        {filteredItems.map((item) => {
          return <ItemCard key={item.id} item={item} allUsers={allUsers} />;
        })}
      </div>
    </section>
  );
};
