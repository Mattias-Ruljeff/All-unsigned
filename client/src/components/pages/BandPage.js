import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import AddBand from "../bands/AddBand";
import BandList from "../bands/BandList";
// import TopBands from "../bands/TopBands";


const BandPage = () => {

    const [bands, setBands] = useState([]);

    useEffect(() => {
        axios.get('/bands')
        .then(res => {
            setBands(res.data.result)
        })
        .catch(error => {
            console.log(error)
        })
        
    }, [])

    const addBandToList = () => {
        axios.get("/bands").then(
            res => setBands(res.data.result)
        )
    }

    const removeBandFromList = (bandToRemove) => {
        const removeBand = bands.filter(band => band.id !== bandToRemove)
        setBands(removeBand)
    }

    // The HTML that is being rendered.
    return (
        <div className="bandPageWrapper">
            <AddBand addBandToList = {addBandToList} />
            <BandList bands = {bands} removeBandFromList = {removeBandFromList} />
            {/* <TopBands /> */}
        </div>
    );
}

export default BandPage;