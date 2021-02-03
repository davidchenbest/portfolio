import React,{useState} from 'react'
import mutateGalleryGraphQL from '../../modules/mutateGalleryGraphQL'
import { addFolder } from '../../queries/galleryQueries'
import '../../css/addFolder.css'

export default function AddFolder({folderState}) {
    const [addMode, setAddMode] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const formSubmit = async (e) => {
        e.preventDefault()
        let mutate = addFolder(title,description)
        const data = await mutateGalleryGraphQL(mutate)
        let obj = data.data.addFolder
        let arr = [obj , ...folderState.folders]
        folderState.setFolders(arr)
        setTitle('')
        setDescription('')
    }


    return (
        <div className='addFolderBtn'>
            {!addMode ? <button onClick={() => setAddMode(!addMode)}>AddFolder</button> :
                <form onSubmit={(e) => formSubmit(e)}>
                    <input type='text' placeholder='Photo Link' onChange={(e) => setTitle(e.target.value)} value={title} />
                    <input type='text' placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} />
                    <input type='submit' />
                </form>
            }
        </div>
    )
}
