import React from 'react'

export default function Room({roomCode}){
    const [state, setState] = useState({
        guestCanPause: false, 
        votesToSkip: 1,
        isHost: false
    });
    code = roomCode;

    return (
        <div>
            <p>Votes: {state.votesToSkip}</p>
            <p>Guest can pause: {state.guestCanPause}</p>
            <p>Host: {state.isHost}</p>
        </div>
    );
}