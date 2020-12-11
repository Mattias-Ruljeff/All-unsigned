import React from 'react';
import axios from "axios"
import { useHistory } from 'react-router-dom';

// Handles the details of a specific task.
const SongDetails = ({ song, index, removeBandFromList }) => {
    let history = useHistory();

    const handleInfo = () => {
        history.push(`/bands/info/${song.id}`)
        console.log('Info => id: ' + song.id)
    } 

    // The HTML that is being rendered.
    return (
        <tr>
            <td>{index + 1}.</td>
            <td>{song.name}</td>
            <td>{song.length}</td>
        </tr>
    );
}

// Exports.
export default SongDetails;
