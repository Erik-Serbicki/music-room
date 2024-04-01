import React from "react";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function HomePage(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<p>This is the test page</p>} />
                <Route path="/join" element={<JoinRoom />} />
                <Route path="/create" element={<CreateRoom />} />
            </Routes>
        </Router>
    );
}