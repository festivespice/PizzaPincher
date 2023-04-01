import { useState } from 'react'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

//pages 
import Landing from './components/views/Landing/Landing'
import PizzaPlaces from './components/views/PizzaPlaces/PizzaPlaces'
import Signup from './components/views/Signup/Signup'
import Login from './components/views/Login/Login'

//routes
import RootLayout from './components/routing/RootLayout'

//Router 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}> {/* The below routes are relative to this route: '/' */}
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/PizzaPlaces" element={<PizzaPlaces/>}></Route>
      <Route path="/Signup" element={<Signup/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
    </Route>
  )
)

//Component
function App() {
  return (
    <RouterProvider router = {router}></RouterProvider>
  )
}

export default App
