import React, { useContext } from "react";
import { userContext } from "../../../misc/contexts/userContext";
import { Navigate } from "react-router-dom";

function Login(){
    const {username} = useContext(userContext)
    if(username){
        return<Navigate to="/" replace={true}/>
    }

    return(
        <h1>Login</h1>
    )
}
export default Login