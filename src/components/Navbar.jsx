import { Link } from "react-router-dom";
import logo from "../images/TradeMateLogoTransparent.png";

const Navbar = () => {
  return (
    <header className="custom-navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="rightside">
        <div className="links">
          <Link to="/register" className="auth-link">Register</Link>
          <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
