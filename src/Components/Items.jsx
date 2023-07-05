import { useEffect, useState } from "react";
import { getUsers } from "../api/user/getUsers";
import { ItemCard } from "./ItemCard";

export const Items = ({ itemsToShow, filterItems }) => {
  const [allUsers, setAllUsers] = useState([]);
  const getAllUsers = async () => {
    return await getUsers().then((users) => {
      setAllUsers(users);
    });
  };

  const maybeItemSearchInput = localStorage.getItem("itemSearchInput");
  const [itemSearchInput, setItemSearchInput] = useState(
    maybeItemSearchInput
      ? JSON.parse(localStorage.getItem("itemSearchInput"))
      : ""
  );

  // const [items, setItems] = useState(itemsToShow);
  const [searchedItems, setSearchedItems] = useState(itemsToShow);
  useEffect(() => {
    setSearchedItems(
      itemsToShow.filter((item) =>
        item.name.toLowerCase().includes(itemSearchInput.toLowerCase())
      )
    );
  }, [itemsToShow, itemSearchInput]);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section style={{ padding: "50px" }}>
      <label style={{ color: "white" }} htmlFor="searchItem">
        Search Item{" "}
      </label>
      <input
        id="searchItem"
        name="searchItem"
        style={{ width: "200px" }}
        type="text"
        placeholder="enter item name"
        onChange={(e) => {
          setItemSearchInput(e.target.value);
          localStorage.setItem(
            "itemSearchInput",
            JSON.stringify(e.target.value)
          );
        }}
        value={itemSearchInput}
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
        {searchedItems.map((item) => {
          return (
            <ItemCard
              filterItems={filterItems}
              key={item.id}
              item={item}
              allUsers={allUsers}
              setSearchedItems={setSearchedItems}
            />
          );
        })}
      </div>
    </section>
  );
};
