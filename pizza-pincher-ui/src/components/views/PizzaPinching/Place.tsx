import React from 'react'
import ExtendedPlaceCard from '../../cards/ExtendedPlaceCard'
import { PlaceInfo } from '../../../misc/interfaces/PlaceInfo'
import { useLocation } from 'react-router-dom'

export default function Place() {
  const {state} = useLocation(); 
  return (
    <ExtendedPlaceCard placeProps={state}/>
  )
}
