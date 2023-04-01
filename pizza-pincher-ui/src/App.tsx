import { useState } from 'react'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

//pages 
import Landing from './components/views/Landing/Landing'
import Pincher from './components/views/PizzaPinching/Pincher'
import Signup from './components/views/Signup/Signup'
import Login from './components/views/Login/Login'

//routes
import RootLayout from './components/routing/RootLayout'
import Account from './components/views/Account/Account'

//Router 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}> {/* The below routes are relative to this route: '/' */}
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/Pincher" element={<Pincher/>}></Route>
      <Route path="/Signup" element={<Signup/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/Account" element={<Account/>}></Route>
    </Route>
  )
)

//Component
function App() {
  return ( //the root is at RootLayout component. 
    <RouterProvider router = {router}></RouterProvider> 
  )
}

export default App
