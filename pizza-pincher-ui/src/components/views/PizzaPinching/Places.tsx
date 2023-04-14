import React, { useContext } from 'react'
import { pizzaConfigContext } from '../../../misc/contexts/pizzaConfigContext'

export default function Places() {
  const {locationCt, pizzaTypeCt, pizzaIngredientsCt} = useContext(pizzaConfigContext)
  //if either of the fields needed are emtpy, redirect
  if(locationCt == '' || (pizzaTypeCt == '' && pizzaIngredientsCt.Cheese == '')){

  }

  //if not empty, figure out which pizza information isn't empty and use that one
  const notEmptyPizza = pizzaTypeCt == '' ? pizzaIngredientsCt : pizzaTypeCt
  
  var request = {
    method: "GET",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({place: locationCt, pizza: notEmptyPizza})
  }

  return (
    <div>{request.body}</div>
  )
}
