import React, { useEffect, useReducer, useState } from "react";
import AddContainer from "./AddContainer";
import Note from "./Note";
import NoNotes from './NoNotes'
import Order from './order/Order'
import { notesReducer } from "../reducers/notesReducer";
import ViewToggle from "./ViewToggle";
import Export from "./csv/Export";
import fetchFunctions from "../../../../modules/fetchFunctions";
import { addNoteQuery, notesQuery } from "../../../../queries/noteQueries";

export default function NoteContainer() {
  const [listView, setListView] = useState(false)
  const [notes, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    fetchFunctions(notesQuery()).then(data => {
      dispatch({ type: "SET", notes: data.data.notes });
    })
  }, [])

  const editNote = (index, note) => {
    dispatch({ type: "EDIT", id: index, note });
  };

  const remove = (e, index) => {
    e.preventDefault();
    dispatch({ type: "REMOVE", id: index });
  };

  const add = async (note) => {
    try {
      const query = addNoteQuery(note.title, note.content)
      const data = await fetchFunctions(query)
      if (!data.data.addNote) throw 'error adding note'
      dispatch({ type: "ADD", note });
    } catch (error) {
      alert(error)
    }

  };

  return (
    <>
      <AddContainer add={add}></AddContainer>


      {!notes.length ? <NoNotes /> :
        <>
          <Export notes={notes} />
          <div className='viewButtonCon'>
            <ViewToggle listViewState={{ listView, setListView }} />
            <Order notesState={{ notes, dispatch }} />
          </div>
          <div className={`noteCon ${listView ? 'listView' : 'gridView'}`}>
            {notes.map((n, i) => (
              <Note
                note={n}
                key={i}
                index={i}
                editNote={editNote}
                remove={remove}
              ></Note>
            ))}
          </div>
        </>
      }


    </>
  );
}
