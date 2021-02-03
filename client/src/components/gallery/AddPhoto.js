import React, { useState } from 'react'
import mutateGalleryGraphQL from '../../modules/mutateGalleryGraphQL'
import { addPhoto } from '../../queries/galleryQueries'


export default function AddPhoto({ folderObj, folderState }) {
    const [addMode, setAddMode] = useState(false)
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')

    const formSubmit = async (e) => {
        e.preventDefault()
        const mutation = addPhoto(folderObj.id, photoLink, description)
        const data = await mutateGalleryGraphQL(mutation)
        if (data.data.addPhoto.photoLink === 'There was an error') alert(data.data.addPhoto.photoLink)
        else {
            let arr = [...folderState.folders]
            const index = arr.findIndex(folder=> folder.id === folderObj.id)
            arr[index].photos.push(data.data.addPhoto)
            folderState.setFolders(arr)
            setPhotoLink('')
            setDescription('')
        }
    }
    return (
        <div>
            {!addMode ? <button onClick={() => setAddMode(!addMode)}>AddPhoto</button> :
                <form onSubmit={(e) => formSubmit(e)}>
                    <input type='text' placeholder='Photo Link' onChange={(e) => setPhotoLink(e.target.value)} value={photoLink} />
                    <input type='text' placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} />
                    <input type='submit' />
                </form>
            }
        </div>
    )
}
