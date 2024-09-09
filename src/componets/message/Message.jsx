import "./message.css"
import moment from 'moment';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import avatar from "../../assets/avatar.png"

export default function Message({message,own}) {

  const [msgUser,setMsgUser]=useState({});
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const backendUrl="https://mern-backend-e2d0.onrender.com/api"

  useEffect(() => {
    const getUser = async () => {
        try {
            const res = await axios.get(`${backendUrl}/user/?userId=${message.sender}`);
            setMsgUser(res.data);
        } catch (err) {
            console.error("Failed to fetch user data:", err);
        }
    };
    getUser();
}, [message.sender]);

  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src={msgUser.profilePicture? PF+msgUser.profilePicture :avatar} alt="not found" className="messagePhoto"></img>
            <p className="messageText" >{message.text}</p>
        </div>
        <div className="messageBottom">
            <span>{moment(message.createdAt).fromNow()}</span>
        </div>
    </div>
  )
}
