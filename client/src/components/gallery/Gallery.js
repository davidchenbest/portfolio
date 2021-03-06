import React, { useEffect, useState } from 'react'
import capFirst from '../../modules/capitalizeFirstLetter'
import fetchGraphQL from '../../modules/fetchGraphQL'
import { galleryFolders } from '../../queries/galleryQueries'
import PhotosCon from './PhotosCon'
import AddPhoto from './AddPhoto'
import AddFolder from './AddFolder'
import Loading from '../Loading'
import Navigator from './Navigator'
import '../../css/gallery.css'

export default function Gallery() {
    const [folders, setFolders] = useState([])
    const [isUser, setIsUser] = useState(false)
    const [loading, setLoading] = useState(true)
    const [singleMode, setSingleMode] = useState(false)
    const [currentPhoto, setCurrentPhoto] = useState({})
    useEffect(() => {
        (async () => {
            const data = await fetchGraphQL(galleryFolders())
            const folders = data.data.folders
            folders.forEach(folder => {
                folder.photos.sort((a, b) => b.date - a.date)
            });
            setFolders(folders)
            setLoading(false)
        })()
        if (document.cookie.includes('jiachenuser')) setIsUser(true)

    }, [])

    const folderClick = (e, folderObj) => {

        // console.log(e.target, folderObj);
    }

    const photoClick = (e, folderObj, photoObj) => {
        setSingleMode(!singleMode)
        e.stopPropagation()
        setCurrentPhoto({ folderObj, photoObj })
    }

    return (
        <>
            {loading ? <Loading />
                :
                <div className='galleryCon'>
                    {isUser && <AddFolder folderState={{ folders, setFolders }} />}
                    {
                        folders.length === 0 ? <div>There are no photos available</div> :
                            folders.map((element) =>
                                <div key={element.id} onClick={(e) => folderClick(e, element)} className='folderCon'>
                                    <div className='folderTitle'>
                                        <h1>{capFirst(element.title)}</h1>
                                        {isUser && <AddPhoto folderObj={element} folderState={{ folders, setFolders }} />}
                                    </div>

                                    <p>{element.description}</p>
                                    <PhotosCon isUser={isUser} folderState={{ folders, setFolders }} folderObj={element} photos={element.photos} photoClick={photoClick}></PhotosCon>
                                </div>
                            )
                    }
                </div>
            }
            {singleMode &&
                <Navigator currentPhoto={currentPhoto} folderState={{ folders, setFolders }} singleState={{ singleMode, setSingleMode }} />
            }



        </>
    )
}
