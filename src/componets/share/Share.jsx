import React, { useContext } from 'react'
import "./share.css"
import { EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import avatar from "../../assets/avatar.png"
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import { useRef } from 'react';
import axios from "axios"

export default function Share() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const {user}=useContext(AuthContext);
  const [file,setFile]=useState(null);
  
  const desc=useRef();
   
  const handleChange = (e) =>{
    setFile(e.target.files[0]);
  }

 const submitHandler =async (e)=>{
  e.preventDefault();
  
  const newPost ={
    userId:user._id,
    desc:desc.current.value
  }
  
  if(file)
  {
    const data=new FormData();
    const fileName=Date.now()+file.name;
    data.append("name",fileName);
    data.append("file",file);
    newPost.img=fileName;

    try{
      await axios.post("/upload",data);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  try{
     await axios.post("/posts/",newPost);
     window.location.reload();
  }
  catch(err)
  {

  }
 }

  return (
    

    <div className="Share">

      <div className="shareWrapper">
        <div className="shareTop">
        <img src={user.profilePicture ? PF+user.profilePicture : avatar} alt="" className="shareImg" />
        <input placeholder={`What's in your mind ${user.name} ?`} ref={desc}  className="shareInput"></input>
        </div>

        <hr className="shareHr"></hr>



        <form className="shareBottom" onSubmit={submitHandler} >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon"/>
              <span className="shareOptionText">photo Or video</span>
              <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={handleChange} ></input>
            </label>

            <div className="shareOption">
            <Room htmlColor="blue" className="shareIcon"/>
              <span className="shareOptionText">Location</span>
            </div>

            <div className="shareOption">
            <Label htmlColor="green" className="shareIcon"/>
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
              <span className="shareOptionText">Feelings</span>
            </div>

          </div>
          <button className="shareButton" type="submit" >Share</button>

        </form>

      </div>
    </div>
  )
}
