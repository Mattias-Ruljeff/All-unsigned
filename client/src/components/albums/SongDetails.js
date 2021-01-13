import React from 'react';

// Handles the details of a specific task.
const SongDetails = ({ song, index, removeSongFromList, addSongForm }) => {

    // The HTML that is being rendered
    return (
        <tr>
            <td>{index + 1}.</td>
            <td>{song.name}</td>
            <td style={{textAlign: 'center'}} >{song.length}</td>
            <td>
                <button className="info-btn" onClick={() => addSongForm(song, "Edit song", true, song.id)} >
                    Edit
                </button>
                
                <button className="info-btn" onClick={() => removeSongFromList(song.id)} >
                    Delete
                </button>
            </td>
        </tr>
    );
}

// Exports
export default SongDetails;
