import React from 'react'
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Grid, Button, Typography } from "@mui/material";

export default function Room(){
    const [state, setState] = useState({
        guestCanPause: false, 
        votesToSkip: 1,
        isHost: false
    });

    let { roomCode } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getRoomDetails();
    }, []);

    function getRoomDetails(){
        fetch(`/api/get-room?code=${roomCode}`).then((response)=>
            response.json()
        ).then((data) => {
            setState(prevState => ({ 
                ...prevState,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            }));
        });
    }

    function goHome(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        }
        fetch('/api/leave-room', requestOptions).then((_response) => navigate('/'))
    }

    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4"> Room: {roomCode}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button color='secondary' variant='outlined' onClick={goHome}> Home </Button>
            </Grid>
        </Grid>
    );
}