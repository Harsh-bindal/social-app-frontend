import React, { useContext } from 'react'
import "./profileRightbar.css"
import { useEffect } from 'react'
import axios from "axios"
import avatar from "../../assets/avatar.png"
import { useState } from 'react'
import {Link} from "react-router-dom"
import{Add ,Remove} from "@mui/icons-material"
import { AuthContext } from '../../context/AuthContext'

export default function ProfileRightbar({user}) {

    const [friends,setFriends] =useState([]);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    //current user= means logged in user
    //user means=searched user(whose profile is on only)
    const {user:currentUser,dispatch} =useContext(AuthContext);
    const backendUrl="https://mern-backend-e2d0.onrender.com/api"

    const isGetFollowed =async ()=>{
        if(user._id){
            return await currentUser.followings.includes(user?._id)
        }
    }
    const[followed,setFollowed] =useState(isGetFollowed)
    
    const updateUser= async()=>{
        const city=prompt("Enter your city name");
        const from=prompt("Where are you from");
        const password=prompt("Enter your new password");

        const data={userId:currentUser._id,city,from,password};

        try{
            await axios.put(`${backendUrl}/user/${currentUser._id}`,data);
            alert("Data update successfully");
            window.location.reload();
        }
        catch(err)
        {
            alert("Error ocuured",err);
        }
    }

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`${backendUrl}/user/friends/${user._id}`);
                setFriends(res.data);
            } catch (err) {
                console.log("Error fetching friends: ", err);
            }
        };
        fetchFriends();
    }, [user]);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`${backendUrl}/user/${user._id}/unfollow`, { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`${backendUrl}/user/${user._id}/follow`, { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
        } catch (err) {
            console.log("Error updating follow status: ", err);
        }
    };

  return (
   
    <div className="rightbar">
      <div className="rightbarWrapper">

       {user.name!==currentUser.name && (
          
            <buttton className="FollowUser" onClick={handleClick} >{ followed  ?"UnFollow" : "Follow" } { followed  ?<Remove/> : <Add/> }</buttton>
       )} 
       
       <h4 className="rightbarTitle">User Information</h4>
       

       <div className="rightbarInfo">
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
        </div>

        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
        </div>

        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === true ? "Single" : user.relationship === true ? "Married"  : "-"}</span>
        </div>
        
        {currentUser._id===user._id ? <button onClick={updateUser} style={{backgroundColor:"#76a7f2",borderRadius:'6px'}} >Edit information</button> : ""}
       
       </div>

    <h4 className="rightBartitle">User Friends</h4>
       <div className="rightbarFollowings">
        {friends.map(friend=>(
            <Link to={"/profile/"+friend.name}  style={{textDecoration:"none"}}>
            <div className="rightbarFollowing">
            <img src={friend.profilePicture ? PF+friend.profilePicture : avatar} alt="" className="followingProfile" />
            <span className="followingName"  >{friend.name}</span>
            </div>
            </Link>
        ))}          
       </div>        
      </div>
    </div>
  )
}
