import { useRouteError } from "react-router-dom";

export const ErrorElement = () => {
  const error = useRouteError();

  return (
    <section
      className="pages"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
