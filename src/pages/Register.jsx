import { useState } from "react";
import "../CSS/Auth.css";
import bgImg from "../images/bgImg.jpg";
import logo from "../images/trademateLogoTransparent.png";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";

const CustomTextField = styled(TextField)({
  "& label": {
    color: "#c9cfd1",
    letterSpacing: "0.09em",
    fontSize: "15px",
  },
  "& label.Mui-focused": {
    color: "#db0606",
    letterSpacing: "0.09em",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#c9cfd1",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#db0606",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#db0606",
  },
  "& .MuiInputBase-input": {
    fontSize: "15px",
    letterSpacing: "0.09em",
  },
  "&.custom-margin": {
    marginBottom: "15px",
  },
});

const Register = () => {
  // form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // event states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // navigate
  const navigate = useNavigate();

  // handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: fullName,
        })
          .then(() => {
            signInWithEmailAndPassword(auth, email, password)
              .then(() => {
                setFullName("");
                setEmail("");
                setPassword("");
                navigate("/");
              })
              .catch((err) => {
                setError(
                  `Login Error: ${err.message}. Please try a manual login.`
                );
              })
              .finally(() => setLoading(false));
          })
          .catch((err) => {
            setError(
              `Display Name Update Error: ${err.message}. Please try a manual login and update your display name from the profile page.`
            );
            setLoading(false);
          });
      })
      .catch((err) => {
        setError(`Registration Error: ${err.message}.`);
        setLoading(false);
      });
  };

  return (
    <div className="signup-page">
      <div className="auth-box">
        <div className="leftside">
          <img src={bgImg} alt="bgImg" />
        </div>
        <div className="rightside">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <h4 className="register-your-profile">
            <span>REGISTER</span> YOUR ACCOUNT
          </h4>
          <form className="custom-form" onSubmit={handleRegister}>
            <CustomTextField
              label="Full Name"
              type="text"
              variant="standard"
              fullWidth
              required
              autoComplete="off"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="custom-margin"
            />
            <CustomTextField
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="custom-margin"
            />
            <CustomTextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-margin"
            />
            {error && <div className="error-msg">{error}</div>}
            <div className="submit-div">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <button type="submit" className="submit-btn">
                {loading ? "..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
