import { Button, Stack } from '@mui/material'
import React, {SetStateAction, useContext } from 'react'
import GooglePlacesAutoComplete from '../../googlePlaces/GooglePlacesAutocomplete'
import { pizzaConfigContext } from "../../../misc/contexts/pizzaConfigContext";
import { useNavigate } from 'react-router-dom';


export default function LaunchSearchForm() {
    const [placeName, setPlaceName] = React.useState('')
    const {locationCt, setLocationCt, pizzaTypeCt, pizzaIngredientsCt} = useContext(pizzaConfigContext)
    const navigate = useNavigate()


    //validate the form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        //if the place name isn't null and if we have pizza information, then we'll save the place name and navigate to the 'places' component. 
        if(placeName != null && (pizzaIngredientsCt.Cheese != '' || pizzaTypeCt != '')){
            setLocationCt(placeName)
            
            navigate('/Places')
        }else {
            alert("return to the '/Search' route: there's an error with how data was collected")
        }
    }
    return (
    <Stack mt={2} direction="row">
        <form onSubmit={handleSubmit}>
            <GooglePlacesAutoComplete setPlaceName={setPlaceName}/>
            <Button sx={{m:1}} type="submit" variant="outlined">
                Start search
            </Button>
        </form>
    </Stack>
    )
}
