import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import { toast } from "react-hot-toast";

export const RootLayout = () => {
  const navigate = useNavigate();
  const { logout, validateUser, user } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  const userValidationErrHandler = async () => {
    // if localstorage "user.id" was changed or the whole object is deleted or user.id = noMatch
    const maybeUser = JSON.parse(localStorage.getItem("userInformation"));

    const isUserValid = maybeUser
      ? await validateUser(maybeUser.username)
      : false;
    if (isUserValid === false) {
      toast.error("You are logged out. You need need to log in again");
      setTimeout(() => {
        localStorage.clear();
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="root-layout">
      <header>
        <span
          style={{
            color: "white",
            fontSize: "1",
            zIndex: "20",
            textAlign: "right",
            width: "100%",
            display: "block",
          }}
        >
          {user &&
            `Hi ${user.userType === "admin" ? "Admin" : ""} ${user.fullName}!`}
        </span>
        <nav>
          <h1 style={{ color: "orange" }}>Item Tracker</h1>
          {user && (
            <>
              <NavLink to={"../User"} onClick={userValidationErrHandler}>
                HOME
              </NavLink>
              <NavLink to={"../UserHistory"} onClick={userValidationErrHandler}>
                History
              </NavLink>
              <NavLink to={"../UserTools"} onClick={userValidationErrHandler}>
                My tools
              </NavLink>
              {user.userType === "admin" && (
                <NavLink to={"../AddItem"} onClick={userValidationErrHandler}>
                  AddItem
                </NavLink>
              )}
              <Link to={"/"} onClick={handleLogOut}>
                Log Out
              </Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet context={userValidationErrHandler} />
      </main>
    </div>
  );
};
