import React, { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { userContext } from "../../misc/contexts/userContext"
import { createTheme, colors, ThemeProvider, Box, styled, Typography } from '@mui/material'
//Trying to export an interface and use props doesn't work because
//you'd have to figure out how to use a component as a prop. 

//Styling
const theme = createTheme({ //needs to match default structure
    palette: {
      primary: {
        main: '#EF233C',
        dark: '#D90429',
        contrastText: '#000'
      },
      secondary: {
        main: "#8D99AE", 
        light: "#EDF2F4",
        dark: "#2B2D42",
        contrastText: '#fff'
      }
    },
    typography: {
      fontFamily: 'Roboto',
    }
  })
  
  const StyledBackground = styled(Box)(({theme}) => ({
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.secondary.main,
  }))

  
function RootLayout(){
    //user status hook. using a provider to give consumers the context we defined in ../misc/contexts/userContext.ts
    const [username, setUsername] = useState("pizzaman")

    return(
        <userContext.Provider value={{username, setUsername}}>
            <ThemeProvider theme={theme}>
                <StyledBackground className="root-layout">
                    <header>
                        <nav>
                            <NavLink to="/">Pizza Pincher</NavLink> {/* Navlinks are associated with the 'router' in App.tsx */}
                            <NavLink to="/Pincher">Pincher</NavLink>
                            {username != '' ? <NavLink to="/Account">{username}</NavLink> : <NavLink to="/Login">Login</NavLink>}
                        </nav>
                    </header>
                    
                    <main>
                        <Outlet/>  {/* This is where the output of the pages goes */}
                    </main>
                </StyledBackground>
            </ThemeProvider>
        </userContext.Provider>
    )
}
export default RootLayout