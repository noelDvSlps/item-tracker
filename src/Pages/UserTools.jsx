/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { getItems } from "../api/item/getItems";
import { useLoaderData, useNavigate } from "react-router-dom";
import Background from "../assets/images/tools.png";
import { getItemsHistory } from "../api/history/getItemsHistory";
import { useAuth } from "../providers/authProvider";

export const UserTools = () => {
  const navigate = useNavigate();
  const userToolsLoaded = useLoaderData(); //{items: ..., history: ,,,}
  const { user } = useAuth();
  const userHistory = user
    ? userToolsLoaded.history.filter(
        (transaction) => transaction.user_Id === user.id
      )
    : [];
  const userItems = user
    ? userToolsLoaded.items.filter(
        (item) => item.user_Id === user.id && item.status === "unavailable"
      )
    : [];

  useEffect(() => {
    !user && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortByDateHistory = userHistory.sort(
    (a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
  );

  user && localStorage.setItem("activeWindow", "userTools");

  return (
    <section
      style={{
        margin: 0,
        backgroundImage: `url(${Background})`,
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {user && (
        <>
          <h2 style={{ color: "white" }}>My Tools</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {userItems.map((userItem) => {
                  return (
                    <tr key={userItem.id}>
                      <td>
                        {
                          sortByDateHistory.find(
                            (item) => item.item_Id === userItem.id
                          ).timeStamp
                        }
                      </td>
                      <td>{userItem.id}</td>
                      <td>{userItem.name}</td>
                      <td>{userItem.description}</td>
                      <td>
                        <img
                          style={{
                            height: "100px",
                            width: "100px",
                            borderRadius: "10px",
                          }}
                          src={userItem.image}
                          alt=""
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export const userToolsLoader = async () => {
  const items = await getItems();
  const history = await getItemsHistory();

  return { items, history };
};
