import React, { useState,useEffect } from 'react'
import "./post.css"
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
    const backendUrl="https://mern-backend-e2d0.onrender.com/api"



    const deletePost = async () => {
        try {
            await axios.delete(`${backendUrl}/posts/${post._id}`, {data:{userId: currentUser._id}});
            alert("Post delelet successfully");
            window.location.reload();
        } catch (err) {
            alert("Post deletion failed");
        }
    };

    const updatePost = async ()=>{
        const newDesc= prompt("Write your new description for the post");

        try{
            await axios.put(`${backendUrl}/posts/${post._id}`,{userId:currentUser._id,desc:newDesc});
            alert("Description changed successfully");
            window.location.reload();
        }
        catch(err)
        {
            alert("Post updation failed", err);
        }

    }

    const likeHandler = async () => {
        try {
            await axios.put(`${backendUrl}/posts/${post._id}/like`, { userId: currentUser._id });
        } catch (err) {
            console.log("Like action failed");
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id));
    },[currentUser._id,post.likes]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${backendUrl}/user/?userId=${post.userId}`);
                setUsers(res.data);
            } catch (err) {
                console.log("Fetching user data failed");
            }
        };
        fetchUsers();
    }, [post.userId]); 



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
                    <button onClick={updatePost} style={{color:'white',backgroundColor:"green"}} >Update</button>
                   <button onClick={deletePost} style={{color:'blue', backgroundColor:'red'}}>Delete</button>
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
