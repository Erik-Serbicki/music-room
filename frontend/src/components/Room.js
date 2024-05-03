import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Room(){
    const [state, setState] = useState({
        guestCanPause: false, 
        votesToSkip: 1,
        isHost: false
    });

    let { roomCode } = useParams();

    useEffect(() => {
        getRoomDetails();
    }, []);

    function getRoomDetails(){
        fetch(`/api/get-room?code=${roomCode}`).then((response)=>
            response.json()
        ).then((data) => {
            setState(prevState => ({ 
                ...prevState,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            }));
        });
    }

    return (
        <div>
            <h2>{roomCode}</h2>
            <p>Votes: {state.votesToSkip}</p>
            <p>Guest can pause: {state.guestCanPause.toString()}</p>
            <p>Host: {state.isHost.toString()}</p>
        </div>
    );
}