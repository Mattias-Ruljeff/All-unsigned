import React, { useState } from 'react';
import axios from "axios";


const AddBand = () => {

	const [bands, setBands] = useState({ name: ''});
	const [error, setError] = useState({ msg: '' });
	
	const handleChange = (event) => {
		setBands({
			...bands,
			[event.target.name]: event.target.value
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		axios.get(`/bands/${bands.name}`)
		.then(res=>{
			if (res.data.uniqueBand === false) {
				setError({msg: res.data.msg})
			} else {
				setError({msg: ""})
				axios.post('/add', bands)
			}
		})
		setBands({ name: '' })
	}

	const errorMSG = (
		<>
			<div>
				<p>{error.msg}</p>
			</div>
		</>
	)



	return (
		<div className="addBand">
			<form onSubmit={handleSubmit} >
				<h2>Create new band</h2>

				<input
					type="text"
					name="name"
					placeholder="Enter band name..."
					maxLength="30"
          required
					value={bands.name}
          onChange={handleChange}
				/>

				<input type="submit" value="Submit" />
			</form>
			{ error.msg !== null ? errorMSG : '' }
		</div>
	)
}

export default AddBand;
