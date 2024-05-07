import React from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function JoinRoom(){
    return(
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h3" component="h4">
                    Join A Room
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    error="error"
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={ }
                    helperText = { }
                    variant="outlined"
                />
            </Grid>
        </Grid>
    );  
}