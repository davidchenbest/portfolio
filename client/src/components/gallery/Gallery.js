import React, { useEffect, useState } from 'react'
import fetchGraphQL from '../../modules/fetchGraphQL'
import { galleryFolders } from '../../queries/galleryQueries'
import secToDate from '../../modules/secToDate'
import PhotosCon from './PhotosCon'
import AddPhoto from './AddPhoto'
import AddFolder from './AddFolder'

export default function Gallery() {
    const [folders, setFolders] = useState([])
    const [isUser, setIsUser] = useState(false)
    useEffect(() => {
        (async () => {
            const data = await fetchGraphQL(galleryFolders())
            setFolders(data.data.folders)
        })()
        if (document.cookie.includes('jiachenuser')) setIsUser(true)

    }, [])

    const folderClick = (e, folderObj) => {

        // console.log(e.target, folderObj);
    }

    const photoClick = (e, folderObj, photoObj) => {
        e.stopPropagation()
        // console.log(folderObj, photoObj);
    }

    return (
        <>
            {!folders.length ? 'Loading'
            :
            <div>
                {isUser && <AddFolder folderState={{folders, setFolders}} />}
                {folders.map(element =>
                    <div key={element.id} onClick={(e) => folderClick(e, element)}>
                        <div>
                            <h1>{element.title}</h1>
                            {isUser && <AddPhoto folderObj={element} folderState={{folders, setFolders}} />}
                        </div>

                        <p>{secToDate(element.date)}</p>
                        <p>{element.description}</p>
                        <PhotosCon folderObj={element} photos={element.photos} photoClick={photoClick}></PhotosCon>
                    </div>
                )}
            </div>
            }

            
            
        </>
    )
}
