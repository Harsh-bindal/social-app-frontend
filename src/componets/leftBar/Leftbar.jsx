import React, { useState,useEffect } from 'react'
import "./leftbar.css"
import {Assistant, Chat, Reviews, RssFeed, Stream, VideoChat, Warning} from '@mui/icons-material';
import CloseFriends from "../closeFriends/CloseFriends"
import axios from "axios"
import {Link} from "react-router-dom"


export default function Leftbar() {
 
  const [Users,setUsers]=useState([]);
  const backendUrl="https://mern-backend-e2d0.onrender.com/api";

  useEffect(() => {
    const fetchAllUsers = async () => {
        try {
            const res = await axios.get(`${backendUrl}/user/allUsers`);
            setUsers(res.data);
        } catch (err) {
            console.log("Error fetching allUsers: ", err.message);
        }
    };
    fetchAllUsers();
}, []);

  return (
    <div className="leftBar">

      <div className="sidebarWrapper">
        <ul className="sideBarlist">
          <li className="sidebarListItem">
          <RssFeed className="sidebarIcon"/>
          <span className="sideBarListItemtext">Feed</span>
          </li>
          <li className="sidebarListItem">
          <Reviews className="sidebarIcon"/>
          <span className="sideBarListItemtext">Reviews</span>
          </li>
          <li className="sidebarListItem">
          <Chat className="sidebarIcon"/>
          <span className="sideBarListItemtext">Chat</span>
          </li>
          <li className="sidebarListItem">
          <Assistant className="sidebarIcon"/>
          <span className="sideBarListItemtext">Assistant</span>
          </li>
          <li className="sidebarListItem">
          <Warning className="sidebarIcon"/>
          <span className="sideBarListItemtext">Warning</span>
          </li>
          <li className="sidebarListItem">
          <Stream className="sidebarIcon"/>
          <span className="sideBarListItemtext">Stream</span>
          </li>
          <li className="sidebarListItem">
          <VideoChat className="sidebarIcon"/>
          <span className="sideBarListItemtext">Video chat</span>
          </li>
         
        </ul>

        <button className="sedeBarbutton" >Show more</button>
        <hr className="sideBarhr"/>
        <h4 className="onlineSection">USERS</h4>

        <ul className="sideBarFriendList">
            {Users.map((u)=>
            <Link to={`/profile/${u.name}`} key={u._id} style={{textDecoration:'none',color:'black'}} >
               <CloseFriends user={u} />
            </Link>
               )}  
        </ul>



      </div>


    </div>
  )
}
