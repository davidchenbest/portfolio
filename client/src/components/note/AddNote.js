import React, { useState } from 'react'
import fetchFunctions from '../../modules/fetchFunctions'
import { addNoteQuery } from '../../queries/noteQueries'

export default function AddNote({ addNote }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const addSubmit = async (e) => {
        try {
            e.preventDefault()
            const query = addNoteQuery(title, content)
            const data = await fetchFunctions(query)
            addNote(data.data.addNote);
        } catch (error) {
            alert(error)
        }
    }

    return (
        <form onSubmit={addSubmit}>
            <input type='text' onChange={(e) => setTitle(e.target.value)} />
            <textarea onChange={(e) => setContent(e.target.value)} />
            <input type='submit' />
        </form>
    )
}

