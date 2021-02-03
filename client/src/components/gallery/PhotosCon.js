import React from 'react'
import './../../css/photosCon.css'

export default function PhotosCon({ folderObj, photos, photoClick }) {
    return (
        <div className='photosCon'>
            {photos.map(element =>
                <div key={element.id} >
                    <img src={element.photoLink} alt={element.photoLink} className='galleryPhoto'
                    onClick={(e) => photoClick(e, folderObj, element)} />
                    {/* <div style={{backgroundImage:`url("${element.photoLink}")`}} className='galleryPhoto'
                    onClick={(e) => photoClick(e, folderObj, element)}> </div> */}
                    
                </div>
            )}
        </div>
    )
}
