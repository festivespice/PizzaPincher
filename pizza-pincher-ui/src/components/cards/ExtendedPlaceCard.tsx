import React from 'react'
import { PlaceInfo } from '../../misc/interfaces/PlaceInfo'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { CardActionArea, CardContent, CardMedia, Link, Rating, Stack, Typography, useTheme } from '@mui/material'
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
    
    //this link needs the longitude and latitude
    //api=1 parameter is the version of Maps URL
    const linkToGooglePlaces = 'https://www.google.com/maps/search/?api=1&query='+props.placeProps.lati+','+props.placeProps.long

    //get openhours
    let openTimes: string = '';
    if(props.placeProps.openHours != null && props.placeProps.openHours.length >= 1){
        
        const dayOfWeek = "Monday: 11:00 AM – 8:00 PM".split(":")[0];
        const today = new Date().toLocaleString('en-us', {  weekday: 'long' });
        const todaysTimes = props.placeProps.openHours.filter(dayTimes => dayTimes.split(":")[0] == today) //checks if the day is the same as today
        openTimes = 'Open today. ' + todaysTimes[0] //get the first time that is today
    }

    return (
        <Card sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent:'space-around', height: "100%", width:"80%", margin: "auto"}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CardContent>
                        <Typography component="div" variant="h6">
                            {truncatedTitle}
                        </Typography>
                        <Link href={linkToGooglePlaces} target="_blank" rel="noopener" variant="subtitle1">
                            {truncatedAddress}
                        </Link>
                        <hr/>
                        {props.placeProps.website != '' &&  props.placeProps.website != null? 
                            <Link href={props.placeProps.website} target="_blank" rel="noopener" variant="subtitle1">
                                {props.placeProps.website}
                            </Link>
                        :
                        ''}
                        <Typography component="div" variant="subtitle1" color="text.secondary">
                            {props.placeProps.number ? props.placeProps.number : "No number provided..."}
                        </Typography>
                        <hr/>
                        <Typography component="div" variant="subtitle1" color="text.secondary">
                            {openTimes != '' ? openTimes : "No opening times provided..."}
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
                                {props.placeProps.ratingnumber}
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
                    sx={{width: '40%'}}
                    image={props.placeProps.photo}
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
