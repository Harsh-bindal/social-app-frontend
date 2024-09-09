import React, { useContext, useEffect, useState } from 'react'
import "./feed.css"
import Share from '../share/Share'
import Post from '../post/Post'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'


export default function Feed({username}) {

 const [posts,setPosts] = useState([]);
 const {user} = useContext(AuthContext);
 const backendUrl="https://mern-backend-e2d0.onrender.com/api"

 useEffect(() => {
     const fetchPosts = async ()=>{
       const res = username
         ? await axios.get("https://mern-backend-e2d0.onrender.com/api/posts/profile/"+username)
         :  await axios.get("https://mern-backend-e2d0.onrender.com/api/posts/timeline/"+user._id);
        setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      }; 
      fetchPosts();
    }, [username,user._id] )
    
    return (
      <div className="Feed">
      <div className="feedWrapper">
       {(!username || username ===user.name) && <Share/> }
      {
        posts.map((p)=> <Post key={p._id} post={p} />)
      }
    

      </div>
    </div>
  )
}
