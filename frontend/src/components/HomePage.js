import React from "react";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import { createBrowserRouter, RouterProvider, Link} from "react-router-dom";
import { Button, Grid, Typography, ButtonGroup} from "@mui/material";

export default function HomePage(){
    const router = createBrowserRouter([
        {
            path: "/",
            element: renderHomeScreen(),
        },
        {
            path: "/create",
            element: <CreateRoom />,
        },
        {
            path: "/join",
            element: <JoinRoom />,
        },
        {
            path: "/room/:roomCode",
            element: <Room />,
        },
    ]);

    

    function renderHomeScreen(){
        return (
            <Grid container spacing={3} align="center">
                <Grid item xs={12}>
                    <Typography variant="h2" component="h2">
                        Listen Together
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup disableElevation variant="outlined" color="primary">
                        <Button color="primary" to="/create" component={ Link }>
                            Create a Room
                        </Button>
                        <Button color="secondary" to="/join" component={ Link }>
                            Join a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    return(
        <RouterProvider router={router} />
    );
}