import { Stack } from '@mui/material'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import GooglePlacesAutoComplete from '../../googlePlaces/GooglePlacesAutocomplete'
import LaunchSearchForm from '../../forms/LaunchSearchForm/LaunchSearchForm'



export default function Location() {
  const {state} = useLocation() //not related to the component name: a state passed from 'search' through its forms
  if(state == null || state == ''){ //if the user got to this path in an unnatural way, return them to where they should be. 
    return<Navigate to="/Search" replace={true}/>
  }

  return ( //send the state to the form, so that it can just be submitted from there.
    <LaunchSearchForm pizzaInfo={state}/>
  )
}
