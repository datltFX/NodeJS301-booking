import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./signup.css";
import axiosClient from "../../axios/axios";

const Signup = () => {
  const navigate = useNavigate();

  const signupHandler = (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      phoneNumber: e.target.phonenumber.value,
      password: e.target.password.value,
    };
    // console.log(user);

    axiosClient
      .post("/register", user)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  //render
  return (
    <div>
      <Navbar />
      <div className="signup">
        <form className="fContainer" onSubmit={signupHandler}>
          <h1 className="fTitle">Sign Up</h1>
          <div className="item">
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              name="username"
              required
            />
          </div>
          <div className="item">
            <label>Fullname</label>
            <input
              type="text"
              placeholder="Fullname"
              name="fullname"
              required
            />
          </div>
          <div className="item">
            <label>Email</label>
            <input type="text" placeholder="email" name="email" required />
          </div>
          <div className="item">
            <label>Phone Number</label>
            <input
              type="number"
              placeholder="Phone Number"
              name="phonenumber"
              required
            />
          </div>
          <div className="item">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              required
            />
          </div>
          <button className="lButton" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
