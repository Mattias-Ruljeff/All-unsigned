import React from 'react';

const SongForm = ({string, handleSubmit, newSongDetail, handleSongChange, editSong, id}) => {
    return (
        <div className="newSongWindow">
            <h3>{!string ? "Add new song" : string}</h3>
            <form name="newSong" onSubmit={(e)=>handleSubmit(e, editSong, id)} >
                <input
                    type="text"
                    name="name"
                    placeholder="Enter song title..."
                    defaultValue={newSongDetail.name}
                    className="form-task"
                    required
                    onChange={handleSongChange}
                />

                <input
                    type="number"
                    name="length"
                    placeholder="Enter song length..."
                    className="form-task"
                    required
                    defaultValue= {newSongDetail.length}
                    onChange={handleSongChange}
                />

                <input
                    type="submit"
                    value="Submit"
                    className="task-btn"
                />
            </form>
        </div>
    );
}

export default SongForm;