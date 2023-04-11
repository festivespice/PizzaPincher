import { Button, Stack } from '@mui/material'
import React, {SetStateAction } from 'react'
import GooglePlacesAutoComplete from '../../googlePlaces/GooglePlacesAutocomplete'


interface AppProps {
    pizzaInfo: any //should be the output of either of the two previous forms. Not null. 
}

export default function LaunchSearchForm(props: AppProps) {
    const [placeName, setPlaceName] = React.useState('')

    //validate the form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(placeName)
        console.log(props.pizzaInfo)
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
