import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Room(){
    const [state, setState] = useState({
        guestCanPause: false, 
        votesToSkip: 1,
        isHost: false
    });

    let { roomCode } = useParams();

    return (
        <div>
            <h2>{roomCode}</h2>
            <p>Votes: {state.votesToSkip}</p>
            <p>Guest can pause: {state.guestCanPause.toString()}</p>
            <p>Host: {state.isHost.toString()}</p>
        </div>
    );
}