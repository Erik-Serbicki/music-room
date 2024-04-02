import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import { useState } from "react";


 export default function CreateRoom(){
    const defaultVotes = 1;
    
    const [state, setState] = useState({
        guestCanPause: true, 
        votesToSkip: defaultVotes
    });

    function handleVotesChange(e){
        setState(prevState => ({
            ...prevState, votesToSkip: e.target.value,
        }));
    };

    function handleGuestChange(e){
        setState(prevState => ({
            ...prevState, guestCanPause: e.target.value === "true" ? true : false,
        }));
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h2" variant="h2">
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
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
            <Grid item xs={12} align="center">
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
            <Grid item xs={12} align="center">
                <Button color="primary" variant="outlined">Create a Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="outlined" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    );
}