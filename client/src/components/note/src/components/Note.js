import React, { useState, useContext, useRef, useEffect } from "react";
import { DarkContext } from '../contexts/DarkContext'
import { getDate } from '../modules/getDate'
import Speech from './Speech'
import Iframe from './Iframe'
import Editor from './Editor'


export default function Note({ note, editNote, index, remove }) {
    const { isDark, colors } = useContext(DarkContext)
    const { background, color } = isDark ? colors.dark : colors.light

    const [form, setForm] = useState(false);
    const titleRef = useRef()
    const [content, setContent] = useState('')

    useEffect(() => {
        setContent(note.content)
    }, [note])

    const speechInput = (str) => {
        setContent(current => current += str)
    }

    const submit = (e) => {
        e.preventDefault();
        editNote(index, { title: titleRef.current.value, content: content });
        setForm(false);
    };

    const hideForm = (e) => {
        e.stopPropagation();
        const tag = e.target.tagName;
        if (tag === "DIV" || tag === "SPAN") {
            setForm(false);
        }
    };

    return (
        <div className="eachNote" onClick={() => setForm(true)} style={{ background, color }}>
            <i className="material-icons edit" style={{ color }}>&#xe254;</i>
            <p className="title" >{note.title}</p>
            <Iframe content={note.content} title={note.title} />
            < span className='date'>{getDate(note.date)}</span>
            {form && (
                <div
                    className="formCon"
                    onClick={(e) => {
                        hideForm(e);
                    }}
                >
                    <form onSubmit={(e) => submit(e)}  >
                        <input ref={titleRef} defaultValue={note.title} placeholder='title' type='text' />
                        <Editor contentState={{ content, setContent }} />
                        <div className="btnCon">
                            <i
                                className="material-icons"
                                onClick={(e) => {
                                    remove(e, index);
                                    setForm(false);
                                }}
                            >
                                delete
              </i>

                            <input type="submit" value="Save" id='save' />
                            <Speech speechInput={speechInput} />
                        </div>
                        <span
                            id="exit"
                            onClick={(e) => {
                                hideForm(e);
                            }}
                        >
                            X
            </span>
                    </form>
                </div>
            )}
        </div>
    );
}
