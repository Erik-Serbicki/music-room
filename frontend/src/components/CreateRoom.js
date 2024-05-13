import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { AlertTitle, Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Collapse, Alert } from "@mui/material";

 export default function CreateRoom({votesToSkip=1, guestCanPause=true, update=false, roomCode=null, updateCallback= ()=>{}}){
    
    // Create state and setState for the data we want to send
    const [state, setState] = useState({
        guestCanPause: guestCanPause,
        votesToSkip: votesToSkip,
        saveMsg: '',
        saveSuccess: true,
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

    function handleSaveButtonPressed(){
        // Set the options for the request: method, content type, and actual data in the body
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                guest_can_pause: state.guestCanPause,
                votes_to_skip: state.votesToSkip,
                code: roomCode,
            }),
        };

        // fetch to the endpoint we want, take the response we get, and navigate to room page
        fetch("/api/update-room", requestOptions).then( 
            (response) => {
                if (response.ok) {
                    setState(prevState => ({
                        ...prevState, saveMsg: "Settings Saved!",
                    }));
                } else {
                    setState(prevState => ({
                        ...prevState, saveMsg: `${response.status}: ${response.statusText}`, saveSuccess: false,
                    }));
                }
                updateCallback();
            });
    }

    const title = update ? "Settings" : "Create a Room";

    function renderCreateButtons(){
        return(
            <Grid item xs={12} align="center" >
                <Button color="primary" variant="outlined" onClick={handleRoomButtonPressed}>Create a Room</Button>
                <Button color="secondary" variant="outlined" to="/" component={Link}>Back</Button>
            </Grid>
        );
    }

    function renderSettingsButtons(){
        return(
            <Grid item xs={12} align="center" >
                <Button color="primary" variant="outlined" onClick={handleSaveButtonPressed}>Save</Button>
            </Grid>
        );
    }

    return (
        <Grid container rowSpacing={3} >
            <Grid item xs={12}>
                <Collapse in={state.saveMsg != ''}>
                    { state.saveSuccess ? (
                        <Alert 
                            severity="success" 
                            variant="outlined" 
                            onClose={() => {
                                setState(prevState => ({
                                    ...prevState, saveMsg: '', saveSuccess: true,
                                }));
                        }}
                        >
                            <AlertTitle>Success</AlertTitle>
                            {state.saveMsg}
                        </Alert>
                    ) : (
                        <Alert
                            severity="error"
                            variant="outlined"
                            onClose={() => {
                                setState(prevState => ({
                                    ...prevState, saveMsg: '', saveSuccess: true,
                                }));
                        }}
                        >
                            <AlertTitle>Error</AlertTitle>
                            {state.saveMsg}
                        </Alert>
                )}
                </Collapse>
            </Grid>
            <Grid item xs={12} align={"center"} >
                <Typography component="h2" variant="h2">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center" >
                <FormControl component="fieldset">
                    <FormHelperText>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup row defaultValue={guestCanPause} onChange={handleGuestChange}>
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
                        defaultValue={votesToSkip} 
                        inputProps={{
                            min:1, style:{textAlign: "center"}
                            }
                        }
                    />
                    <FormHelperText component="span"><div align="center">Votes Required to Skip</div></FormHelperText>
                </FormControl>
            </Grid>
            { update ? renderSettingsButtons() : renderCreateButtons() }
        </Grid>
    );
}