import axios from "axios";


export const loginCall = async (userCredential,dispatch) =>{
     dispatch({type:"LOGIN_START"});
     try{
       
         const res= await axios.post("https://mern-backend-e2d0.onrender.com/api/auth/login",userCredential);
        dispatch({type:"LOGIN_SUCCESS", payload:res.data});
     }
     catch(err){
         dispatch({type:"LOGIN_FAILURE",payload:err});
     }
}

export const logoutCall = async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT" });
    } catch (err) {
        console.error("Logout failed", err);
    }
}