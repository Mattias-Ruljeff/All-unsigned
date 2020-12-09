import React, { Component } from "react";
import axios from "axios";

class BandList extends Component {
  state = {
    bands: [],
  };
  componentDidMount() {
    this.getBands();
  }
  getBands = () => {
    axios
      .get("/bands")
      .then((res) => {
        if (res.data) {
          this.setState({
            bands: res.data.result,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { bands } = this.state;
    console.log(bands);
    return (
      <div className="bandList">
        <ul>
          {bands.map((band) => (
            <li key={band.id}>{band.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default BandList;
