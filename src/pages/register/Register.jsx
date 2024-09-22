import React, { useRef } from 'react';
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const username=useRef();
  const email=useRef();
  const password=useRef();
  const passwordAgain=useRef();
  const navigate = useNavigate();
  const backendUrl="https://mern-backend-e2d0.onrender.com/api"

  const gotoHistory = ()=>{
    navigate("/login");
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        name: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(`${backendUrl}/auth/register`, user);
        alert("User created successfully");
        gotoHistory();
      } catch (err) {
        alert("Failed to create user: " + err.message);
      }
    }
  };



  return (



    <div className="login">
        <div className="loginWrapper">

            <div className="loginLeft">
                <h3 className="appName">Social App</h3>
                <span className="descApp">Connect with this world And be social!</span>
            </div>


            <div className="loginRight">
             <form className="loginRightContainer" onSubmit={handleClick} >
                <input name="name" placeholder="UserName" required ref={username} className="loginSet" />
                <input name="email" placeholder="Email" required type="email" ref={email} className="loginSet" />
                <input placeholder="Password" type="password" required minLength={6} ref={password} className="loginSet" />
                <input placeholder="Password Again" type="password" required ref={passwordAgain} className="loginSet" />
                <button className="signUpButton" type="submit" >Sign Up</button>
                <button className="registerButton" onClick={gotoHistory} >Log into  Account</button>
             </form>
            </div>


        </div>
    </div>
  )
}
