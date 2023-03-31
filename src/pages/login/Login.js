import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Context } from "../../context/store";
import "./login.css";
import axiosClient from "../../axios/axios";

const Login = () => {
  const navigate = useNavigate();
  const loginCtx = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //

  const loginHandler = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    axiosClient
      .post("/login", user)
      .then((res) => {
        // console.log(res.data);
        loginCtx.login(res.data);
        navigate("/");
      })
      .catch((err) => alert(err.response.data));
  };
  //render
  return (
    <div>
      <Navbar />
      <div className="login">
        <div className="lContainer">
          <h1 className="lTitle">Login</h1>
          <div className="litem">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="lInput"
            ></input>
          </div>
          <div className="litem">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="lInput"
            ></input>
          </div>
          <button className="lButton" onClick={loginHandler}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
