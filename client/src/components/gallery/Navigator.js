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

    const rightClick = () => {
        if (currentIndex === currentPhoto.folderObj.photos.length - 1) return
        const index = currentIndex + 1
        setCurrentIndex(index)
        setCurrentLink(currentPhoto.folderObj.photos[index].photoLink);
    }
    const leftClick = () => {
        if (currentIndex === 0) return
        const index = currentIndex - 1
        setCurrentIndex(index)
        setCurrentLink(currentPhoto.folderObj.photos[index].photoLink);

    }

    return (
        <div className='singleView'>
            <i className="material-icons" id='exit' onClick={() => singleState.setSingleMode(!singleState.singleMode)}>&#xe5cd;</i>
            <i className="material-icons" id='left' onClick={() => leftClick()}>&#xe5cb;</i>
            <i className="material-icons" id='right' onClick={() => rightClick()}>&#xe5cc;</i>
            <img src={currentLink} alt={currentLink} />
        </div>
    )
}
