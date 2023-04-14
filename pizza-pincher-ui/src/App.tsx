import { useState } from 'react'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

//pages 
import Landing from './components/views/Landing/Landing'
import Signup from './components/views/Signup/Signup'
import Login from './components/views/Login/Login'
import Account from './components/views/Account/Account'
import Search from './components/views/PizzaPinching/Search'
import Places from './components/views/PizzaPinching/Places'
import Place from './components/views/PizzaPinching/Place'
import Location from './components/views/PizzaPinching/Location'

//start
import RootLayout from './components/routing/RootLayout'


//Router 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}> {/* The below routes are relative to this route: '/' */}
      <Route path="/" element={<Landing/>}></Route>
      <Route path="Search" element={<Search/>}>
        <Route path="Location" element={<Location/>}></Route>
      </Route>
      <Route path="Places" element={<Places/>}>
        <Route path="Place/:name" element={<Place/>}></Route>
      </Route>
      <Route path="Signup" element={<Signup/>}></Route>
      <Route path="Login" element={<Login/>}></Route>
      <Route path="Account" element={<Account/>}></Route>
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
