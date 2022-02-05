import React from 'react'



export default function Editor({ contentState }) {
    const changeEvent = e => {
        contentState.setContent(e.target.value)
    }

    return (
        <div className='richEditor'>
            <textarea value={contentState.content}
                onChange={changeEvent}


            />
        </ div>
    )
}
