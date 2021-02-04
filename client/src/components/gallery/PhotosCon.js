import React from 'react'
import './../../css/photosCon.css'
import EditPhoto from './EditPhoto'


export default function PhotosCon({ isUser, folderState, folderObj, photos, photoClick }) {

    return (
        <div className='photosCon'>
            {photos.map(element =>
                <div key={element.id} className='eachPhoto' >
                    {isUser && <EditPhoto folderState={folderState} folderObj={folderObj} photoObj={element} />}
                    <img src={element.photoLink} alt={element.photoLink} className='galleryPhoto'
                        onClick={(e) => photoClick(e, folderObj, element)} />
                </div>
            )}
        </div>
    )
}
