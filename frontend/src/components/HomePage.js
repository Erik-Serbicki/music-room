import React from "react";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



export default function HomePage(){
    const router = createBrowserRouter([
        {
            path: "/",
            element: <p>This is the home page</p>,
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
    ])

    return(
        <RouterProvider router={router} />
    );
}