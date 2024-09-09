import React from 'react'
import "./topbar.css"
import Search from '@mui/icons-material/Search';
import Chat from '@mui/icons-material/Chat';
import Notifications from '@mui/icons-material/Notifications';
import Person from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext,useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import avatar from "../../assets/avatar.png"
import { logoutCall } from '../../ApiCalls';
import Logout from "@mui/icons-material/Logout"
import axios from "axios";




export default function Topbar() {
 
   const {user,dispatch} =useContext(AuthContext);
   const PF= process.env.REACT_APP_PUBLIC_FOLDER;
   const navigate = useNavigate();
   const searchUser=useRef();
  const backendUrl="https://mern-backend-e2d0.onrender.com/api"

   const searchHandle = async (e) => {
    if (e.key === "Enter") {
       try{
        const searchValue = searchUser.current.value.toLowerCase();
         const userFound=await axios.get(`${backendUrl}/user/?username=${searchValue}`);
         
         if(userFound.data) navigate(`/profile/${userFound.data.name}`);
         else alert("User not exist");
        }
        catch(err)
        {
          alert("User not exist",err);
        }
    }
};
  

   const handleclick =(e)=>{
    e.preventDefault();
    logoutCall(dispatch);
    navigate("/login"); 
   }

  return (
    
   
    <div className="topbarContainer">
 
     <div className="topbarLeft">
      <Link to="/" className='logoName'>
      <span className="logo">Social-app</span>
      </Link>
     </div>

      <div className="topbarCenter">
        <div className="searchBarIcon">
        <Search className="searchIcon" />
        <input onKeyDown={searchHandle} placeholder="search for friends" ref={searchUser} className='searchInput'></input>

        
        
        </div>
      </div>


      <div className="topbarRight">

        <div className="topBarLink">
       <span className="topBarLink">New social</span>
       <span className="topBarLink">Time line</span>
        </div>

<div className="topBarIcons">
        <div className="topBarIconItem">
          <Person />
          <span className="iconBadge">1</span>
        </div>

      <Link className="iconLink" to="/messenger">
        <div className="topBarIconItem">
          <Chat />
          <span className="iconBadge">1</span>
        </div>
      </Link>
        
        <div className="topBarIconItem">
          <Notifications />
          <span className="iconBadge">1</span>
        </div>

        <div className="logOutButton" onClick={handleclick}>
          <Logout />
          <span   >Logout</span>
        </div>
      </div>

<Link to={`/profile/${user.name}`}>
      <img src={user.profilePicture ? PF+user.profilePicture : avatar} alt="" className="topBarimage" />
</Link>

    </div>
</div>


  )
}
