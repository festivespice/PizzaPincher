import React, { useState } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { userContext } from "../../misc/contexts/userContext"
import { createTheme, colors, ThemeProvider, Box, styled, Typography, AppBar, Toolbar, Stack, Divider, IconButton, Button } from '@mui/material'
import LocalPizzaRoundedIcon from '@mui/icons-material/LocalPizzaRounded';
import '../../App.css'
//Trying to export an interface and use props doesn't work because
//you'd have to figure out how to use a component as a prop. 

    //Styling
    export const theme = createTheme({ //needs to match default structure
    palette: {
      primary: {
        main: '#EF233C',
        dark: '#D90429',
        contrastText: '#fff'
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
    backgroundColor: theme.palette.secondary.main,
  }))

  
function RootLayout(){
    //user status hook. using a provider to give consumers the context we defined in ../misc/contexts/userContext.ts
    const [username, setUsername] = useState("pizzaman")

    return(
        <userContext.Provider value={{username, setUsername}}>
            <ThemeProvider theme={theme}>
                <AppBar position = 'sticky'>
                    <Toolbar>
                        <LocalPizzaRoundedIcon  fontSize="large"/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Pizza Pincher 
                        </Typography>

                        {/* Navlinks are associated with the 'router' in App.tsx */}
                        <Stack direction="row" spacing = {2}>
                            <Button color="inherit">
                                <Link style={{textDecoration: "none", color:"inherit"}} to="/" >About</Link>
                            </Button>
                            <Button color='inherit'>
                                <Link style={{textDecoration: "none", color:"inherit"}} to="/Search" >Search</Link>
                            </Button>
                            <Button color='inherit'>
                                {username != '' ? <Link style={{textDecoration: "none", color:"inherit"}} to="/Account">{username}</Link> : <Link style={{textDecoration: "none", color:"inherit"}} to="/Login">Login</Link>}
                            </Button>

                        </Stack>
                    </Toolbar>
                </AppBar>
                <StyledBackground className="root-layout" py={3} px={9}>
                    <main>
                        <Outlet/>  {/* This is where the output of the pages goes */}
                    </main>
                </StyledBackground>
            </ThemeProvider>
        </userContext.Provider>
    )
}
export default RootLayout