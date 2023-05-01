import React, { useContext, useEffect, useState } from 'react'
import { pizzaConfigContext } from '../../../misc/contexts/pizzaConfigContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PlaceCard from '../../cards/PlaceCard'
import { PlaceInfo } from '../../../misc/interfaces/PlaceInfo'
import { Box, Grid, Paper, Typography } from '@mui/material'
import PlacesSortBar from '../../forms/PlacesSortBar/PlacesSortBar'


export default function Places() {
  const {locationCt, pizzaTypeCt, pizzaIngredientsCt} = useContext(pizzaConfigContext)
  const [places, setPlaces] = useState<PlaceInfo[]>([])
  const navigate = useNavigate()


  //if either of the fields needed are emtpy, redirect
  if(locationCt == '' || (pizzaTypeCt == '' && pizzaIngredientsCt.Cheese == '')){
    return<Navigate to="/" replace={true}/>
  }

  useEffect(() => { //when this page is loaded, try to load the places once. Request using the search parameters.
    axios.post(requestUrl, requestBody, requestHeaders)
      .then(res => {
        setPlaces(res.data)
      })
      .catch(error => {
        console.log("Error")
        console.log(error.message)
      })
  }, []) //removing the '[]' means to keep loading over and over again
  

  //if not empty, figure out which pizza information isn't empty and use that one
  const notEmptyPizza = pizzaTypeCt == '' ? pizzaIngredientsCt : pizzaTypeCt
  
  const requestUrl = "http://localhost:1337/googleplaces/yummyPlaces"
  const requestHeaders = {
    headers: {'Content-Type': 'application/json'},
  }
  const requestBody = {
    body: JSON.stringify({place: locationCt, pizza: notEmptyPizza})
  }

  /*if the user clicks on a card, we want to send the card data to a 
  bigger card at the top of the page that the user can interact with.*/
  const traverseToOutlet = (placeId: number) => { //this function is given to each card. When it's called it's executed here
    const desiredPlace = places.filter(place => place.id == placeId)[0] //the only place

    const relativePath = './Place'
    navigate(relativePath, {state: desiredPlace}) //in the ExtendedPlaceCard component, the 'useLocation' function will get this "state"
  }

  return (
    <Paper sx={{
      minWidth: '80vw',
      minHeight: '60vh',
      padding: '16px'
    }}>
    <Outlet/> 
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
                <Grid item key={place.id} xs={10} sm={5.5} md={3.5} my={1} sx={{backgroundColor: "white"}}>
                  <PlaceCard selectCard={traverseToOutlet} placeProps={place} />
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