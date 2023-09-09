
import { createContext,useReducer,useEffect } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
      _id:
      "64da0f0b91bcb928d81fd624",
      name:
      "hritik",
      email:
      "hritik072@gmail.com"},
    isFetching: false,
    error : false

};



const AuthContext= createContext(INITIAL_STATE);


function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  // useEffect(()=>{
  //   localStorage.setItem("user",JSON.stringify(state.user));
  
  // },[state.user])

  return (
    <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>{props.children}</AuthContext.Provider>
  );


}



export {AuthContext,AuthContextProvider};