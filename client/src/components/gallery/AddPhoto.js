import React, { useState } from 'react'
import mutateGalleryGraphQL from '../../modules/mutateGalleryGraphQL'
import { addPhoto } from '../../queries/galleryQueries'


export default function AddPhoto({ folderObj }) {
    const [addMode, setAddMode] = useState(false)
    const [photoLink, setPhotoLink] = useState(false)
    const [description, setDescription] = useState(false)

    const formSubmit = async (e) => {
        e.preventDefault()
        const mutation = addPhoto(folderObj.id, photoLink, description)
        const data = await mutateGalleryGraphQL(mutation)
        if (data.data.addPhoto.photoLink === 'There was an error') alert(data.data.addPhoto.photoLink)
    }
    return (
        <div>
            {!addMode ? <button onClick={() => setAddMode(!addMode)}>AddPhoto</button> :
                <form onSubmit={(e) => formSubmit(e)}>
                    <input type='text' placeholder='Photo Link' onChange={(e) => setPhotoLink(e.target.value)} />
                    <input type='text' placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                    <input type='submit' />
                </form>
            }
        </div>
    )
}
