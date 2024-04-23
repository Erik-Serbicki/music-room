import React from "react";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function HomePage(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<p>This is the home page</p>} />
                <Route path="/join" element={<JoinRoom />} />
                <Route path="/create" element={<CreateRoom />} />
                <Route path='room/:roomCode' element={<Room roomCode={code}/>} />
            </Routes>
        </Router>
    );
}