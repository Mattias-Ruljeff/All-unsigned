import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import SongDetails from "./SongDetails"
import SongForm from "./SongForm"
import AlbumForm from "./AlbumForm"

// Handles the details of a specific task.
const AlbumListDetails = ({ album, albumType, removeAlbumFromList, bandId }) => {
    let history = useHistory();
    let newSongDetail = {}
    let albumTypeHere = ""
    let newAlbumDetail = {}
    
    const [songForm, setSongForm] = useState();
    const [albumForm, setAlbumForm] = useState();
    const [songs, setSongs] = useState([]);
    const [modifiedAlbum, setModifiedAlbum] = useState([]);
    
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
            setModifiedAlbum(res.data.result[0])
        })
        .catch(error => {
            console.log(error)
            setModifiedAlbum([])
            history.push("/404")
        })

    }, [])

    const handleFavourite = () => {
        axios.post(`/albums/favourite/${album.id}`)
        toast.success('You liked the album!', {
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

    const removeSongFromList = (songToRemove) => {
        axios.delete(`/albums/song/delete/${songToRemove}`)
        const removeSong = songs.filter(song => song.id !== songToRemove)
        setSongs(removeSong)
    }

    // Handles the changes in the task.
    const handleAlbumChange = (event) => {
        newAlbumDetail = {
            ...modifiedAlbum,
            [event.target.name]: event.target.value
        }
    }

    // Handles the data when submiting.
    const handleSubmit = (event, editSong, id) => {
        event.preventDefault();

        newSongDetail = {...newSongDetail, albumId:album.id}
        axios.get(`/albums/songs/${album.id}`)
        .then(res => {
            setSongs(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setSongs([])
            history.push("/404")
        })

        if (editSong) {
            axios.post(`/albums/songs/edit/${id}`, newSongDetail)
        } else {
            axios.post("/albums/songs/add", newSongDetail)
        }

        setSongForm("")
    }

    const handleAlbumChangeSubmit = (event) => {
        event.preventDefault();

        axios.post(`/albums/edit/${album.id}`, newAlbumDetail)
        setSongForm("")

        axios.get(`/albums/songs/${album.id}`)
        .then(res => {
            setSongs(res.data.result)
        })
        .catch(error => {
            console.log(error)
            setSongs([])
            history.push("/404")
        })
    }

    const addSongForm = (event, string, editSong, id) => {
        if (!songForm) {
            if (editSong) {
                axios.get(`/albums/getonesong/${id}`)
                .then(res => {
                    newSongDetail = res.data.result[0]
                    setSongForm(
                        <SongForm
                            handleSubmit={handleSubmit}
                            event={event} 
                            string={string} 
                            newSongDetail={newSongDetail} 
                            handleSongChange={handleSongChange} 
                            editSong={true} 
                            id={id}
                        />
                    )
                })
                .catch(error => {
                    console.log(error)
                })
            
            } else {
                setSongForm(
                    <SongForm 
                        handleSubmit={handleSubmit} 
                        event={event} 
                        string={string} 
                        newSongDetail={newSongDetail} 
                        handleSongChange={handleSongChange} 
                        editSong={false} 
                        id={null}
                    />
                )
            }

        } else {
            setSongForm("")
        }
    }

    const editAlbumForm = (e) => {
        if (!albumForm) {
            setAlbumForm(
                <AlbumForm 
                    handleAlbumChangeSubmit={handleAlbumChangeSubmit}
                    modifiedAlbum={modifiedAlbum} 
                    handleAlbumChange={handleAlbumChange}
                    albumType={albumType}
                    newAlbumDetail={newAlbumDetail}
                />
            )
        } else { setAlbumForm("")}
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
                    removeSongFromList={removeSongFromList}
                    addSongForm={addSongForm}
                />
            )
        })
    }

    // The HTML that is being rendered.
    return (
        <div className="albumCard">
            <div className="albumInfoWindow">

                <button className="favourite-btn-album" onClick={handleFavourite} >
                    &hearts;
                </button>

                <div className="albumnInfo">
                    <p><b>Name:</b> {album.name}</p>
                    <p><b>Type:</b> {albumTypeHere}</p>
                    <p><b>Genre:</b> {album.genre}</p>
                    <p><b>Release date:</b> {album.release_date.substring(0,10)}</p>

                    <div className="albumInfoButtons">
                        <button className="info-btn" onClick={() => editAlbumForm()} >
                            Edit album
                        </button>

                        <button className="info-btn" onClick={() => removeAlbumFromList(album.id)} >
                            Delete album
                        </button>
                    </div>

                    {albumForm}

                </div>
            </div>

            <div className="songTable">
                <div className="addNewSong">
                    <h3>Songs</h3>
                    <button className="info-btn" onClick={addSongForm} >
                                Add new song
                    </button>
                </div>

                {songForm}

                <table>
                    <tbody>
                        <tr>
                            <th style={{width:"20px"}}>No.</th>
                            <th>Title</th>
                            <th style={{width:"25px"}}>Length</th>
                            <th style={{width:"140px"}}>Edit/delete</th>
                        </tr>

                        {songsList}

                    </tbody>
                </table>
            </div>

            <ToastContainer />

        </div>
    );
}

// Exports
export default AlbumListDetails;