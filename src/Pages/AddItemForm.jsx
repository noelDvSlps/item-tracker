import { useState } from "react";
import { addItem } from "../api/item/addItem";
import { toast } from "react-hot-toast";

export const AddItemForm = () => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [imageData, setImageData] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (itemName.trim() === "" || itemDesc === "" || imageData === "") {
      toast.error("Missing input(s)");
      return;
    }
    setLoading(true);
    const uploadedImg = await uploadImage();
    if (!uploadedImg.result.ok) {
      toast.error("Failed uploading image!");
      return;
    }
    await addItem({
      name: itemName,
      description: itemDesc,
      image: uploadedImg.file.secure_url,
      imagePublicId: uploadedImg.file.public_id,
    });
    setImageData(null);
    setItemDesc("");
    setItemName("");
    setLoading(false);
    document.getElementById("add-item-form").reset();
    toast.success("Item Added!");
  };
  return (
    <section
      className="pages"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
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
          handleSubmit();
        }}
      >
        <h4>Add Item</h4>
        <label htmlFor="name">Item Name</label>
        <input
          style={{ width: "300px" }}
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <label htmlFor="description">Item Description</label>
        <textarea
          name=""
          id=""
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
        {loading && <h3>Loading...</h3>}
        <input style={{ width: "150px" }} type="submit" value="submit" />
      </form>
    </section>
  );
};
