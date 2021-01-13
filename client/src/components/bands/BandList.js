import React from 'react';
import Loading from "../pages/Loading"

// Components
import BandListDetails from './BandListDetails';

const BandList = ({ bands, removeBandFromList }) => {

    if (Object.keys(bands).length === 0) {
        return (<Loading />)
    }
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