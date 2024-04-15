import React from 'react'

export default function Room(){
    const [state, setState] = useState({
        guestCanPause: true, 
        votesToSkip: 1,
        isHost: false
    });
}