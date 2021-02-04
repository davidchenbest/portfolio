import React, { useState } from 'react'
import { editPhoto } from '../../queries/galleryQueries'
import mutateGalleryGraphQL from '../../modules/mutateGalleryGraphQL'

export default function EditPhoto({ folderState, folderObj, photoObj }) {
    const [editMode, setEditMode] = useState(false)
    const [photoLink, setPhotoLink] = useState('')

    const submitForm = async (e) => {
        e.preventDefault()
        const mutate = editPhoto(folderObj.id, photoObj.id, photoLink)
        const data = await mutateGalleryGraphQL(mutate)
        if (data.data.editPhoto.photoLink === 'There was an error') return alert(data.data.editPhoto.photoLink)
        let arr = [...folderState.folders]
        const index = arr.findIndex(folder => folder.id === folderObj.id)
        const indexPhoto = arr[index].photos.findIndex(photo => photo.id === photoObj.id)
        arr[index].photos[indexPhoto].photoLink = photoLink
        folderState.setFolders(arr)
        setEditMode(!editMode)
        setPhotoLink('')
    }
    return (
        <>
            {editMode ?
                <form onSubmit={(e) => submitForm(e)}>
                    <input type='text' value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} />
                    <input type='submit' />
                </form> :
                <i className="material-icons" id='editIcon'
                    onClick={() => setEditMode(!editMode)}
                >&#xe254;</i>
            }
        </>
    )
}
