import React, { useState } from 'react';


const AddBand = () => {

	const [bands, setBands] = useState({ name: ''});
	
	const handleChange = (event) => {
		setBands({
			...bands,
			[event.target.name]: event.target.value
		});
		console.log(event.target.value)
	}


	const handleSubmit = (event) => {
		event.preventDefault();

		setBands({ name: '' })
		console.log(bands)
	}


	return (
		<div className="addBand">
			<form onSubmit={handleSubmit} >
				<h2>Create new band</h2>

				<input
					type="text"
					name="name"
					placeholder="Enter band name..."
					value={bands.name}
          onChange={handleChange}
				/>

				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}

export default AddBand;
