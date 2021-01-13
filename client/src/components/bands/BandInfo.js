import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Components
import AlbumList from '../albums/AlbumList';
import BandForm from "./BandForm"


const BandInfo = (props) => {
    let history = useHistory();
    const band = props.match.params.id
    let newBandName = ""

    const [bands, setBands] = useState([]);
    const [form, setForm] = useState()

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

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post(`/bands/edit/${band}`, {bands, newBandName})
        axios.get(`/bands/getband/${band}`)
        .then(res => {
            setBands(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setBands([])
            history.push("/404")
        })
        setForm("")
    }
    
    const handleChange = (event) => {
        newBandName = event.target.value
    }

    const editButtonClicked = () => {
        if (!form) {
            setForm(
                <BandForm 
                    bands={bands[0].name}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            )
        } else {
            setForm("")
        }
    }

    // Removes the task with the specific id
    const handleRemove = () => {
        axios.delete(`/bands/delete/${band}`)
        history.push("/bands")
    }

    let displayLoadingOrBand

    if (Object.keys(bands).length === 0) {
        displayLoadingOrBand = <p>Loading band...</p>
    } else {
        displayLoadingOrBand = <h1 key={bands[0].id}> {newBandName !== "" ? newBandName : bands[0].name} </h1>
    }

    return (
        <div className="bandInfo">

            <div className="bandName">
                {displayLoadingOrBand}

                <div>
                    <button className="edit-btn" onClick={editButtonClicked } >
                        Edit
                    </button>

                    <button className="remove-btn" onClick={handleRemove} >
                        Remove
                    </button>

                    <button className="back-btn" onClick={() => {history.push('/bands')}}>
                        Go back
                    </button>
                </div>
                {form}
            </div>
            <AlbumList bandId={band} />
        </div>
    )
}

// Export
export default BandInfo;