import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import SongDetails from "./SongDetails"

// Handles the details of a specific task.
const AlbumListDetails = ({ album, albumType, removeAlbumFromList, bandId }) => {
    let history = useHistory();
    let newSongDetail = {}
    let albumTypeHere = ""
    let newAlbumDetail = {}
    
    const [form, setForm] = useState();
    const [albumForm, setAlbumForm] = useState();
    const [songs, setSongs] = useState([]);
    const [modifiedAlbum, setModifiedAlbum] = useState([]);
    const [genreName, setNewGenreName] = useState("");
    const [name, setNewName] = useState("");
    
    useEffect(() => {
        
    axios.get(`/albums/songs/${album.id}`)
        .then(res => {
            setSongs(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setSongs([])
            history.push("/404")
        })
        axios.get(`/albums/getalbum/${album.id}`)
        .then(res => {
            console.log("----------------------------")
            console.log(res.data.result[0])
            newAlbumDetail = res.data.result[0]
        })
        .catch(error => {
            console.log(error)
            setModifiedAlbum([])
            history.push("/404")
        })
    }, [])

    const handleInfo = () => {
        console.log('Info => id: ' + album.id)
    }

    const handleFavourite = () => {
        axios.post(`/albums/favourite/${album.id}`)
        toast.success('🦄 New favourite album added!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 


    // Handles the changes in the task.
    const handleSongChange = (event) => {
        newSongDetail = {
            ...newSongDetail,
            [event.target.name]: event.target.value
        }
    }
    // Handles the changes in the task.
    const handleAlbumChange = (event) => {
        newAlbumDetail = {
            ...newAlbumDetail,
            [event.target.name]: event.target.value
        }
    }

    // Handles the data when submiting.
    const handleSubmit = (event) => {
        event.preventDefault();

        newSongDetail = {...newSongDetail, albumId:album.id, bandId}
        // setSongs(...songs, newSongDetail)
        axios.get(`/albums/songs/${album.id}`)
        .then(res => {
            setSongs(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setSongs([])
            history.push("/404")
        })
        axios.post("/albums/songs/add", newSongDetail)
        setForm("")
    }

    const handleChangeSubmit = () => {
        // event.preventDefault();
        // console.log(genreName)
        // axios.put(`/albums/edit/${album.id}`, modifiedAlbum)
        // setForm("")
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
                    onChange={handleSongChange}
                />

                <input
                    type="number"
                    name="length"
                    placeholder="Enter song length..."
                    className="form-task"
                    required
                    value= {newSongDetail.length}
                    onChange={handleSongChange}
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

    const editAlbumForm = () => {
        setAlbumForm(
            <>
            <h3>Edit album</h3>
            <form name="editAlbum" onSubmit={handleChangeSubmit} >

            <input
                type="text"
                name="name"
                placeholder="Enter album name..."
                className="form-task"
                required
                value={modifiedAlbum.name}
                onChange={handleAlbumChange}
            
            />
                <input
                    type="text"
                    name="genre"
                    placeholder="Enter genre..."
                    className="form-task"
                    required
                    value={modifiedAlbum.genre}
                    onChange={handleAlbumChange}
                />

                <label htmlFor="albumtype">Choose album type</label>
                <select
                    id="albumtype"
                    name="type" 
                    onChange={handleAlbumChange} 
                    required 
                >
                    {albumType.map((albumtype, index) => {
                        const {id,type} = albumtype
                        return <option key={index} value={type}>{type}</option>
                    })}
                </select>

                <input
                    type="date"
                    name="date"
                    className="form-date"
                    required
                    value={"2020-11-11"}
                    onChange={handleAlbumChange}
                />

                <input
                    type="submit"
                    value="Submit"
                    className="task-btn"
                    onClick={handleChangeSubmit}
                />

            </form>
            </>)
        
    }

    if (albumType) {
        albumType.forEach(albumType => {
            if (albumType.id === album.album_type_id) {
                albumTypeHere = albumType.type
            }
        });
    }

    let songsList
    if (songs) {
        songsList = songs.map((song, index) => {
            return (
                <SongDetails
                    key={song.id}
                    index={index}
                    song={song}
                    removeAlbumFromList={removeAlbumFromList}
                />
            )
        })
    }

    // The HTML that is being rendered.
    return (
        <div className="albumCard">
            <div className="albumInfo">
                <div>
                    <div><b>Name:</b> {album.name}</div>
                    <div><b>Type:</b> {albumTypeHere}</div>
                    <div><b>Genre:</b> {album.genre}</div>

                    <button key={album.id} className="info-btn" onClick={() => editAlbumForm()} >
                        Edit album
                    </button>
                    {albumForm}
                    {form}
                </div>

                <div className="albumButtons">
                    <button className="info-btn" onClick={addSongForm} >
                        Add song
                    </button>


                    <button className="favourite-btn" onClick={handleFavourite} >
                        &hearts;
                    </button>
                </div>
            </div>

            
                <table>
                    <tbody>
                        <tr>
                            <th style={{width:"20px"}}>No.</th>
                            <th>Title</th>
                            <th style={{width:"25px"}}>Length</th>
                        </tr>

                        {songsList}
                    </tbody>
                </table>

            <ToastContainer />
            
        </div>
    );
}

// Exports
export default AlbumListDetails;