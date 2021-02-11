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

    const rightClick = e => {
        e.stopPropagation()
        let index = currentIndex + 1
        if (index === currentPhoto.folderObj.photos.length) index = 0
        setCurrentIndex(index)
        setCurrentLink(currentPhoto.folderObj.photos[index].photoLink);
    }
    const leftClick = e => {
        e.stopPropagation()
        let index = currentIndex - 1
        if (index === -1) index = currentPhoto.folderObj.photos.length - 1
        setCurrentIndex(index)
        setCurrentLink(currentPhoto.folderObj.photos[index].photoLink);
    }

    const exitClick = e => {
        e.stopPropagation()
        singleState.setSingleMode(!singleState.singleMode)
    }

    return (
        <div className='singleView' onClick={e => exitClick(e)}>
            <i className="material-icons" id='exit' onClick={e => exitClick(e)}>&#xe5cd;</i>
            <i className="material-icons" id='left' onClick={e => leftClick(e)}>&#xe5cb;</i>
            <i className="material-icons" id='right' onClick={e => rightClick(e)}>&#xe5cc;</i>
            <img src={currentLink} alt={currentLink} />
        </div>
    )
}
