// import { Icons } from "../assets/icons";

export const TrashButton = ({ onClick, disabled = false }) => (
  <img
    src={"icons/trash.png"}
    alt=""
    className="trash-button"
    onClick={() => {
      if (!disabled) {
        onClick();
      }
    }}
  />
);
