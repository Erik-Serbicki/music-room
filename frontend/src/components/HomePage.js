import React from "react";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import { createBrowserRouter, RouterProvider, Link, redirect} from "react-router-dom";
import { Button, Grid, Typography, ButtonGroup} from "@mui/material";

export default function HomePage(){

    const router = createBrowserRouter([
        {
            path: "/",
            element: renderHomeScreen(),
            loader: async () => {
                const code = await fetch('/api/user-in-room').then((response) => response.json().then((data) => data.code));
                console.log(code);
                return code ? (redirect(`/room/${code}`)) : renderHomeScreen();
            }
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
            loader: async ({params}) => {
                const response = await fetch(`/api/get-room?code=${params.roomCode}`).then((response) => response.status);
                if (response != 200 ){
                    return redirect('/');
                }
                else{
                    return null;
                }
            }
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
                    <Button color="primary" variant="outlined" to="/create" component={ Link }>
                        Create a Room
                    </Button>
                    </Grid>
                <Grid item xs={12}>
                    <Button color="secondary" variant="outlined" to="/join" component={ Link }>
                        Join a Room
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return(
        <RouterProvider router={router} />
    );
}