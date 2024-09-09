import Topbar from "../../componets/topbar/Topbar"
import Leftbar from "../../componets/leftBar/Leftbar"
import Rightbar from "../../componets/rightbar/Rightbar"
import Feed from "../../componets/feed/Feed"
import "./home.css"

export default function Home() {

  return (
    <>
        <Topbar/>
         
        <div className="Homecomponents">
        <Leftbar/>
        <Feed  />
        <Rightbar/>
      </div>

    </>
  )
}
