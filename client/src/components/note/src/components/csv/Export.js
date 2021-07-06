import React, { useRef, memo } from 'react'
import download from '../../modules/download'
import '../../css/csv.css'
import '../../css/export.css'

function Export({ notes }) {
    const downloadRef = useRef()
    const downloadClick = () => {
        download(notes, 'downloadd', downloadRef.current)
        downloadRef.current.click()
    }
    return (
        <>
            <button onClick={downloadClick}>Export</button>
            <a href="#/" ref={downloadRef} style={{ display: 'none' }} >export</a>
        </>
    )
}

export default memo(Export)