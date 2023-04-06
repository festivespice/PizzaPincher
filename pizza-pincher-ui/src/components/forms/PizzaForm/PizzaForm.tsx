import React, { useState } from 'react'
import {Box, Button, FormControl, FormControlLabel, FormHelperText, Grid, List, Paper, Radio, RadioGroup, Stack, Typography} from '@mui/material'

//a list of binary values. Only one of them can be '1'.
//Represents medium sized pizzas. 
const initialPizzas = {
    'Regular cheese': 0,
    'Regular cheese with pepperoni': 0,
    'New York style': 0,
    'Neopolitan': 0,
    'California': 0,
    'Chicago deep-dish': 0,
    'Greek': 0,
    'Sicilian': 0,
    'Roman': 0,
    'Bianca': 0,
}
export default function PizzaForm(props: any) {
    const [pizzaType, setPizzaType] = useState('')
    const [error, setError] = useState(false)
    const [helperText, setHelperText] = useState('')
    
    //validate the form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(pizzaType == ''){
            setHelperText('Please select an option')
        }
        else{
            //navigate to the next page with the data
        }
    }
    
    //if a radio is clicked on, select it and store the pizza type
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPizzaType((event.target as HTMLInputElement).value)
        setHelperText('')
        setError(false)
    }

    return (
    <Box>
        <Stack direction="column">
            <Typography variant="h6" mb={3}>Find generic pizza</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl error={error} variant="standard">
                    <RadioGroup name="selectPizza" value={pizzaType} onChange={handleRadioChange}>
                        <FormControlLabel value="Regular cheese" control={<Radio/>} label="Regular cheese label"/>
                        <FormControlLabel value="Regular cheese with pepperoni" control={<Radio/>} label="Regular cheese with pepperoni"/>
                        <FormControlLabel value="New York style" control={<Radio/>} label="New York style label"/>
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                    <Button sx={{m:1}} type="submit" variant="outlined">
                        Find places
                    </Button>
                </FormControl>
            </form>
        </Stack>
    </Box>
    )
}
