import React, { Component } from "react";
import axios from "axios";

class AddBand extends Component {
  state = {
    bands: [],
  };
  componentDidMount() {}

  render() {
    return (
      <div className="addBand">
        <p>Add band page</p>
      </div>
    );
  }
}
export default AddBand;
