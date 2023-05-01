import React from 'react'
import { PlaceInfo } from '../../misc/interfaces/PlaceInfo'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { CardActionArea, CardContent, CardMedia, Rating, Stack, Typography, useTheme } from '@mui/material'
import { truncate, isEmpty } from 'lodash'

interface AppProps {
    placeProps: PlaceInfo,
    selectCard: (placeId: number) => void //void function
}
export default function PlaceCard(props: AppProps) {
    const theme = useTheme()
    const truncatedTitle = truncate(props.placeProps.name, {
        'length': 50,
        'separator': ' '
    })
    const truncatedAddress = truncate(props.placeProps.address, {
        'length': 50,
        'separator': ' '
    })

    const selectCardHelper = () => {
        props.selectCard(props.placeProps.id)
    }
    console.log(props.placeProps.photo)
    

    return (
        <Card sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent:'space-between', height: "100%"}}>
            <CardActionArea sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch'}} onClick={selectCardHelper}>    
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
                {typeof(props.placeProps.photo) == "string" && !isEmpty(props.placeProps.photo) ? 
                <CardMedia
                    component="img"
                    sx={{width: '25%'}}
                    image={props.placeProps.photo}
                    alt={props.placeProps.name}
                /> :
                <CardMedia
                    component="img"
                    sx={{width: '50%'}}
                    image={"src/assets/no-image-found.png"}
                    alt={"no image found"}
                />}
            </CardActionArea>    
        </Card>
    )
}
