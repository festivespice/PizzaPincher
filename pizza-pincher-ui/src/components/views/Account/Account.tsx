import React, { useContext } from 'react'
import { userContext } from '../../../misc/contexts/userContext'
import { Navigate } from 'react-router-dom'

export default function Account() {
    const {username, setUsername} = useContext(userContext)
    if(!username){
        return<Navigate to="/" replace={true}/>
    }

    return (
        <div>
            <div>Hello, {username}</div>
            <button id="logout" onClick={(e) => setUsername("")}>logout</button>
        </div> 
    )
}
