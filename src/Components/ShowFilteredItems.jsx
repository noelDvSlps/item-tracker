export const ShowFilteredItems = ({ onChange }) => {
  return (
    <section style={{ textAlign: "left", paddingLeft: "75px" }}>
      <label style={{ color: "white" }} htmlFor="filterShow">
        Select What Items To Show
      </label>
      <select
        style={{
          width: "200px",
          height: "35px",
          borderRadius: "8px",
          marginLeft: "20px",
        }}
        name="filterShow"
        id="filter"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">SHOW ALL</option>
        <option value="myTools">Tools I Borrowed</option>
        <option value="available">Available to Borrow</option>
        <option value="unavailable">Unavailable</option>
      </select>
    </section>
  );
};
