import React, { useState, useEffect } from "react";
import BandDetails from './BandDetails';
import axios from "axios";

const BandList = () => {

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


  return (
    <div className="bandList">
      <ul>
        { bands.map(band => {
          return ( <BandDetails key={band.id} band={band} />)
          })
        }
      </ul>
    </div>
  )
}

export default BandList;

