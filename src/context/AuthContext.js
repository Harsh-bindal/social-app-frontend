
import { createContext,useReducer,useEffect } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error : false

};



const AuthContext= createContext(INITIAL_STATE);


function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(()=>{
    try {
      localStorage.setItem("user", JSON.stringify(state.user));
  } catch (error) {
      console.error("Failed to save user to localStorage", error);
  }
  
  },[state.user])

  return (
    <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>{props.children}</AuthContext.Provider>
  );


}



export {AuthContext,AuthContextProvider};