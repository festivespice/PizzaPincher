import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Location() {
  const {state} = useLocation()
  console.log(state)
  return (
    <div>Ask for a location using Google Places.</div>
  )
}
