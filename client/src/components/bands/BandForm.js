import React from 'react';

const BandForm = ({bands, handleSubmit, handleChange}) => {
    return (
        <div className="bandNameWindow">
            <h3>Edit bandname</h3>
            <form name="newBandName" onSubmit={handleSubmit} >

                <input
                    type="text"
                    name="name"
                    placeholder="Enter song title..."
                    defaultValue={bands}
                    className="form-task"
                    required
                    onChange={handleChange}
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

export default BandForm;