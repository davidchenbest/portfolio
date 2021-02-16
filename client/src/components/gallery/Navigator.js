import React, { useEffect, useState } from 'react'
import '../../css/navigator.css'

export default function Navigator({ currentPhoto, folderState, singleState }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentLink, setCurrentLink] = useState('')

    useEffect(() => {
        let photos = currentPhoto.folderObj.photos
        let photoId = currentPhoto.photoObj.id
        let index = photos.findIndex(photo => photo.id === photoId)
        setCurrentIndex(index);
        setCurrentLink(currentPhoto.folderObj.photos[index].photoLink);
    }, [currentPhoto.folderObj.photos, currentPhoto.photoObj.id])

    const exitClick = e => {
        e.stopPropagation()
        singleState.setSingleMode(!singleState.singleMode)
    }

    const setStateLeftRight = (e, step) => {
        e.stopPropagation()
        let index = currentIndex + step
        if (index === -1) index = currentPhoto.folderObj.photos.length - 1
        else if (index === currentPhoto.folderObj.photos.length) index = 0
        setCurrentIndex(index)
        setCurrentLink(currentPhoto.folderObj.photos[index].photoLink);
    }

    return (
        <div className='singleView' onClick={e => exitClick(e)} >
            <i className="material-icons" id='exit' onClick={e => exitClick(e)}>&#xe5cd;</i>
            <i className="material-icons" id='left' onClick={e => setStateLeftRight(e, -1)}>&#xe5cb;</i>
            <i className="material-icons" id='right' onClick={e => setStateLeftRight(e, 1)}>&#xe5cc;</i>
            <img src={currentLink} alt={currentLink} />
        </div>
    )
}
