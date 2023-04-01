import { NavLink, Outlet } from "react-router-dom"
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
  
  const StyledBox = styled(Box)(({theme}) => ({
    height: '60%',
    width: '100%',
    backgroundColor: theme.palette.secondary.light,
  }))

  
function RootLayout(){
    return(
        <ThemeProvider theme={theme}>
            <div className="root-layout">
                <header>
                    <nav>
                        <NavLink to="/">Pizza Pincher</NavLink> {/* Navlinks are associated with the 'router' in App.tsx */}
                        <NavLink to="/PizzaPlaces">Places</NavLink>
                        <NavLink to="/Login">Login</NavLink>
                    </nav>
                </header>
                
                <main>
                    <Outlet/>  {/* This is where the output of the pages goes */}
                </main>
            </div>
        </ThemeProvider>
    )
}
export default RootLayout