import React from "react";
import {Paper} from '@mui/material'
import { Outlet } from "react-router-dom";

function Pincher(){
    return(
        <Paper sx={{padding: '32px'}}>
            <Outlet/>
        </Paper>
    )
}
export default Pincher