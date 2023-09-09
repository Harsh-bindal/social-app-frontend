import "./chatOnline.css"
import avatar from "../../assets/avatar.png"



export default function ChatOnline() {


  return (
    <div className="chatOnline" >
     

    <div className="chatOnlineFriend" >
        <div className="imgContainer">
            <img  src={avatar} alt="error" className="chatOnlineImg" ></img>
            <div className="imgBadge"></div>
        </div>
        <span className="chatOnlineName">mani</span>
    </div>
  
</div>
  )
}
