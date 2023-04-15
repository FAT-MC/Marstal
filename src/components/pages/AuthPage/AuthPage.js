import React, { useEffect } from "react";
import { 
  useSelector, 
  useDispatch,
} from "react-redux";
import { authChecked } from "../../../redux/features/authSlice";
import "./AuthPage.css";

export function AuthPage() {
  const isloggedIn = useSelector((state) => state.auth.isloggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authChecked())
  }, [dispatch]) // add dispatch to dependency list to get rid of lint warning https://stackoverflow.com/questions/56795607/what-are-the-cases-where-redux-dispatch-could-change
  

  const checkAuth = () => {
    return isloggedIn ? (
      <div></div>
    ) : (
      <button>Login</button>
    )
  }
  
  return (
    <div className="p-Authpage__container">
      {checkAuth()}
    </div>
  )
}