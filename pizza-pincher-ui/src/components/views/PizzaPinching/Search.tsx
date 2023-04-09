import React, { useEffect, useState } from "react";
import {Box, Button, Grid, List, Paper, Stack, Typography} from '@mui/material'
import { Outlet, Link, Navigate } from "react-router-dom";
import PizzaForm from "../../forms/PizzaForm/PizzaForm";
import IngredientsForm from "../../forms/IngredientsForm/IngredientsForm";


export default function Search() {
    //use different states to show which form is selected/being hovered over and disable forms after submitting. 
    const [pizzaForm, setPizzaForm] = useState(false);
    const [ingredientsForm, setIngredientsForm] = useState(false);

    useEffect(() => { //if either of the forms are submitted, change the appearance of the forms
        if(pizzaForm){
            console.log("pizza")
        }
        if(ingredientsForm){
            console.log("ingredients")
        }
    }, [pizzaForm, ingredientsForm])

    return (
        <Paper sx={{
            minWidth: '80vw',
            minHeight: '60vh',
            padding: '32px'
        }}>
            <Grid container>
                <Grid item xs={6} md={5} padding={1} sx={{backgroundColor: "#EDF2F4"}}>
                    <PizzaForm setPizzaForm={setPizzaForm}/>
                </Grid>
                <Grid item md={2} display={{xs:'none', md:'block'}} padding={1}>
                    <Box sx={{backgroundColor: 'gray', verticalAlign:'auto'}}>
                        <Typography variant="h5">Or</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} md={5} padding={1} sx={{backgroundColor: "#EDF2F4"}}>
                    <IngredientsForm setIngredientsForm={setIngredientsForm}/>
                </Grid>
            </Grid>
            {/* This is where the sub-route "location" will output its component when one of the forms is submitted. Remove the unsubmitted form. */}
            <Outlet/>
        </Paper>
    )
}
