import { React,useContext,useRef } from 'react'
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import {loginCall} from "../../ApiCalls"
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const email=useRef();
  const  password=useRef();
  const {user,isFetching, dispatch} = useContext(AuthContext);
  const navigate=useNavigate();

   const handleChange = (e) =>{
    e.preventDefault();
   loginCall({email:email.current.value,password:password.current.value},dispatch);
   };

 console.log(user);
  return (
    <div className="login">
        <div className="loginWrapper" > 

            <div className="loginLeft">
                <h3 className="appName">Social App</h3>
                <span className="descApp">Connect with this world And be social!</span>
            </div>


            <div className="loginRight">
             <form className="loginRightContainer" onSubmit={handleChange}>
                <input placeholder="Email" autoComplete="on" required type="email" className="loginSet" ref={email} />
                <input placeholder="Password" required type="password" minLength={6} ref={password} className="loginSet" />
                <button className="loginButton" type="submit" disabled={isFetching} >{isFetching ? <CircularProgress></CircularProgress> : "LogIn"}</button>
                <span className="passwordForgot">Forgot password?</span>
                <button onClick={()=>{ navigate("/register")}} disabled={isFetching} className="registerButton"  >{isFetching ? <CircularProgress></CircularProgress> : "Register to New Account"}</button>
              
             </form>
            </div>


        </div>
    </div>
  )
}
