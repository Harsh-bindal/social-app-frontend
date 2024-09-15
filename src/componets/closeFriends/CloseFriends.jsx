import React from 'react'
import "./closeFriends.css"
import avatar from "../../assets/avatar.png"

export default function CloseFriends({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sideBarFriend">
    <img className="sideBarImage" src={user.profilePicture ? PF+user.profilePicture :avatar} alt="" />
      <span className="sideBarFriendName">{user.name}</span>
    </li>
  )
}
