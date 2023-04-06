import React from "react";
import {Box, Button, Grid, List, Paper, Stack, Typography} from '@mui/material'
import { Outlet, Link, Navigate } from "react-router-dom";
import PizzaForm from "../../forms/PizzaForm/PizzaForm";
import IngredientsForm from "../../forms/IngredientsForm/IngredientsForm";

export default function Search() {
  return (
    <Paper sx={{
        minWidth: '80vw',
        minHeight: '60vh',
        padding: '32px'
    }}>
        <Typography variant="body2">...Add the mile radius and location form before this</Typography>
        <Grid container spacing={2}>
            <Grid item xs={6} md={5} padding={1}>
                <PizzaForm/>
            </Grid>
            <Grid item md={2} display={{xs:'none', md:'block'}} padding={1}>
                <Box sx={{backgroundColor: 'gray', verticalAlign:'auto'}}>
                    <Typography variant="h5">Or</Typography>
                </Box>
            </Grid>
            <Grid item xs={6} md={5} padding={1}>
                <IngredientsForm/>
            </Grid>
        </Grid>
    </Paper>
  )
}
