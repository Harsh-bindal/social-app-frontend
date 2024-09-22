import React, { useContext } from 'react'
import "./profileRightbar.css"
import { useEffect } from 'react'
import axios from "axios"
import avatar from "../../assets/avatar.png"
import { useState } from 'react'
import {Link} from "react-router-dom"
import{Add ,Remove} from "@mui/icons-material"
import { AuthContext } from '../../context/AuthContext'

export default function ProfileRightbar({paramsUser}) {

    const [friends,setFriends] =useState([]);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    //current user= means logged in user
    //user means=searched user(whose profile is on only)
    const {user,dispatch} =useContext(AuthContext);
    const backendUrl="https://mern-backend-e2d0.onrender.com/api"
    

    //if paramsUser is already followed by logged user then return true else false

    const[followed,setFollowed] =useState(false);

    useEffect(() => {
        const isGetFollowed = async () => {
          if (paramsUser._id) {
            console.log(user.followings);
            return user.followings.includes(paramsUser._id);
          }
          return false;
        };
    
        const fetchFollowStatus = async () => {
          const result = await isGetFollowed();
          console.log(paramsUser.name,paramsUser._id);
          console.log(result);
          setFollowed(result);
        };
    
        fetchFollowStatus();
      }, [paramsUser._id, user.followings]);

  

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`${backendUrl}/user/${paramsUser._id}/unfollow`, { userId: user._id });
                dispatch({ type: "UNFOLLOW", payload: paramsUser._id });
            } else {
                await axios.put(`${backendUrl}/user/${paramsUser._id}/follow`, { userId: user._id });
                dispatch({ type: "FOLLOW", payload: paramsUser._id });
            }
            setFollowed(!followed);
        } catch (err) {
            console.log("Error updating follow status: ", err);
        }
    };
    
    //Updating loggedUser details
    const updateUser= async()=>{
        const city=prompt("Enter your city name");
        const from=prompt("Where are you from");
        const password=prompt("Enter your new password");

        const data={userId:user._id,city,from,password};

        try{
            await axios.put(`${backendUrl}/user/${user._id}`,data);
            alert("Data update successfully");
            window.location.reload();
        }
        catch(err)
        {
            alert("Error ocuured",err);
        }
    }

    //Fetching all friends of paramsUsers
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                
               
                const res = await axios.get(`${backendUrl}/user/friends/${paramsUser._id}`);
               
                setFriends(res.data);
            } catch (err) {
                console.log("Error fetching friends: ", err);
            }
        };
        fetchFriends();
    }, [paramsUser]);

    

  return (
   
    <div className="rightbar">
      <div className="rightbarWrapper">

       {paramsUser._id!==user._id ? (<buttton className="FollowUser" onClick={handleClick} >{ followed  ?"UnFollow" : "Follow" } { followed  ?<Remove/> : <Add/> }</buttton>) : ""}  
       
       <h4 className="rightbarTitle">User Information</h4>
       

       <div className="rightbarInfo">
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{paramsUser.from}</span>
        </div>

        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{paramsUser.city}</span>
        </div>

        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{paramsUser.relationship === true ? "Single" : paramsUser.relationship === true ? "Married"  : "-"}</span>
        </div>
        
        {paramsUser._id===user._id ? <button onClick={updateUser} style={{backgroundColor:"#76a7f2",borderRadius:'6px'}} >Edit information</button> : ""}
       
       </div>

    <h4 className="rightBartitle">User Friends</h4>
       <div className="rightbarFollowings">
        {friends.map(friend=>(
            <Link to={"/profile/"+friend.name} key={friend._id} style={{textDecoration:"none"}}>
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
