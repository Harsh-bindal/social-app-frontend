import React from 'react'
import "./closeFriends.css"

export default function CloseFriends({user}) {
  return (
    <li className="sideBarFriend">
    <img className="sideBarImage" src={process.env.PUBLIC_URL + user.userProfilePicture} alt="" />
      <span className="sideBarFriendName">{user.userName}</span>
    </li>
  )
}
