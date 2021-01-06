import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Components
import AlbumList from '../albums/AlbumList';


const BandInfo = (props) => {
    let history = useHistory();
    const band = props.match.params.id

    const [bands, setBands] = useState([]);

    useEffect(() => {
        axios.get(`/bands/getband/${band}`)
        .then(res => {
            setBands(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setBands([])
            history.push("/404")
        })
    }, [])

    // Removes the task with the specific id
    const handleRemove = () => {
        axios.delete(`/bands/delete/${band}`)
        console.log('Delete => id: ' + band)
        history.push("/bands")
    }

    let displayLoadingOrBand

    if (Object.keys(bands).length === 0) {
        displayLoadingOrBand = <p>Loading band...</p>
    } else {
        bands.map(band => {
            return displayLoadingOrBand = <h1 key={band.id}> {band.name} </h1>
        })
    }

    return (
        <div className="bandInfo">

            <div className="bandName">
                {displayLoadingOrBand}

                <div>
                    <button className="edit-btn" onClick={() => console.log("Edit => id: " + band.id)} >
                        Edit
                    </button>

                    <button className="remove-btn" onClick={handleRemove} >
                        Remove
                    </button>

                    <button className="back-btn" onClick={() => {history.push('/bands')}}>
                        Go back
                    </button>
                </div>
            </div>
            <AlbumList bandId={band} />
        </div>
    )
}

// Export
export default BandInfo;