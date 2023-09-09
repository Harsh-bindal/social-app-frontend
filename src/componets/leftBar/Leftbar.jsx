import React from 'react'
import "./leftbar.css"
import {Assistant, Chat, Reviews, RssFeed, Stream, VideoChat, Warning} from '@mui/icons-material';
import CloseFriends from "../closeFriends/CloseFriends"
import {Users} from "../../dummyData"

export default function Leftbar() {
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

        <ul className="sideBarFriendList">
    
            {Users.map((u)=> <CloseFriends key={u.id} user={u} />)}  

        </ul>



      </div>


    </div>
  )
}
