import { useEffect, useState } from "react";
import { useAuth } from "../providers/authProvider";
import { updateItem } from "../api/item/updateItem";
import { getItemFromServer } from "../api/item/getItemFromServer";
import { deleteItemFromServer } from "../api/item/deleteItemFromServer";
import { updateHistory } from "../api/history/updateHistory";
import { getItemsHistory } from "../api/history/getItemsHistory";
import _ from "lodash";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";
import { TrashButton } from "./TrashButton";
import { getItems } from "../api/item/getItems";
import sha1 from "sha1";

export const ItemCard = ({
  item: currentItem,
  allUsers,
  filterItems,
  setSearchedItems,
}) => {
  const navigate = useNavigate();
  const [itemHistory, setItemHistory] = useState([]);
  const { user, validateUser } = useAuth();
  const [item, setItem] = useState(currentItem);
  const { name, description, status, userId, image } = item;
  const userValidationErrHandler = useOutletContext();

  const getHistory = async () => {
    await getItemsHistory().then((history) => {
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

  const deleteImageFromCloud = async (publicId) => {
    //public_id=item-tracker/wzyrtz6bp72o9abkjt42&timestamp=5-27-2023
    const api_secret = "FQZJ2VMgmGv-XbOkMmzxoX8l-lk";
    const currentDate = new Date();
    const unixTime = Math.round(currentDate.getTime() / 1000);
    const signature = sha1(
      `public_id=${publicId}&timestamp=${unixTime}${api_secret}`
    );

    var formdata = new FormData();
    formdata.append("public_id", publicId);
    formdata.append("signature", signature);
    formdata.append("api_key", "183674914573321");
    formdata.append("timestamp", `${unixTime}`);

    var requestOptions = {
      method: "POST",
      body: formdata,
      // redirect: "follow",
    };
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzseitecy/image/destroy",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    return res;
  };

  const handleDeleteItem = async (item) => {
    console.log(item);
    await deleteImageFromCloud(item.publicId);
    await deleteItemFromServer(item.id)
      .then(() => {
        getItems().then((response) => {
          setSearchedItems(response);
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleTransaction = async (e, { isReturningItem }) => {
    e.target.disabled = true;
    try {
      const validUser = await validateUser(
        JSON.parse(localStorage.getItem("user")).id
      );

      if (validUser) {
        e.target.innerHTML =
          e.target.innerHTML === isReturningItem ? "Borrow" : "Return";
        const transactionDate = new Date().toLocaleString();
        const itemStatus = isReturningItem ? "available" : "unavailable";
        try {
          await updateItem(item.id, user.id, itemStatus);
          await updateHistory({
            userId: user.id,
            transaction: isReturningItem ? "Return" : "Borrow",
            itemId: item.id,
            timeStamp: transactionDate,
          });
          const itemFromServer = await getItemFromServer({ itemId: item.id });
          setItem(itemFromServer);
          await getHistory();
          filterItems();
          e.target.disabled = false;
        } catch (error) {
          toast.error("An error occured, you are about to logged out." + error);
          setTimeout(() => {
            localStorage.clear();
            navigate(0);
          }, 2000);
        }
      } else {
        e.target.disabled = false;
        userValidationErrHandler();
      }
    } catch {
      e.target.disabled = false;
      userValidationErrHandler();
    }
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "20vh",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "50%",
              border: "1px solid",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <img
              style={{ height: "100%", width: "100%", objectFit: "fill" }}
              src={image}
              alt=""
            />
          </div>
        </div>
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
        {user.userType === "admin" && (
          <TrashButton
            // disabled={user.userType === "admin" ? false : true}
            style={{ border: "1px solid" }}
            onClick={() => handleDeleteItem(item)}
          />
        )}
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
