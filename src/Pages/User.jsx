import { useLoaderData, useNavigate } from "react-router-dom";
import { ItemsList } from "../Components/ItemsList";
import { useEffect } from "react";
import Background from "../assets/images/tools.png";
import { getItems } from "../api/item/getItems";
import { useAuth } from "../providers/authProvider";

export const User = () => {
  const { validateUser, user } = useAuth();
  const navigate = useNavigate();
  // const maybeUser = JSON.parse(localStorage.getItem("user"));
  // maybeUser && validateUser(maybeUser.id);
  console.log("user", user);

  useEffect(() => {
    // userValidated === false && navigate("../");
    !user && navigate("../");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allItemsLoaded = useLoaderData();

  user && localStorage.setItem("activeWindow", "user");

  return (
    <section
      style={{
        margin: 0,
        backgroundImage: `url(${Background})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "85vh",
      }}
    >
      {user && <ItemsList allItemsLoaded={allItemsLoaded} />}
    </section>
  );
};

export const allItemsLoader = async () => {
  const res = await getItems();
  return res;
};
