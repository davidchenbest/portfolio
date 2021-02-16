import React, { useEffect, useState,useCallback } from 'react'
import '../../css/navigator.css'

export default function Navigator({ currentPhoto, folderState, singleState }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentLink, setCurrentLink] = useState('')

    const setStateLeftRight = useCallback((e, step) => {
        if(e) e.stopPropagation()
        let index = currentIndex + step
        if (index === -1) index = currentPhoto.folderObj.photos.length - 1
        else if (index === currentPhoto.folderObj.photos.length) index = 0
        setCurrentIndex(index)
        setCurrentLink(currentPhoto.folderObj.photos[index].photoLink);
    },[currentIndex,currentPhoto.folderObj.photos])

    const keydownEvent = useCallback(e=>{
        console.log(0);
        if (e.key === 'ArrowRight') setStateLeftRight(null,1)
        else if (e.key === 'ArrowLeft') setStateLeftRight(null,1)
    },[setStateLeftRight])

    useEffect(() => {
        window.addEventListener('keydown', keydownEvent)
        return () => window.removeEventListener("keydown",keydownEvent);
    }, [keydownEvent])

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


    return (
        <div className='singleView' onClick={e => exitClick(e)} >
            <i className="material-icons" id='exit' onClick={e => exitClick(e)}>&#xe5cd;</i>
            <i className="material-icons" id='left' onClick={e => setStateLeftRight(e, -1)}>&#xe5cb;</i>
            <i className="material-icons" id='right' onClick={e => setStateLeftRight(e, 1)}>&#xe5cc;</i>
            <img src={currentLink} alt={currentLink} />
        </div>
    )
}
