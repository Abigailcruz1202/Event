import React, { useEffect } from 'react';
import axios from 'axios';

function FollowButton() {

    useEffect(() => {
        axios.post('/')
    }, [])
    return (
        <button>Seguir</button>
    )
}

export default FollowButton;
