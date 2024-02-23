import { Link, NavLink } from "react-router-dom";
import logo from "../images/TradeMateLogoTransparent.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Icon } from "react-icons-kit";
import { ecommerce_cart } from "react-icons-kit/linea/ecommerce_cart";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { clearUserData } from "../store/slices/user/UserSlice";

const Navbar = () => {
  // redux
  const { userData } = useSelector((state) => state.user);

  // dropdown
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const dropdownRef = useRef(null);

  // handle dropdown toggle on name initials click
  const handleDropdownToggle = () => {
    setDropdownToggle(!dropdownToggle);
  };

  // detect click outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // logout
  const [logoutLoading, setLogoutLoading] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  // logout event
  const handleLogout = () => {
    setLogoutLoading(true);
    signOut(auth)
      .then(() => {
        dispatch(clearUserData());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="custom-navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="rightside">
        <div className="links">
          <div className="cart-div">
            <NavLink to="/cart" className="cart-link">
              <Icon icon={ecommerce_cart} size={28} />
              <span className="items-indicator">2</span>
            </NavLink>
          </div>
          {userData && userData.displayName ? (
            <div className="relative-div" ref={dropdownRef}>
              <button
                type="button"
                className="user-profile"
                onClick={handleDropdownToggle}
              >
                {userData.displayName
                  .split(" ")
                  .map((word, index) =>
                    index === 0 ||
                    index === userData.displayName.split(" ").length - 1
                      ? word.charAt(0)
                      : ""
                  )
                  .join("")}
              </button>
              <div
                className={`custom-profile-dropdown${
                  dropdownToggle ? " active" : ""
                }`}
              >
                <h3 className="menu-name">{userData.displayName}</h3>
                <div className="menu-items-div">
                  <div className="menu-item">
                    <NavLink to="/profile" className="menu-item-link">
                      Profile
                    </NavLink>
                  </div>
                  <div className="menu-item">
                    <NavLink to="/link2" className="menu-item-link">
                      Link 2
                    </NavLink>
                  </div>
                  <div className="menu-item">
                    <NavLink to="/link3" className="menu-item-link">
                      Link 3
                    </NavLink>
                  </div>
                  <div className="border-top">
                    <button
                      type="button"
                      className="menu-item logout"
                      onClick={handleLogout}
                      disabled={logoutLoading}
                    >
                      {logoutLoading ? "..." : "Logout"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register" className="auth-link">
                Register
              </Link>
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
