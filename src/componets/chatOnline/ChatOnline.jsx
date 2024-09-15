import "./chatOnline.css"
import avatar from "../../assets/avatar.png"



export default function ChatOnline({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="chatOnline" >
    <div className="chatOnlineFriend" >
        <div className="imgContainer">
            <img  src={user.profilePicture ? PF+user.profilePicture :avatar} alt="error" className="chatOnlineImg" ></img>
        </div>
        <span className="chatOnlineName">{user.name}</span>
    </div>
</div>
  )
}
