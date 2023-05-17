import { useEffect, useState } from "react";
import { useAuth } from "../providers/authProvider";
import { updateItem } from "../api/item/updateItem";
import { getItemFromServer } from "../api/item/getItemFromServer";
import { updateHistory } from "../api/history/updateHistory";
import { getItemsHistory } from "../api/history/getItemsHistory";
import _ from "lodash";

export const ItemCard = ({ item: currentItem, allUsers }) => {
  const [itemHistory, setItemHistory] = useState([]);
  const { user } = useAuth();
  // const user = localStorage.getItem("user")
  const [item, setItem] = useState(currentItem);
  const { name, description, status, userId } = item;

  const getHistory = () => {
    getItemsHistory().then((history) => {
      const sortedHistory = _.orderBy(history, ["timeStamp"], ["desc"]);
      const filteredHistoryByItem = sortedHistory
        ? _.filter(sortedHistory, { itemId: item.id })
        : null;
      setItemHistory(filteredHistoryByItem);
    });
  };

  useEffect(() => {
    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTransaction = (e, { isReturningItem }) => {
    e.target.disabled = true;
    e.target.innerHTML =
      e.target.innerHTML === isReturningItem ? "Borrow" : "Return";
    const transactionDate = new Date();
    // const borrowerId = isReturningItem ? null : user.id;
    const itemStatus = isReturningItem ? "available" : "unavailable";

    updateItem(item.id, user.id, itemStatus).then((res) => {
      if (res.ok) {
        updateHistory({
          userId: user.id,
          transaction: isReturningItem ? "Return" : "Borrow",
          itemId: item.id,
          timeStamp: transactionDate.toLocaleString(),
        }).then(() => {
          getItemFromServer({ itemId: item.id }).then((item) => {
            setItem(item);
            getHistory();
          });
          e.target.disabled = false;
        });
      }
    });
  };

  const getUserName = (userId) => {
    return allUsers.find((user) => user.id === userId)
      ? allUsers.find((user) => user.id === userId).fullName
      : "Error";
  };

  return (
    <div className="item-card">
      <div style={{ width: "100%" }}>
        <div>ID: {item.id}</div>
        <div>Item Name:{name}</div>
        <div>Description: {description}</div>
        <div>Status: {status}</div>
        <div>
          {" "}
          {itemHistory[0] &&
            `Last Transaction: ${itemHistory[0].transaction} `}{" "}
        </div>
        <div> {itemHistory[0] && `Date: ${itemHistory[0].timeStamp} `} </div>
        <div
          style={{ minHeight: "32px", color: user.id === userId && "orange" }}
        >
          {itemHistory.length > 0 &&
            (status === "unavailable" ? "Borrower: " : "Returner: ") +
              (user.id === userId ? "YOU" : getUserName(userId))}
        </div>
        {(userId === user.id || status === "available") && (
          <button
            id="btn1"
            className="btn-card"
            //NOTE: if user.id === userId {returning an item} else {borrowing an item}
            onClick={(e) =>
              handleTransaction(e, {
                isReturningItem: user.id === userId && status === "unavailable",
              })
            }
            style={{
              backgroundColor:
                user.id === userId && status === "unavailable"
                  ? "maroon"
                  : "orange",
            }}
          >
            {user.id === userId && status === "unavailable"
              ? "Return"
              : "Borrow"}
          </button>
        )}
      </div>
    </div>
  );
};
