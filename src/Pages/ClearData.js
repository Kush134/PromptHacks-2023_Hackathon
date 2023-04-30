import React, { useState } from 'react'

const ClearData = () => {
    /* eslint-disable no-undef */
    const [cleared, setCleared] = useState(false)
    const [clearing, setClearing] = useState(false)

    const clearData = async () => {
        setClearing(true)
        await chrome.storage.sync.clear().then(res => {
            console.log(res)
            setClearing(false)
            setCleared(true)
        })
    }

    return (
        <div>
            {cleared ? <p>Data Cleared</p> : clearing ? <p>Clearing...</p> : <button onClick={clearData}>Clear Data</button>}
        </div>
    )
}

export default ClearData