import React from 'react'
import { PlaceInfo } from '../../misc/interfaces/PlaceInfo'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { CardActionArea, CardContent, CardMedia, Rating, Stack, Typography, useTheme } from '@mui/material'
import { isEmpty, truncate } from 'lodash'

interface AppProps {
    placeProps: PlaceInfo
}

export default function ExtendedPlaceCard(props: AppProps) {
  const theme = useTheme()
    const truncatedTitle = truncate(props.placeProps.name, {
        'length': 100,
        'separator': ' '
    })
    const truncatedAddress = truncate(props.placeProps.address, {
        'length': 100,
        'separator': ' '
    })
    
    

    return (
        <Card sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent:'space-between', height: "100%"}}>
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
                        <>
                            <Rating name={props.placeProps.name} defaultValue={props.placeProps.rating} precision={0.2} readOnly/>
                            <Typography component="div" variant="body2">
                                {props.placeProps.ratingNumber}
                            </Typography>
                        </>                        
                        :
                            <Typography component="div" variant="body2">
                                -
                            </Typography>
                        }
                    </Box>
                </Box>
                {typeof(props.placeProps.imageURL) == "string" && !isEmpty(props.placeProps.imageURL) ? 
                <CardMedia
                    component="img"
                    sx={{width: '25%'}}
                    image={props.placeProps.imageURL}
                    alt={props.placeProps.name}
                /> :
                <CardMedia
                    component="img"
                    sx={{width: '40%'}}
                    image={"../src/assets/no-image-found.png"}
                    alt={"no image found"}
                />}
        </Card>
    )
}
