import React, { useContext, useEffect, useState } from 'react'
import { pizzaConfigContext } from '../../../misc/contexts/pizzaConfigContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import PlaceCard from '../../cards/PlaceCard'
import { Place } from '../../../misc/interfaces/Place'
import { Box, Grid, Paper, Typography } from '@mui/material'
import PlacesSortBar from '../../forms/PlacesSortBar/PlacesSortBar'


export default function Places() {
  const {locationCt, pizzaTypeCt, pizzaIngredientsCt} = useContext(pizzaConfigContext)
  const [places, setPlaces] = useState<Place[]>([])

  //if either of the fields needed are emtpy, redirect
  if(locationCt == '' || (pizzaTypeCt == '' && pizzaIngredientsCt.Cheese == '')){
    return<Navigate to="/" replace={true}/>
  }

  //if not empty, figure out which pizza information isn't empty and use that one
  const notEmptyPizza = pizzaTypeCt == '' ? pizzaIngredientsCt : pizzaTypeCt
  
  var request = {
    method: "GET",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({place: locationCt, pizza: notEmptyPizza})
  }
  //console.log({place: locationCt, pizza: notEmptyPizza})

  useEffect(() => { //when this page is loaded, try to load the places once. Request using the search parameters.
    axios.get("http://localhost:3001/places")
      .then(res => {
        setPlaces(res.data)
      })
      .catch(error => {
        alert(error)
      })
  }, []) //removing the '[]' means to keep loading over and over again

  
  return (
    <Paper sx={{
      minWidth: '80vw',
      minHeight: '60vh',
      padding: '16px'
    }}>
    <PlacesSortBar places={places} setPlaces={setPlaces} />
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{
          backgroundColor: 'gray',
        }} p={1}>
          <Grid container sx={{justifyContent:"space-around"}}>
            {places.length ? 
              places.map(
                place => 
                <Grid item key={place.id} xs={5.5} md={3.5} my={1} sx={{backgroundColor: "white"}}>
                  <PlaceCard placeProps={place} />
                </Grid>
              ) :
              "placeholder: not yet loaded."
            }
          </Grid>
        </Box>
      </Grid>
    </Grid>
    </Paper>
    
  )
}