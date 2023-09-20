import { useRouteError } from "react-router-dom";
import Background from "../assets/images/tools.png";

export const ErrorElement = () => {
  const error = useRouteError();

  return (
    <section
      className="pages"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${Background})`,
      }}
    >
      <div
        className="item-card"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>ERROR</h2>
        <p id="msg">{error.message}</p>
      </div>
    </section>
  );
};
