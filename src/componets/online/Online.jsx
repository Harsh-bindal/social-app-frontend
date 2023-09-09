import React from 'react'
import "./online.css"

export default function Online({user}) {
  return (
    
          <li className="onlineFriend">
            <div className="profileImgContainer">
              <img src={process.env.PUBLIC_URL + user.userProfilePicture} alt="" className="profileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="userName">{user.userName}</span>
          </li>
    
  )
}
