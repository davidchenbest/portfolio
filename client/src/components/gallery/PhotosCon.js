import React from 'react'
import { motion } from 'framer-motion'
import './../../css/photosCon.css'
import EditPhoto from './EditPhoto'


export default function PhotosCon({ isUser, folderState, folderObj, photos, photoClick }) {

    return (
        <div className='photosCon'>
            {
                photos.length === 0 ? <div>There are no photos available</div> :
                    photos.map(element =>
                        <div key={element.id} className='eachPhoto' >
                            {isUser && <EditPhoto folderState={folderState} folderObj={folderObj} photoObj={element} />}
                            <motion.img whileHover={{ scale: 1.05 }} src={element.photoLink} alt={element.photoLink} className='galleryPhoto'
                                onClick={(e) => photoClick(e, folderObj, element)} />
                        </div>
                    )
            }
        </div>
    )
}
