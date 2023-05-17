export const PageBackground = () => {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "rgba(76,86,49, 0.75)",
        maxHeight: "75vh",
        overFlow: "hidden",
        borderRadius: "20px",
        boxShadow: "10px 10px 15px rgba(76,86,49, 1)",
      }}
    >
      <div>
        <h2 style={{ fontSize: "3rem", color: "white" }}>
          Track your item with Item Tracker.{" "}
        </h2>
        <p style={{ fontSize: "1.5rem", color: "white" }}>
          Save time, and avoid delays with Item Tracker. A simple and effective
          solution.
        </p>
      </div>
    </div>
  );
};
