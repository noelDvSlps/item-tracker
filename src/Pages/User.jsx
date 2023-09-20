/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate } from "react-router-dom";
import { Items } from "../Components/Items";
import { useEffect, useState } from "react";
import Background from "../assets/images/tools.png";
import { getItems } from "../api/item/getItems";
import { useAuth } from "../providers/authProvider";
import { ShowFilteredItems } from "../Components/ShowFilteredItems";

export const User = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const allItems = useLoaderData();
  const [itemsToShow, setItemsToShow] = useState(allItems);
  const filterItems = async () => {
    const allItems = await getItems();
    switch (selectedFilter) {
      case "all":
        setItemsToShow(allItems);
        break;
      case "myTools":
        setItemsToShow(
          allItems.filter((item) => {
            return item.status === "unavailable" && item.user_Id === user.id;
          })
        );
        break;
      case "available":
        setItemsToShow(
          allItems.filter((item) => {
            return item.status === "available";
          })
        );
        break;
      case "unavailable":
        setItemsToShow(
          allItems.filter((item) => {
            return item.status === "unavailable";
          })
        );
    }
  };

  useEffect(() => {
    !user && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  user && localStorage.setItem("activeWindow", "user");

  return (
    <section
      style={{
        margin: 0,
        backgroundImage: `url(${Background})`,
        minHeight: "85vh",
      }}
    >
      {user && <ShowFilteredItems onChange={(val) => setSelectedFilter(val)} />}
      {user && <Items itemsToShow={itemsToShow} filterItems={filterItems} />}
    </section>
  );
};

export const allItemsLoader = async () => {
  const res = await getItems();
  return res;
};
