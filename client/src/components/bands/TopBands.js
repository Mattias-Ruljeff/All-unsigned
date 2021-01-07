import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import AddBand from "../bands/AddBand";


const TopBands = () => {

    const [topBands, setTopBands] = useState([]);

    useEffect(() => {
        axios.get('/bands/topbands')
        .then(res => {
            setTopBands(res.data.result)
        })
        .catch(error => {
            console.log(error)
        })

    }, [])


    // The HTML that is being rendered.
    return (
        <div className="topBandsWrapper">
            <h2>Top 10 Bands</h2>
            <table>
                <tbody>
                    <tr>
                        <th style={{width:"20px"}}>No.</th>
                        <th>Band</th>
                    </tr>

                    {topBands !== null ? topBands.map(({name}, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{name}</td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
        </div>
    );
}

export default TopBands;