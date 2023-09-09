import "./message.css"
import moment from 'moment';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import avatar from "../../assets/avatar.png"

export default function Message({message,own}) {

  const [msgUser,setMsgUser]=useState({});
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
        const getUser = async()=>{
             const res=await axios.get(`/user/?userId=${message.sender}`);
             setMsgUser(res.data);
        }
        getUser();
  },[message])
console.log(msgUser)

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
