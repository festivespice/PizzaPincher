import React, { useState } from 'react'
import {Autocomplete, Box, Button, FormControl, FormControlLabel, FormHelperText, Grid, List, Paper, Radio, RadioGroup, Stack, Typography, TextField} from '@mui/material'

const sizes = ['Small', 'Medium', 'Large']
const cheeses = ['Mozzarella', 'Provolone', 'Cheddar', 'Ricotta']
const sauces = ['Tomato', 'Pesto', 'Alfredo', 'BBQ', 'Buffalo']
const toppings = ['Mozzarella cheese', 'Basil', 'Spinach', 'Artichoke', 'Ricotta cheese', 'Black olive', 'Feta cheese', 'Sausage', 'Pepper', 'Mushroom', 'Pesto sauce', 'Jalapeno', 'Pepperoni', 'Onion', 'Bacon', 'Cheese', 'Chicken', 'Pineapple', 'Ham', 'Garlic', 'Tomato', 'Anchovies', 'Banana pepper', ]



const pizzaSettings = {
    Size: "",
    Cheese: "",
    Sauce: "",
    Toppings: [""]
}
export default function IngredientsForm() {
    const [pizzaConfig, setPizzaConfig] = useState(pizzaSettings)
    const [error, setError] = useState(false)
    const [helperText, setHelperText] = useState('')
    //create a state hook that catches when each chip is deleted, or maybe just send setPizzaConfig as a prop

    //validate the form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //submitting with no options basically means search for any pizzas (very chaotic)
        console.log('submit')
    }

    //store the new change in the pizza settings
    const handleIngredientsChange = (event: React.SyntheticEvent, inputValue: string | string[] | null) => {
        //get the name of the ingredient changed so that we can change based off of that.
        let name: string = event.currentTarget.id.toString()
        let inputArr: string[] = []
        let inputStr: string = '';
        
        //make sure that the two are defined before using them... basically neither can be null or undefined. 
        if(inputValue && name){
            //make changes to input information
            if(Array.isArray(inputValue)){
                inputArr = inputValue
                console.log(inputValue)
            }else{
                inputStr = inputValue
            }
            name = name.substring(0, name.indexOf("-")) //extract the ID of the parent

            setPizzaConfig(previousState => {
                //if we're changing one value at a time, don't change the others.
                if(name === 'Size'){
                    return{...previousState, Size: inputStr} 
                } else if(name === 'Cheese'){
                    //change the array of a previous state
                    return{...previousState, Cheese: inputStr}
                } else if(name === 'Sauce'){
                    return{...previousState, Sauce: inputStr}
                } else if(name === 'Toppings'){
                    return{...previousState, Toppings:inputArr} //we don't need to spread because it returns the entire array
                }
                else{
                    //if no valid name is given, don't make changes
                    return{...previousState}
                }
                
            })
        }
        console.log(pizzaConfig)
    }

    return (
    <Box>
        <Stack direction="column">
            <Typography variant="h6" mb={3}>Find specific pizza</Typography>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    value={pizzaConfig.Size}
                    options={sizes.map((size) => size)}
                    id="Size"
                    fullWidth={true}
                    renderInput={(params) => <TextField  {...params} label="Pizza size"/>}
                    onChange={handleIngredientsChange} 
                    // We are using the "onChange" "value" state instead of onInputChange: only complete results and not half-typed strings
                />   
                <Autocomplete
                    value={pizzaConfig.Cheese}
                    options={cheeses.map((cheese) => cheese)}
                    id="Cheese"
                    fullWidth={true}
                    renderInput={(params) => <TextField {...params} label="Pizza cheese"/>}
                    onChange={handleIngredientsChange} 
                    // We are using the "onChange" "value" state instead of onInputChange: only complete results and not half-typed strings
                />   
                <Autocomplete
                    value={pizzaConfig.Sauce}
                    options={sauces.map((sauce) => sauce)}
                    id="Sauce"
                    fullWidth={true}
                    renderInput={(params) => <TextField {...params} label="Pizza sauce"/>}
                    onChange={handleIngredientsChange} 
                    // We are using the "onChange" "value" state instead of onInputChange: only complete results and not half-typed strings
                />   
                <Autocomplete
                    multiple
                    limitTags={2}
                    value={pizzaConfig.Toppings}
                    options={toppings.map((topping) => topping)}
                    fullWidth={true}
                    id="Toppings"
                    renderInput={(params) => <TextField {...params} label="Pizza toppings"/>}
                    onChange={handleIngredientsChange} 
                    // We are using the "onChange" "value" state instead of onInputChange: only complete results and not half-typed strings
                /> 
                <Button sx={{m:1}} type="submit" variant="outlined">
                    Find places
                </Button>
            </form>
        </Stack>
    </Box>
    )
}
