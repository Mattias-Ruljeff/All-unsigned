import React, { useState, useEffect } from "react";
import axios from 'axios';

// Components
import BandListDetails from './BandListDetails';

const BandList = ({ bands, removeBandFromList }) => {

    return (
        <div className="bandList">
            <ul>
                { bands.map(band => {
                    return (
                        <BandListDetails
                            key={band.id}
                            band={band}
                            removeBandFromList={removeBandFromList}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

// Export
export default BandList;