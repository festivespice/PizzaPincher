import React from 'react'
import { Place } from '../../misc/interfaces/Place'
interface AppProps {
    placeProps: Place
}
export default function PlaceCard(props: AppProps) {
    console.log(props.placeProps.price)
    console.log(typeof(props.placeProps.price))

  return (
    <div>
        <h2>{props.placeProps.title}</h2>
        <p>Address: {props.placeProps.location}</p>
        {props.placeProps.hasPizza ? <p>The place has the desired pizza.</p> : <p>The place doesn't have the pizza</p>}
        {(props.placeProps.price != null) ? <p>${props.placeProps.price}</p> : ''}
        <p>{props.placeProps.distance} miles</p>
        <p>{props.placeProps.rating} stars out of 5</p>
        <p>{props.placeProps.websiteURL}</p>
        <p>{props.placeProps.phoneNumber}</p>
        <p>{props.placeProps.imageURL}</p>
        <p></p>
    </div>
  )
}
