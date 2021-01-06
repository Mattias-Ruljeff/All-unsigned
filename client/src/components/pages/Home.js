import React from "react";

// Components
import CountBands from "../bands/CountBands";
import CountAlbums from "../albums/CountAlbums";
import TopBands from "../bands/TopBands";
import TopAlbums from "../albums/TopAlbums";


const Home = () => {

    // The HTML that is being rendered.
    return (
        <div className="wrapper">
            <TopBands />
            <TopAlbums />
            <div className="countWrapper">
                <CountBands />
                <CountAlbums />
            </div>
        </div>
    );
}

export default Home;