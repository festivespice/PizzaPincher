import React, { useEffect, useState, SetStateAction, useContext} from 'react'
import {Box, Button, FormControl, FormControlLabel, FormHelperText, Grid, List, Paper, Radio, RadioGroup, Stack, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { pizzaConfigContext } from '../../../misc/contexts/pizzaConfigContext'

//a list of binary values. Only one of them can be '1'.
//Represents medium sized pizzas. 
const initialPizzas = [
    'Regular cheese',
    'Regular cheese with pepperoni',
    'New York style',
    'Neopolitan',
    'California',
    'Chicago deep-dish',
    'Greek',
    'Sicilian',
    'Roman',
    'Bianca'
]
interface AppProps {
    setPizzaForm: React.Dispatch<SetStateAction<boolean>>
}
export default function PizzaForm(props: AppProps) {
    
    const [pizzaType, setPizzaType] = useState('')
    const [error, setError] = useState(false)
    const [helperText, setHelperText] = useState('')
    const {pizzaTypeCt, setPizzaTypeCt} = useContext(pizzaConfigContext)

    const navigate = useNavigate()
    
    //validate the form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(pizzaType == ''){
            setHelperText('Please select an option')
        }else{
            //change the state
            setPizzaTypeCt(pizzaType)
            //navigate to ask the user for their location
            navigate('./Location', {state: pizzaType})
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
                        {initialPizzas.map((object, i) => {
                            return(<FormControlLabel key={i} value={object} control={<Radio/>} label={object}/>)
                        })}
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
