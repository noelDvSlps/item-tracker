import { useEffect, useState } from "react";
import { addItem } from "../api/item/addItem";
import { toast } from "react-hot-toast";
import { useAuth } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";

export const AddItemForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    !user && navigate("../");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [imageData, setImageData] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChooseFile = (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "item-tracker");
    setImageData(data);
  };

  const uploadImage = async () => {
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/dzseitecy/image/upload",
      { method: "POST", body: imageData }
    );
    const file = await result.json();

    return { file, result };
  };

  const handleSubmit = async (e) => {
    const submitButton = e.target.querySelector("#submit");
    submitButton.disabled = true;
    toast.loading("Please wait, adding new item");

    if (itemName.trim() === "" || itemDesc === "" || imageData === "") {
      toast.dismiss();
      submitButton.disabled = false;
      toast.error("Missing input(s)");

      return;
    }
    setUploading(true);
    const uploadedImg = await uploadImage();
    if (!uploadedImg.result.ok) {
      submitButton.disabled = false;
      toast.dismiss();
      toast.error("No image selected or failed uploading image!");

      return;
    }

    const addItemResponse = await addItem({
      name: itemName,
      description: itemDesc,
      image: uploadedImg.file.secure_url,
      imagePublicId: uploadedImg.file.public_id,
    }).catch((error) => {
      toast.dismiss();
      toast.error("An error occured, you are about to logged out." + error);
      setTimeout(() => {
        localStorage.clear();
        navigate(0);
      }, 2000);
    });

    setImageData(null);
    setItemDesc("");
    setItemName("");

    if (addItemResponse) {
      toast.dismiss();
      toast.success("Item Added!");
    }

    document.getElementById("add-item-form").reset();
    submitButton.disabled = false;
    setUploading(false);
  };

  return (
    <section
      className="pages"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {user && (
        <form
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          action=""
          id="add-item-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <h4>Add Item</h4>
          <label htmlFor="itemName">Item Name</label>
          <input
            name="itemName"
            id="itemName"
            style={{ width: "300px" }}
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <label htmlFor="itemDesc">Item Description</label>
          <textarea
            name="itemDesc"
            id="itemDesc"
            cols="80"
            rows="10"
            value={itemDesc}
            onChange={(e) => setItemDesc(e.target.value)}
            style={{ marginBottom: "10px" }}
          ></textarea>
          <input
            style={{
              width: "80%",
              color: "black",
            }}
            placeholder="Upload an image"
            name="file"
            onChange={handleChooseFile}
            type="file"
            accept="image/png, image/gif, image/jpeg"
          />

          <input
            id="submit"
            style={{ width: "150px", cursor: uploading ? "wait" : "pointer" }}
            type="submit"
            value={uploading ? "Uploading..." : "Submit"}
          />
        </form>
      )}
    </section>
  );
};
