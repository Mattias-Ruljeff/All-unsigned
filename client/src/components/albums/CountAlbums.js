import React, { useState, useEffect } from "react";
import axios from "axios";

const CountAlbums = () => {
    const [counter, setCounter] = useState([]);

    useEffect(() => {
        axios.get('/albums/getnumberofalbums')
        .then(res => {
            setCounter(res.data.result)
        })
        .catch(error => {
            console.log(error)
        })

    }, [])


    // The HTML that is being rendered.
    return (
        <div className="countAlbumsWrapper">
            <h2>Total number of records</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>

                    {counter !== null ? counter.map(({No, Type}, index) => {
                        return (
                            <tr key={index}>
                                <td>{Type}</td>
                                <td>{No}</td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
        </div>
    );
}

export default CountAlbums;