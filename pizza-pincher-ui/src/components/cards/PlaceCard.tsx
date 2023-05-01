import React from 'react'
import { Place } from '../../misc/interfaces/Place'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { CardContent, CardMedia, Rating, Stack, Typography, useTheme } from '@mui/material'
import { truncate } from 'lodash'

interface AppProps {
    placeProps: Place
}
export default function PlaceCard(props: AppProps) {
    const theme = useTheme()
    const truncatedTitle = truncate(props.placeProps.title, {
        'length': 50,
        'separator': ' '
    })
    const truncatedAddress = truncate(props.placeProps.location, {
        'length': 50,
        'separator': ' '
    })
    
    

    return (
        <Card sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent:'space-between'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CardContent>
                    <Typography component="div" variant="h6">
                        {truncatedTitle}
                    </Typography>
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                        {truncatedAddress}
                    </Typography>
                </CardContent>
                <Stack direction="row" sx={{alignItems: 'center'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}} p={1}>
                        <Typography component="div" variant="body1">
                            Price
                        </Typography>
                        <Typography component="div" variant="body2">
                            {props.placeProps.price != null ? ("$" + props.placeProps.price) : "-"}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}} p={1}>
                        <Typography component="div" variant="body1">
                            Distance
                        </Typography>
                        <Typography component="div" variant="body2">
                            {props.placeProps.distance} mi.
                        </Typography>
                    </Box>
                </Stack>
                <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}} mb={1}>
                    <Typography component="div" variant="body1">
                        Rating
                    </Typography>
                    {props.placeProps.rating != null ? 
                        <Rating name={props.placeProps.title} defaultValue={props.placeProps.rating} precision={0.5} readOnly/>
                    :
                        <Typography component="div" variant="body2">
                            -
                        </Typography>
                    }
                    
                </Box>
            </Box>
            {props.placeProps.imageURL ? 
            <CardMedia
                component="img"
                sx={{width: 200}}
                image={props.placeProps.imageURL}
                alt={props.placeProps.title}
            /> :
            ''}
        </Card>
    )
}
