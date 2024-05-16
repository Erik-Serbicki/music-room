import React from 'react'
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Grid, Button, Typography } from "@mui/material";
import CreateRoom from "./CreateRoom";

export default function Room(){
    const [state, setState] = useState({
        guestCanPause: false, 
        votesToSkip: 1,
        isHost: false,
        showSettings: false,
        spotifyAuthenticated: false,
        song: {},
    });

    let { roomCode } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getRoomDetails();
        getCurrentSong();
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
            if (data.is_host){
                authenticateSpotify();
            }
        });
    }

    function authenticateSpotify(){
        fetch('/spotify/is-authenticated').then((response) => response.json()).then((data) => {
            setState(prevState => ({
                ...prevState,
                spotifyAuthenticated: data.status,
            }));
            if (!data.status){
                fetch('/spotify/get-auth-url').then((response) => response.json()).then((data) => {
                    window.location.replace(data.url);
                });
            }
        });
    }

    let spotifyTimeout = setTimeout(getCurrentSong, 2000);
    function getCurrentSong(){
        fetch('/spotify/current-song').then((response) => {
            if(!response.ok){
                console.log(`${response.status}: ${response.statusText}`)
                clearTimeout(spotifyTimeout);
                return {}
            }
            else{
                return response.json()
            }
        }).then((data) => {
            setState(prevState => ({ 
                ...prevState,
                song: data,
            }));
            console.log(data)
            if (data == {}){
                clearTimeout(spotifyTimeout);
            }
        });
    }

    function goHome(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        }
        fetch('/api/leave-room', requestOptions).then((_response) => navigate('/'))
    }

    function updateShowSettings(value){
        setState(prevState => ({ 
            ...prevState,
            showSettings: value,
        }));
    }

    function renderSettingsButton(){
        return (
            <Grid item xs={12}>
                <Button variant='outlined' color="primary" onClick={() => updateShowSettings(true)}>Settings</Button>
            </Grid>
        );
    }

    function renderSettings(){
        return (
            <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <CreateRoom 
                    update={true} 
                    votesToSkip={state.votesToSkip} 
                    guestCanPause={state.guestCanPause} 
                    roomCode={roomCode}
                    updateCallback={getRoomDetails}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant='outlined' color="secondary" onClick={() => updateShowSettings(false)}>Close</Button>
            </Grid>
        </Grid>
        );
    }

    if (state.showSettings){
        return renderSettings()
    }

    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4"> Room: {roomCode}</Typography>
            </Grid>
            {state.isHost ? renderSettingsButton() : null}
            <Grid item xs={12}>
                <Button color='secondary' variant='outlined' onClick={goHome}> Home </Button>
            </Grid>
        </Grid>
    );
}