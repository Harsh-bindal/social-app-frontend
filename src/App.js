import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger"

function App() {
  
  const {user} = useContext(AuthContext);


  return (
   
    <Router>
    <Routes>
        <Route   path="/" element={user ? <Home/> : <Register /> }>  </Route>
        <Route  exact path="/login" element={user ? <Navigate to ="/" /> : <Login />} />
        <Route  exact path="/register" element={user ? <Navigate to ="/"/> : <Register />} />
        <Route  exact path="/messenger" element={ !user ? <Navigate to ="/"/> : <Messenger />} />
        <Route path="/profile/:username" element={!user ?  <Login /> : <Profile />} />
    </Routes>
  </Router>


  );
}

export default App;
