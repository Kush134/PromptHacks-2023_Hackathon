import React from 'react'
import './Common.css'

const Inactive = () => {
    return (
        <div className="not-active">
            <h3>Unsupported Page</h3>
            <p>This page is not supported. The extension currently supports problems on the following sites:</p>
            <ul>
                <li>Leetcode</li>
                <li>Hackerrank</li>
                <li>GeeksforGeeks</li>
                <li>Interviewbit</li>
                <li>AlgoExpert</li>
            </ul>
            <p>You must be on a problem page from one of the above sites.</p>
            <p>This extension does not work on tests and live contests. We don't endorse or encourage cheating</p>
            <p className='not-active-footer'>If you are on one of the supported sites, then please report the bug here: </p>
        </div>
    )
}

export default Inactive