import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useHistory } from 'react-router-dom';

//Components
import SongDetails from "./SongDetails"

// Handles the details of a specific task.
const AlbumListDetails = ({ album, albumType, removeAlbumFromList, bandId }) => {
    let history = useHistory();
    let newSongDetail = {}
    let albumTypeHere = ""

    const [form, setForm] = useState();
    const [songs, setSongs] = useState([]);

    console.log(albumType)

    useEffect(() => {
    axios.get(`/albums/songs`)
        .then(res => {
            setSongs(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setSongs([])
            history.push("/404")
        })
    }, [])

    const handleInfo = () => {
        console.log('Info => id: ' + album.id)
    }

    // Handles the changes in the task.
    const handleChange = (event) => {
        newSongDetail = {
            ...newSongDetail,
            [event.target.name]: event.target.value,
        }
    }

    // Handles the data when submiting.
    const handleSubmit = (event) => {
        event.preventDefault();

        newSongDetail = {...newSongDetail, albumId:album.id, bandId}
        console.log("-----")
        console.log(newSongDetail)
        console.log("-----")
        console.log(songs)
        console.log("-----")
        setSongs(...songs, newSongDetail)
        axios.post("/albums/songs/add", newSongDetail)
    }

    const addSongForm = () => {
        setForm(
            <>
            <h3>Add new song:</h3>
            <form name="newSong" onSubmit={handleSubmit} >

                <input
                    type="text"
                    name="name"
                    placeholder="Enter song title..."
                    className="form-task"
                    required
                    value={newSongDetail.name}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="length"
                    placeholder="Enter song length..."
                    className="form-task"
                    required
                    value= {newSongDetail.length}
                    onChange={handleChange}
                />

                <input
                    type="submit"
                    value="Submit"
                    className="task-btn"
                />

            </form>
            </>
        )
    }

    if (albumType) {
        albumType.forEach(albumType => {
            if (albumType.id === album.album_type_id) {
                albumTypeHere = albumType.type
            }
        });
    }

    // The HTML that is being rendered.
    return (
        <div>
            <div>
                <div><b>Name:</b> {album.name}</div>
                <div><b>Type:</b> {albumTypeHere}</div>
                <div><b>Genre:</b> {album.genre}</div>
            </div>

                <button className="info-btn" onClick={addSongForm} >
                    Edit album
                </button>

                {form}

            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Length</th>
                        </tr>

                        {
                            songs !== null ? songs.map((song, index) => {
                                return (
                                    <SongDetails
                                        key={song.id}
                                        index={index}
                                        song={song}
                                        removeAlbumFromList={removeAlbumFromList}
                                    />
                                )
                            }) : ""
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

// Exports.
export default AlbumListDetails;