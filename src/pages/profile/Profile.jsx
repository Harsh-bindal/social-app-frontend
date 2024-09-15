import React, {useState, useEffect } from 'react'
import "./profile.css"
import Topbar from "../../componets/topbar/Topbar"
import Leftbar from "../../componets/leftBar/Leftbar"
import Feed from "../../componets/feed/Feed"
import ProfileRightbar from '../../componets/profileRightBar/ProfileRightbar'
import axios from "axios"
import {useParams} from "react-router"
import avatar from "../../assets/avatar.png"
import noCover from "../../assets/noCover.jpg"

export default function Profile() {
  
  const[user,setUser]= useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username=useParams().username;
  const backendUrl="https://mern-backend-e2d0.onrender.com/api"


  useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await axios.get(`${backendUrl}/user?username=${username}`);
            setUser(res.data);
        } catch (err) {
            console.error("Failed to fetch user data", err);
        }
    };
    fetchUser();
}, [username]);
        
        return (
          <>

        <Topbar/> 

    <div className="profile">

        <Leftbar/>
 

    <div className="rightSide">

        <div className="rightSideTop">
            <div className="profileCover">
            <img src={user.coverPicture ? PF+user.coverPicture : noCover} alt="" className="profileCoverImg" />
            <img src={user.profilePicture ? PF+user.profilePicture :avatar} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
                <div className="profileName">{user.name}</div>
                <div className="profileDesc">{user.Desc}</div>
            </div>
        </div>

        <div className="rightSideBottom">
            <Feed username={username} />
            <ProfileRightbar user={user}/>
        </div>
    </div>

  </div>
</>
  )
}
