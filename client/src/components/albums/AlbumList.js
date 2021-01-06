import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';


// Components
import AlbumListDetails from './AlbumListDetails';

const AlbumList = ({ bandId }) => {
    const history = useHistory()

    let albumDetails = {}

    const [albums, setAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState({ type:"Album" });
    const [albumType, setAlbumType] = useState();
    const [form, setForm] = useState();
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        axios.get(`/albums`)
        .then(res => {
            setAlbums(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setAlbums([])
            history.push("/404")
        })

        axios.get(`/albums/type`)
        .then(res => {
            setAlbumType(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setAlbumType([])
            history.push("/404")
        })
    }, [])

    const removeAlbumFromList = (albumToRemove) => {
        const removeAlbum = albums.filter(album => album.id !== albumToRemove)
        setAlbums(removeAlbum)
    }

    // Handles the changes in the task.
    const handleChange = (event) => {
        albumDetails = {
            ...albumDetails,
            [event.target.name]: event.target.value,
            type: document.forms["newAlbum"]["albumtype"].value
        }
    }

    // Handles the data when submiting.
    const handleSubmit = (event) => {
        event.preventDefault();

        albumDetails = { ...albumDetails, id:bandId }
        axios.post("/albums/add", albumDetails)
        axios.get(`/albums`)
        .then(res => {
            setAlbums(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setAlbums([])
            history.push("/404")
        })
        setForm("")
    }

    const addAlbumForm = () => {
        setForm(
            <form name="newAlbum" onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter album..."
                    className="form-task"
                    required
                    value={albums.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="genre"
                    placeholder="Enter genre..."
                    className="form-task"
                    required
                    value={albums.genre}
                    onChange={handleChange}
                />

                <label htmlFor="albumtype">Choose album type</label>
                <select
                    id="albumtype"
                    name="type" 
                    onChange={handleChange} 
                    required 
                >
                    {albumType.map((albumtype, index) => {
                        const {id,type} = albumtype
                        return <option key={index} value={id}>{type}</option>
                    })}
                </select>

                <input
                    type="date"
                    name="date"
                    className="form-date"
                    required
                    value={albumDetails.date}
                    onChange={handleChange}
                />

                <input
                    type="submit"
                    value="Submit"
                    className="task-btn"
                />

            </form>
        )
    }

    let list
    if (albums) {
        list = albums.map(album => {
            if (parseInt(bandId) === album.band_id) {
                return (
                    <AlbumListDetails
                        key={album.id}
                        album={album}
                        removeAlbumFromList={removeAlbumFromList}
                        bandId={bandId}
                        albumType={albumType}
                    />
                ) 
            } else {
                return ""
            }
        })
    }

    return (
        <div className="albumList">
            <div className="newAlbum">
            <h2>Albums</h2>
            <button onClick={addAlbumForm}>Add new album</button>
                {form}
            </div>
            <ul>
                {list}
            </ul>
        </div>
    )
}

export default AlbumList;