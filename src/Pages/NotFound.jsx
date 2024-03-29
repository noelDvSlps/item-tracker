import { Link } from "react-router-dom";
import Background from "../assets/images/tools.png";

export const NotFound = () => {
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
        <h2>Page not found</h2>
        <p>
          Go to{" "}
          <Link to="/" style={{ color: "orange" }}>
            Home Page
          </Link>
        </p>
      </div>
    </section>
  );
};
