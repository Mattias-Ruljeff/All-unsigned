import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import AddBand from "../bands/AddBand";


const TopAlbums = () => {

    const [topAlbums, setTopAlbums] = useState([]);

    useEffect(() => {
        axios.get('/albums/topalbums')
        .then(res => {
            setTopAlbums(res.data.result)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    // The HTML that is being rendered.
    return (
        <div className="topAlbumsWrapper">
            <h2>Top 10 Records</h2>
            <table>
                <tbody>
                    <tr>
                        <th style={{width:"20px"}}>No.</th>
                        <th>Band</th>
                        <th>Album</th>
                        <th>Type</th>
                        <th>Genre</th>

                    </tr>

                    {topAlbums !== null ? topAlbums.map(({band, album, type, genre}, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{band}</td>
                                    <td>{album}</td>
                                    <td>{type}</td>
                                    <td>{genre}</td>
                                </tr>
                            )
                        }) : ""}
                </tbody>
            </table>
        </div>
    );
}

export default TopAlbums;