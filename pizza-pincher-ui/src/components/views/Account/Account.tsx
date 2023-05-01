import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../../misc/contexts/userContext'
import { Navigate } from 'react-router-dom'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { Place } from '../../../misc/interfaces/Place'
import PlaceCard from '../../cards/PlaceCard'
import axios from 'axios'

export default function Account() {
    const {username, setUsername} = useContext(userContext)
    const [ownedPlaces, setOwnedPlaces] = useState<Place[]>([])
    if(!username){
        return<Navigate to="/" replace={true}/>
    } else {
        useEffect(() => { //when this page is loaded, try to load the places once. Request using the search parameters.
            axios.get("http://localhost:3001/places?ownerName=" + username) //all restaurants owned by the person logged in
              .then(res => {
                setOwnedPlaces(res.data)
              })
              .catch(error => {
                alert(error)
              })
          }, []) //removing the '[]' means to keep loading over and over again
    
    }


    return (
        <div>
            <div>
                <div>Hello, {username}</div>
                <button id="logout" onClick={(e) => setUsername("")}>logout</button>
            </div>
            <Paper sx={{
            minWidth: '80vw',
            minHeight: '60vh',
            padding: '32px'
            }}>
                <Box>
                    <Typography> Owned restaurants </Typography>
                    <Grid container>
                        <Grid item xs={12} md={8}>
                            <Box sx={{
                            backgroundColor: 'gray',
                            }} p={1}>
                                <Grid container sx={{justifyContent:"space-around"}}>
                                    {ownedPlaces.length ? 
                                    ownedPlaces.map(
                                        place => 
                                        <Grid item key={place.id} xs={5.5} my={1} sx={{backgroundColor: "white"}}>
                                            <PlaceCard placeProps={place} />
                                        </Grid>
                                    ) :
                                    "placeholder: not yet loaded."
                                    }
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button>
                                Add Restaurant
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </div> 
    )
}
