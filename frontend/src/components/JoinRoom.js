import React from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function JoinRoom(){

    // Create state and setState for the data we want to send
    const [state, setState] = useState({
        roomCode: "", 
        errormsg: "",
        error: false
    });

    const navigate = useNavigate();

    function handleTextFieldChange(e){
        setState(prevState => ({
            ...prevState, roomCode: e.target.value,
        }));
    }

    function roomButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({  
                code: state.roomCode.toUpperCase()
            })
        };

        fetch('/api/join-room', requestOptions).then((response) => {
            if (response.ok){
                navigate(`/room/${state.roomCode.toUpperCase()}`)
            } else{
                setState(prevState => ({
                    ...prevState, error: true, errormsg: "Room Not Found"
                }));
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    return(
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h3" component="h4">
                    Join A Room
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    error = { state.error }
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={ state.roomCode }
                    helperText = { state.errormsg }
                    variant="outlined"
                    onChange = {handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} >
                <Button color="primary" variant="outlined" onClick={roomButtonPressed}>Join Room</Button>
            </Grid>
            <Grid item xs={12} >
                <Button color="secondary" variant="outlined" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    );  
}