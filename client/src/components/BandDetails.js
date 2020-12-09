import React from 'react';
import axios from "axios"

// Handles the details of a specific task.
const BandDetails = ({band}) => {

    // Removes the task with the specific id.
    const handleRemove = () => {
        axios.delete("/bands/delete/:band.id")
        console.log('Ta bort mig')
    }    

    // The HTML that is being rendered.
    return (
        <div>
            <div>
                <div>Band: {band.name}</div>
            </div>

            <button className="edit-btn" onClick={() => console.log("edit" + band.id)} >
            Edit
            </button>

            <button className="remove-btn" onClick={handleRemove} >
            Remove
            </button>

        </div>
    );
}

// Exports.
export default BandDetails;
