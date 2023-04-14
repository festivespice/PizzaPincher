import React, { useContext } from "react";
import { userContext } from "../../../misc/contexts/userContext";
import { Navigate } from "react-router-dom";

function Signup(){
    const {username} = useContext(userContext)
    if(username){
        return<Navigate to="/" replace={true}/>
    }

    return(
        <h1>Signup</h1>
    )
}
export default Signup