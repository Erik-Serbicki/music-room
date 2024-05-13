import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@mui/material";

 export default function CreateRoom({votesToSkip=1, guestCanPause=true, update=false, roomCode=null, updateCallback= ()=>{}}){
    
    // Create state and setState for the data we want to send
    const [state, setState] = useState({
        guestCanPause: guestCanPause,
        votesToSkip: votesToSkip,
    });

    const navigate = useNavigate();

    // Call this function when we change the TextField
    function handleVotesChange(e){
        setState(prevState => ({
            ...prevState, votesToSkip: e.target.value,
        }));
    };

    // Call this function when we change the RadioGroup
    function handleGuestChange(e){
        setState(prevState => ({
            ...prevState, guestCanPause: e.target.value === "true" ? true : false,
        }));
    };

    // When we click the CreateRoom button, send data to api/create_room, and print out the response
    function handleRoomButtonPressed(){
        // Set the options for the request: method, content type, and actual data in the body
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                votes_to_skip: state.votesToSkip,
                guest_can_pause: state.guestCanPause,
            }),
        };

        // fetch to the endpoint we want, take the response we get, and navigate to room page
        fetch("/api/create-room", requestOptions).then( 
            (response) => response.json()).then(
            (data) =>  navigate(`/room/${data.code}`))
    }

    return (
        <Grid container rowSpacing={3} >
            <Grid item xs={12} align={"center"} >
                <Typography component="h2" variant="h2">
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center" >
                <FormControl component="fieldset">
                    <FormHelperText>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup row defaultValue={true} onChange={handleGuestChange}>
                        <FormControlLabel value={true} control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom"/>
                        <FormControlLabel value={false} control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom"/>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" >
                <FormControl>
                    <TextField 
                        required={true} 
                        type="number" 
                        onChange={handleVotesChange}
                        defaultValue={defaultVotes} 
                        inputProps={{
                            min:1, style:{textAlign: "center"}
                            }
                        }
                    />
                    <FormHelperText component="span"><div align="center">Votes Required to Skip</div></FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" >
                <Button color="primary" variant="outlined" onClick={handleRoomButtonPressed}>Create a Room</Button>
            </Grid>
            <Grid item xs={12} align="center" >
                <Button color="secondary" variant="outlined" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    );
}