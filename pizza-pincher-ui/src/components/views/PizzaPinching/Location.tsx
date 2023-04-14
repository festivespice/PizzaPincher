import { Stack } from '@mui/material'
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import GooglePlacesAutoComplete from '../../googlePlaces/GooglePlacesAutocomplete'
import LaunchSearchForm from '../../forms/LaunchSearchForm/LaunchSearchForm'
import { pizzaConfigContext } from '../../../misc/contexts/pizzaConfigContext'



export default function Location() {
  const {pizzaIngredientsCt, pizzaTypeCt} = useContext(pizzaConfigContext)
  
  if((pizzaTypeCt == null || pizzaTypeCt == '') && (pizzaIngredientsCt == null || pizzaIngredientsCt.Size == '')){ //if the user got to this path in an unnatural way, return them to where they should be. 
    return<Navigate to="/Search" replace={true}/>
  }

  return ( //send the state to the form, so that it can just be submitted from there.
    <LaunchSearchForm/>
  )
}
