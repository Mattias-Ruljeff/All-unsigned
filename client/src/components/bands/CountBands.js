import React, { useState, useEffect } from "react";
import axios from "axios";

// Components

const CountBands = () => {

    const [counter, setCounter] = useState([]);

    useEffect(() => {
        axios.get('/bands/totalbands')
        .then(res => {
            setCounter(res.data.result)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    console.log("counter")
    console.log(counter)
    // The HTML that is being rendered.
    return (
        <div className="countBandsWrapper">
            <h2>Total number of bands</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Amount</th>
                    </tr>

                    {counter !== null ? counter.map(({No}, index) => {

                            return (
                                <tr key={index}>
                                    <td>{No}</td>
                                </tr>
                            )
                        }) : ""}
                </tbody>
            </table>
        </div>
    );
}

export default CountBands;