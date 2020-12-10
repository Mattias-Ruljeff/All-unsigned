import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';


// Components
import AlbumListDetails from './AlbumListDetails';

const AlbumList = ({bandId}) => {
		const history = useHistory()

		let albumDetails = {}

    const [albums, setAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState({type:"Album", date: new Date("2015-11-11")});
		const [albumType, setAlbumType] = useState();
		const [form, setForm] = useState();
		
    useEffect(() => {
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
				type: document.forms["hej"]["albumtype"].value
			}
    }
  

    // Handles the data when submiting.
    const handleSubmit = (event) => {
			event.preventDefault();
			albumDetails = {...albumDetails, id:bandId}
			axios.post("/albums/add", albumDetails)
    }
  
    
    const addAlbumForm = () => {
			setForm(
        <form name="hej" onSubmit={handleSubmit} >

          <input
            type="text"
            name="name"
            placeholder="Enter album name..."
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
          <select id="albumtype" name="type" onChange={handleChange} required>
            {albumType.map((albumtype, index) => {
							const {type} = albumtype
							return <option key={index} value={type}>{type}</option>
						})}
					</select>

          <input
            type="date"
            name="date"
            className="form-date"
            required
            value={newAlbum.date}
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
    
  return (
    <div className="bandList">
      <ul>
          <h2>Albums</h2>
          <button onClick= {addAlbumForm}>Add new album</button>
          {form}
				{ 
					albums.map(album => {
          return ( <AlbumListDetails key={album.id} album={album} removeAlbumFromList={removeAlbumFromList} />)
          })
        }
      </ul>
    </div>
  )
}

export default AlbumList;

