import "./messenger.css"
import Topbar from "../../componets/topbar/Topbar"
import Conversation from "../../componets/conversation/Conversation"
import Message from "../../componets/message/Message"
import ChatOnline from "../../componets/chatOnline/ChatOnline"
import {  useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useEffect } from "react"
import axios from "axios"
import { useContext } from "react"



export default function Messenger() {
    
    const[conversations,setConversations]=useState([]);
    const {user}=useContext(AuthContext);
    const [currentchat,setCurrentchat] =useState(null);
    const [messages,setMessages] =useState([]);
    const [newMessage,setNewMessage]=useState("");
    const scrollRef=useRef();
    const backendUrl="https://mern-backend-e2d0.onrender.com/api"


    

    useEffect(()=>{
    const fetchConversations = async ()=>{
        try{

            const res=await axios.get(`${backendUrl}/conversation/${user._id}`);
            setConversations(res.data);
       
        }catch(err)
        {
            console.log(err);
        }
    };
    fetchConversations();

    },[user._id]);

    useEffect(() => {
        const getMessages = async () => {
            if (currentchat) {
                try {
                    const res = await axios.get(`${backendUrl}/message/${currentchat._id}`);
                    setMessages(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        getMessages();
    }, [currentchat]);

    const handleChange = async (e)=>{
        e.preventDefault();

       
      

        try{
            const message ={
                sender:user._id,
                conversationId:currentchat._id,
                text:newMessage
            }
           const res=await axios.post("https://mern-backend-e2d0.onrender.com/api/message",message);
           setMessages([...messages ,res.data])
           setNewMessage("");
        }
        catch(err)
        {
            console.log(err);
        }
    }

  useEffect(()=>{
  
    scrollRef.current?.scrollIntoView({behavior:"smooth"});

  },[messages])



  return (
    <>
   <Topbar></Topbar>
    <div className="messenger">
        <div className="messengerUsers">
            <div className="messengerUsersWrapper">
            <input type="text" placeholder="Search here for friends!" className="searchUsers"></input>
             
             {conversations.map((c)=>(
                 <div onClick={()=>setCurrentchat(c)}> 
                 <Conversation key={c._id} conversation={c} currentUser={user} ></Conversation>
                    </div>       
             ))}
        
           
            </div>     
        </div>

        <div className="messengerBox">
            <div className="messengerBoxWrapper">
               {currentchat ? <>  <div className="chatBoxTop">
                {
                    messages.map((m)=>(
                        <div  ref={scrollRef}>

                            <Message key={m._id} message={m} own={m.sender === user._id} ></Message>
                        </div>
                    ))
                }
    
                </div>
                <div className="chatBoxBottom">
                    <textarea className="messageTextInput" onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} placeholder="Enter text Here..." ></textarea>
                    <button className="messageSendButton" onClick={handleChange} >Send</button>
                </div></> : "Open a conversation for chat.."}
            </div>
        </div>
        <div className="messengerOnline">
            <div className="messengerOnlineWrapper">
            <ChatOnline/>
            </div>
        </div>
    </div>
    </>
  )
}
