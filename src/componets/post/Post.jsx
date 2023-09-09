import React, { useState,useEffect } from 'react'
import "./post.css"
import { MoreVert } from '@mui/icons-material'
import action  from "../../assets/like.png"
import heart from "../../assets/heart.png"
import axios from "axios";
import moment from 'moment';
import avatar from "../../assets/avatar.png"
import {Link} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'



export default function Post({post}) {

    const[like,setLike]=useState(post.likes.length);
    const[isLiked,setIsLiked]=useState(false);
    const[users,setUsers]=useState({});
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;

    const { user:currentUser} =useContext(AuthContext);

    const likeHandler=()=>
    {
        try{

            axios.put("/posts/"+post._id+"/like",{userId:currentUser._id});
        }catch(err){}
       setLike(isLiked?like-1 : like+1)
       setIsLiked(!isLiked)
    }

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id));
    },[currentUser._id,post.likes]);

 useEffect ( ()=>{
      const fetchUsers = async ()=>{
        const res = await axios.get(`/user/?userId=${post.userId}`);
        setUsers(res.data);
      }
      fetchUsers();
 }, [post.userId])   



  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${users.name}`}>
                    <img src={users.profilePicture ? PF+users.profilePicture : avatar} alt="" className="postTopImg" />
                    </Link>
                    <span className="topImgName">{users.name}</span>
                    <span className="topPostDate">{moment(post.createdAt).fromNow()}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postIdea">{post?.desc}</span>
                <img src={PF+post.img} alt="" className="postCenterImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={action} onClick={likeHandler} alt="" className="likeButton" />
                    <img src={heart} onClick={likeHandler} alt="" className="likeButton" />
                    <span className="likeCounter">Liked by {like} people</span>
                </div>
                <div className="postBottomRight">
                    <span className="commentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
