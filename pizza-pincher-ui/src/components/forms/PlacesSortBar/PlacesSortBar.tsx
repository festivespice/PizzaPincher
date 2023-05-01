import React, { SetStateAction, useEffect, useState } from 'react'
import { PlaceInfo } from '../../../misc/interfaces/PlaceInfo'
import { isEmpty, orderBy, compact, toLower } from 'lodash'
import { Box, Checkbox, FormControlLabel, Grid, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'

interface AppProps {
    places: PlaceInfo[]
    setPlaces: React.Dispatch<SetStateAction<PlaceInfo[]>>
}

export default function PlacesSortBar(props: AppProps) {
    const originalPlaces = [...props.places] //should not change: maintains original order
    const sortCriteria = ["Distance", "Rating", "Price", "RatingNumber"]
    const [sortingBy, setSortingBy] = useState<string[]>(["None"])
    const [sortingDirectionAscending, setSortingDirectionAscending] = useState<boolean[]>([false, false, false, false]) //for 

    //this is the map that I used when I was sorting in a hard-coded way
    // const sortMap = new Map([
    //     ["Distance", "asc"],
    //     ["Price", "asc"],
    //     ["Rating", "desc"],
    //     ["None", undefined]
    // ])
    const dynamicSortingMap = new Map([
        [true, "asc"],
        [false, "desc"]
    ])

    //Used to detect when a change to the order of the places should be made
    useEffect(() => {
        if(!isEmpty(sortingBy) && sortingBy[0] != "None")
        sortCards(sortingBy)
    }, [sortingBy, sortingDirectionAscending]) //every time either state is updated, the places will be sorted


    //sorts the given list of Places using a prop from the parent 'Places' component by using the criteria in 'sortingBy' and the order in 'sortingDirectionAscending'
    const sortCards = (sortStrings: string[]) => {
        //The lodash 'sortBy' is for more simplistic uses. We want to specify a nested ordering with ascending and descending directions. 
        let newPlaces = originalPlaces.slice() //create a shallow copy
        
        if(sortStrings[sortStrings.length-1] == "None"){ //remove any "none" found
            sortStrings = sortStrings.slice(0, sortStrings.length - 1) 
        }
        //dynamically get the sorting directions
        const sortOrderBooleans = sortingDirectionAscending.slice(0, sortStrings.length) //we only want to change the directions of existing sorting strings
        const sortOrderStrings: any = sortOrderBooleans.map(s => dynamicSortingMap.get(s))
        //compact(sortStrings.map(s => sortMap.get(s)))//I can't specifically show typescript what's in the array, so I just labelled it as any
        //removes all undefined values using 'compact()'

        //the names of the attributes in the PlaceInfo objects are lowercase: use a lowercase sortStrings
        sortStrings = sortStrings.map(s => toLower(s))
        newPlaces = orderBy(newPlaces, sortStrings, sortOrderStrings)
        props.setPlaces(newPlaces)
    }

    //Because React useState hooks update asynchronously, we need to use a useEffect hook to update our cards whenever we change our sortingBy hook. 
    const changeFirstIndex = (event: SelectChangeEvent) => {
        const chosenValue = event.target.value
        if(chosenValue == "None"){
            setSortingBy(["None"])
            props.setPlaces(originalPlaces) //if we don't want any changes, just use the original array of places
        } else {
            setSortingBy([chosenValue, "None"])
        }
    }
    const changeFirstDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
        //destructuring creates a shallow copy
        let newArray = [...sortingDirectionAscending]
        newArray[0] = event.target.checked
        setSortingDirectionAscending(newArray)
    }

    const changeSecondIndex = (event: SelectChangeEvent) => { //only include the first two
        const chosenValue = event.target.value
        if(chosenValue == "None"){
            setSortingBy(prev => {return[prev[0], "None"]})
        } else {
            setSortingBy(prev => {return[prev[0], chosenValue, "None"]})
        }
    }
    const changeSecondDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
        //destructuring creates a shallow copy
        let newArray = [...sortingDirectionAscending]
        newArray[1] = event.target.checked
        setSortingDirectionAscending(newArray)
    }
    
    const changeThirdIndex = (event: SelectChangeEvent) => {
        const chosenValue = event.target.value
        if(chosenValue == "None"){
            setSortingBy(prev => {return[prev[0], prev[1], "None"]})
        } else {
            setSortingBy(prev => {return[prev[0], prev[1], chosenValue, "None"]})
        }
    }
    const changeThirdDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
        //destructuring creates a shallow copy
        let newArray = [...sortingDirectionAscending]
        newArray[2] = event.target.checked
        setSortingDirectionAscending(newArray)
    }

    const changeFourthIndex = (event: SelectChangeEvent) => {
        const chosenValue = event.target.value
        if(chosenValue == "None"){
            setSortingBy(prev => {return[prev[0], prev[1], prev[2], "None"]})
        } else {
            setSortingBy(prev => {return[prev[0], prev[1], prev[2], chosenValue]})
        }
    }
    const changeFourthDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
        //destructuring creates a shallow copy
        let newArray = [...sortingDirectionAscending]
        newArray[3] = event.target.checked
        setSortingDirectionAscending(newArray)
    }

    return (
        <Box sx={{
        backgroundColor: 'gray'
        }} my={1} mx={3} p={1}>
            <Grid container sx={{justifyContent: 'center', textAlign: "center" }}>
                <Grid item sx={{backgroundColor: 'white'}} md={3}>
                    <Typography>Sort by...</Typography>
                    <Select
                        onChange={changeFirstIndex}
                        value={sortingBy[0]}
                        >
                        <MenuItem value="None"><em>None</em></MenuItem>
                        {
                            sortCriteria.map((criteria, i) => {
                                return(<MenuItem key={i} value={criteria}>{criteria}</MenuItem>)
                            })
                        }
                    </Select>
                    {sortingBy[0] == "None" ? 
                        "" 
                        :
                        <FormControlLabel control={<Checkbox value={sortingDirectionAscending[0]} onChange={changeFirstDirection}/>} label="asc" />
                    }
                </Grid>           
                {sortingBy.length >= 2 ? 
                    <Grid item sx={{backgroundColor: 'white'}} md={3}>
                        <Typography>Sort by...</Typography>
                        <Select
                            onChange={changeSecondIndex}
                            value={sortingBy[1]}
                            >
                            <MenuItem value="None"><em>None</em></MenuItem>
                            {
                                sortCriteria.map((criteria, i) => {
                                    return(<MenuItem key={i} value={criteria}>{criteria}</MenuItem>)
                                })
                            }
                        </Select>
                        {sortingBy[1] == "None" ? 
                            "" 
                            :
                            <FormControlLabel control={<Checkbox value={sortingDirectionAscending[1]} onChange={changeSecondDirection}/>} label="asc" />
                        }
                    </Grid>         
                    :
                    null
                }
                {sortingBy.length >= 3 ? 
                    <Grid item sx={{backgroundColor: 'white'}} md={3}>
                        <Typography>Sort by...</Typography>
                        <Select
                            onChange={changeThirdIndex}
                            value={sortingBy[2]}
                            >
                            <MenuItem value="None"><em>None</em></MenuItem>
                            {
                                sortCriteria.map((criteria, i) => {
                                    return(<MenuItem key={i} value={criteria}>{criteria}</MenuItem>)
                                })
                            }
                        </Select>
                        {sortingBy[2] == "None" ? 
                            "" 
                            :
                            <FormControlLabel control={<Checkbox value={sortingDirectionAscending[2]} onChange={changeThirdDirection}/>} label="asc" />
                        }
                    </Grid>         
                    :
                    null
                }
                {sortingBy.length >= 4 ? 
                    <Grid item sx={{backgroundColor: 'white'}} md={3}>
                        <Typography>Sort by...</Typography>
                        <Select
                            onChange={changeFourthIndex}
                            value={sortingBy[3]}
                            >
                            <MenuItem value="None"><em>None</em></MenuItem>
                            {
                                sortCriteria.map((criteria, i) => {
                                    return(<MenuItem key={i} value={criteria}>{criteria}</MenuItem>)
                                })
                            }
                        </Select>
                        {sortingBy[3] == "None" ? 
                            "" 
                            :
                            <FormControlLabel control={<Checkbox value={sortingDirectionAscending[3]} onChange={changeFourthDirection}/>} label="asc" />
                        }
                    </Grid>         
                    :
                    null
                }
            </Grid>
        </Box>
    )
}
