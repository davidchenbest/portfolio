import React, { useEffect, useState } from 'react'
import fetchFunctions from '../../modules/fetchFunctions'
import { notesQuery } from '../../queries/noteQueries'
import AddNote from './AddNote'
import Loading from '../Loading'
export default function Note() {
    const [notes, setNotes] = useState()
    useEffect(() => {
        fetchFunctions(notesQuery()).then(data => {
            setNotes(data.data.notes)
        })

    }, [])

    const addNote = (note) => {
        console.log(note);
        setNotes(pre => [note, ...pre])
    }

    return (
        <div>
            <AddNote addNote={addNote} />
            {notes ? notes.map((note, index) => <div key={index}>
                {note.title}
            </div>) :
                <Loading />}
        </div>
    )
}

