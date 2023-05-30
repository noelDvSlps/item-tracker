import { useState } from "react";
import { addItem } from "../api/item/addItem";
import { toast } from "react-hot-toast";

export const AddItemForm = () => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleChooseFile = (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "item-tracker");

    setImageData(data);
  };

  const uploadImage = async () => {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzseitecy/image/upload",
      { method: "POST", body: imageData }
    );
    const file = await res.json();
    console.log("file", file.secure_url);
    setImage(file.secure_url);
    return file;
  };

  const handleSubmit = async () => {
    if (itemName.trim() === "" || itemDesc === "" || imageData === "") {
      setInputError(true);
    }

    if (inputError === true) {
      toast.error("Missing input(s)");
      console.log(imageData);
      return;
    }
    setLoading(true);
    const uploadedImg = await uploadImage();
    console.log(uploadedImg);
    await addItem({
      name: itemName,
      description: itemDesc,
      image: uploadedImg.secure_url,
      publicId: uploadedImg.public_id,
    });
    setLoading(false);
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
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <img src={image} style={{ width: "300px" }} />
        )}
        <input style={{ width: "150px" }} type="submit" value="submit" />
      </form>
    </section>
  );
};
