import React from 'react';

const AlbumForm = ({ handleAlbumChangeSubmit, modifiedAlbum, handleAlbumChange, albumType, edit }) => {
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

                <input
                    type="date"
                    name="release_date"
                    className="form-date"
                    required
                    defaultValue={modifiedAlbum.release_date.substring(0,10)}
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