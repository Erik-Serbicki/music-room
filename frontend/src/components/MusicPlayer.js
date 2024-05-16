import React from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress} from "@mui/material";
import { PlayArrow, SkipNext, Pause} from "@mui/icons-material";

export default function MusicPlayer(props){

    let songProgress = (props.time / props.duration) * 100

    return(
        <Card>
            <Grid container spacing={2} align='center'>
                <Grid item xs={4}>
                    <img src={props.img_url} height="100%" width="100%"/>
                </Grid>
                <Grid item xs={8}>
                    <Typography component='h5' variant='h5'>{props.title}</Typography>
                    <Typography color='textSecondary' variant='subtitle1'>{props.artist}</Typography>
                    <div>
                        <IconButton>{props.is_playing ? <Pause /> : <PlayArrow />}</IconButton>
                        <IconButton><SkipNext /></IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    );
}