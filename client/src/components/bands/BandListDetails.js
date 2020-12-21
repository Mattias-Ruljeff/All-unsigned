import React from 'react';
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Handles the details of a specific task.
const BandListDetails = ({ band, removeBandFromList }) => {
    let history = useHistory();

    const handleInfo = () => {
        history.push(`/bands/info/${band.id}`)
        console.log('Info => id: ' + band.id)
    }

    const handleFavourite = () => {
        axios.post(`/bands/favourite/${band.id}`)
        toast.success('🦄 New favourite band added!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 

    // The HTML that is being rendered.
    return (
        <div>
            <div>
                <div>Band: {band.name}</div>
            </div>

            <button className="info-btn" onClick={handleInfo} >
                Info
            </button>
            
            <button className="favourite-btn" onClick={handleFavourite} >
                &hearts;
            </button>

            <ToastContainer />
        </div>
    );
}

// Exports
export default BandListDetails;