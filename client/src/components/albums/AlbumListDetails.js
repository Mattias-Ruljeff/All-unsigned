import React from 'react';
import axios from "axios"
import { useHistory } from 'react-router-dom';

// Handles the details of a specific task.
const AlbumListDetails = ({ band, removeBandFromList }) => {
    let history = useHistory();

    const handleInfo = () => {
        history.push(`/bands/info/${band.id}`)
        console.log('Info => id: ' + band.id)
    } 

    // The HTML that is being rendered.
    return (
        <div>
            <div>
                <div>Band: {band.name}</div>
            </div>

            <button className="info-btn" onClick={handleInfo} >
            Info
            </button>

        </div>
    );
}

// Exports.
export default AlbumListDetails;
