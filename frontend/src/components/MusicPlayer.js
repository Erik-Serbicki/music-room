import React from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress} from "@mui/material";
import { PlayArrow, SkipNext, Pause, BorderColor} from "@mui/icons-material";

export default function MusicPlayer(props){

    let songProgress = (props.time / props.duration) * 100

    function pauseSong(){
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        };
        fetch('/spotify/pause', requestOptions);
    }

    function playSong(){
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        };
        fetch('/spotify/play', requestOptions);
    }

    function skipSong(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'}
        };
        fetch('/spotify/skip', requestOptions)
    }

    function renderMusicPlayerSong(){
        return (
            <Card>
            <Grid container spacing={3} align='center'>
                <Grid item xs={4}>
                    <img src={props.img_url} height="100%" width="100%"/>
                </Grid>
                <Grid item xs={8} align='center'>
                    <Typography component='h5' variant='h5'>{props.title}</Typography>
                    <Typography color='textSecondary' variant='subtitle1'>{props.artist}</Typography>
                    <div>
                        <IconButton 
                            onClick={()=>{props.is_playing ? pauseSong() : playSong() }}>
                            {props.is_playing ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton onClick={skipSong}>
                            <SkipNext /> {props.votes} / {props.votes_required}
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
        );
    }

    function renderMusicPlayerNoSong(){
        return (
        <Card >
            <Grid container spacing={3} align='center' >
                <Grid item xs={12}>
                    <Typography component='h5' variant='h5'>No Song Found</Typography>
                    <Typography color='textSecondary' variant='subtitle1'>No Artist Found</Typography>
                    <div>
                        <IconButton >
                            <PlayArrow />
                        </IconButton>
                        <IconButton >
                            <SkipNext /> 0/0
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={100} />
        </Card>
        );
    }

    return(
        <div>
            {props.spotifyConnected ? renderMusicPlayerSong() : renderMusicPlayerNoSong()}
        </div>
    );
}