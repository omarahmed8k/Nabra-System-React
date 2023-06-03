import React from 'react'
import NoDataSvg from '../../assets/svgs/no-data.svg'
import './NoData.scss'

export default function NoData() {
    return (
        <div className="no-data">
            <img src={NoDataSvg} alt="no-data" />
            <h3>No data found</h3>
        </div>
    )
}
