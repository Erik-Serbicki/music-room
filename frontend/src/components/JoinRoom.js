import React from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function JoinRoom(){

    // Create state and setState for the data we want to send
    const [state, setState] = useState({
        roomCode: "", 
        error: ""
    });

    function handleTextFieldChange(e){
        setState(prevState => ({
            ...prevState, roomCode: e.target.value,
        }));
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
                    error={state.error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={ state.roomCode }
                    helperText = { state.error }
                    variant="outlined"
                    onChange = {handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} >
                <Button color="primary" variant="outlined" onClick>Join Room</Button>
            </Grid>
            <Grid item xs={12} >
                <Button color="secondary" variant="outlined" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    );  
}