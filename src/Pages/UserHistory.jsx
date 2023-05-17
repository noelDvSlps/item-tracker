import { useEffect } from "react";
import { getItemsHistory } from "../api/history/getItemsHistory";
import { useLoaderData, useNavigate } from "react-router-dom";
import Background from "../assets/images/tools.png";
import { getItems } from "../api/item/getItems";
import { useAuth } from "../providers/authProvider";

export const UserHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  localStorage.setItem("activeWindow", "userHistory");

  useEffect(() => {
    !user && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useLoaderData();
  const myHistory = user
    ? data.history.filter((history) => history.userId === user.id)
    : [];
  const sortByDateHistory = myHistory.sort(
    (a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
  );

  return (
    <div
      style={{
        margin: 0,
        backgroundImage: `url(${Background})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "white" }}>My History</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction</th>
              <th>ID</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {sortByDateHistory.map((history) => {
              return (
                <tr key={history.id}>
                  <td style={{ width: "20%" }}>{history.timeStamp}</td>
                  <td>{history.transaction}</td>
                  <td>{history.itemId}</td>
                  <td>
                    {
                      data.allItems.find((item) => item.id === history.itemId)
                        .description
                    }
                  </td>
                  {/* <td>{history.description}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const dataLoader = async () => {
  const history = await getItemsHistory();
  const allItems = await getItems();
  return { history, allItems };
};
