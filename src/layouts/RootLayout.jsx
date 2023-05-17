import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/authProvider";

export const RootLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogOut = () => {
    localStorage.clear();
    logout();
    navigate(0); //refresh
  };

  const maybeUser = JSON.parse(localStorage.getItem("user"));
  // maybeUser && navigate(0)

  return (
    <div className="root-layout">
      <span
        style={{
          position: "absolute",
          right: "50px",
          color: "white",
          fontSize: "1",
        }}
      >
        {maybeUser && `Hi ${maybeUser.fullName}!`}
      </span>
      <header style={{ padding: "15px 50px" }}>
        <nav>
          <h1 style={{ color: "orange" }}>Item Tracker</h1>
          {maybeUser && (
            <>
              <NavLink to={"../User"}>HOME</NavLink>
              <NavLink to={"../UserHistory"}>History</NavLink>
              <NavLink to={"../UserTools"}>My tools</NavLink>
              <Link to={""} onClick={handleLogOut}>
                Log Out
              </Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
