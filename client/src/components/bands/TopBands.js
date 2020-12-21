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
        <div>
            <h2>Top 5 Bands</h2>
            <table>
                <tbody>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Favourite Album</th>
                    </tr>

                    {topBands !== null ? topBands.map(({band, album}, index) => {
                            console.log(band)
                            return (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{band}</td>
                                    <td>{album}</td>
                                </tr>
                            )
                        }) : ""}
                </tbody>
            </table>
        </div>
    );
}

export default TopBands;