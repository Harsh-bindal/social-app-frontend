import "./conversation.css"
import { useEffect } from "react"
import { useState } from "react"
import axios from"axios"
import avatar from "../../assets/avatar.png"

export default function Conversation({conversation,currentUser}) {

      const [user,setUser] = useState(null)
      const PF=process.env.REACT_APP_PUBLIC_FOLDER;
      const backendUrl="https://mern-backend-e2d0.onrender.com/api"

   useEffect(()=>{
      const friendsId= conversation.members.find((m)=> m!==currentUser._id);

      const getUser = async ()=>{
        try{
          const res=await axios("https://mern-backend-e2d0.onrender.com/api/user?userId="+friendsId);
          setUser(res.data);
   
        }catch(err)
        {
          console.log(err);
        }
     };
     getUser();

    },[conversation,currentUser]);
    


  return (
        <div className="conversation">
         <img src={user?.profilePicture ? PF+user.profilePicture : avatar} alt="error" className="conversationUserPhoto" ></img>
            <span className="conversationUserName" >{user?.name}</span>
        </div>
  )
}
