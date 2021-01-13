import React from 'react';

const AlbumForm = ({ handleAlbumChangeSubmit, modifiedAlbum, handleAlbumChange, albumType }) => {

    return (
        <div className="editAlbumWindow">
            <h3>Edit album</h3>
            <form name="editAlbum" onSubmit={handleAlbumChangeSubmit} >

                <input
                    type="text"
                    name="name"
                    placeholder="Enter album name..."
                    className="form-task"
                    defaultValue={modifiedAlbum.name}
                    required
                    onChange={handleAlbumChange}
                
                />

                <input
                    type="text"
                    name="genre"
                    placeholder="Enter genre..."
                    className="form-task"
                    required
                    defaultValue={modifiedAlbum.genre}
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
                        const {type} = albumtype
                        return <option key={index} value={type}>{type}</option>
                    })}
                    
                </select>

                <input
                    type="date"
                    name="date"
                    className="form-date"
                    required
                    value={modifiedAlbum.release_date.substring(0,10)}
                    onChange={handleAlbumChange}
                />

                <input
                    type="submit"
                    value="Submit"
                    className="task-btn"
                    onClick={handleAlbumChangeSubmit}
                />
                
            </form>
        </div>
    );
}

export default AlbumForm;