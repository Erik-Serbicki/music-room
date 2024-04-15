import React from "react";
import HomePage from "./HomePage";
import { createRoot } from "react-dom/client";

export default function App()
{
    return ( 
        <div>
            <HomePage />
        </div>   
    );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(< App tab="home"/>);