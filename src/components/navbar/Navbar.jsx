import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/store";
import navBar from "../../data/navBar.json";
import NavBarItem from "../NavBarItem/NavBarItem";
import "./navbar.css";

const Navbar = () => {
  const userCtx = useContext(Context);
  const navigate = useNavigate();
  // console.log(userCtx.user);

  //ve trang home
  const homeHandler = () => {
    navigate("/");
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    userCtx.logout();
    navigate("/login");
  };

  //render
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="navContainer">
          <span className="logo" onClick={homeHandler}>
            Booking Website
          </span>
          {userCtx.user ? (
            <div className="navItems">
              <span>{userCtx.user.username}</span>
              <Link
                to="/transaction"
                style={{ color: "white", textDecoration: "none" }}
              >
                <button className="navButton">Transactions</button>
              </Link>

              <button className="navButton" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          ) : (
            <div className="navItems">
              <Link
                to="/signup"
                style={{ color: "white", textDecoration: "none" }}
              >
                <button className="navButton">Register</button>
              </Link>
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                <button className="navButton">Login</button>
              </Link>
            </div>
          )}
        </div>
        {userCtx.user ? <NavBarItem items={navBar} /> : <></>}
      </div>
    </div>
  );
};
export default Navbar;
