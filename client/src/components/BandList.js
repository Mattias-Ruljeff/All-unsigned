import React, { useState, useEffect } from "react";
import axios from "axios";

const BandList = () => {

  const [bands, setBands] = useState([]);

  useEffect(() => {
      axios.get('/bands')
      .then(res => {
          console.log(res)
          setBands(res.data.result)
      })
      .catch(error => {
          console.log(error)
      })
  }, [])

  return (
    <div className="bandList">
      <ul>
        {bands.map(post => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default BandList;