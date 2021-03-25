import React from 'react'
import Section from './portfolio&projects/Section'
import broadfeet from './portfolio&projects/data/broadfeet'
import flashcard from './portfolio&projects/data/flashcard'
import note from './portfolio&projects/data/note'

export default function Projects() {

    return (
        <div className='portSection'>
            <h2 className='title'>Portfolio & Projects</h2>
            <div className='portSelect'>
                <Section data={broadfeet} />
                <Section data={flashcard} />
                <Section data={note} />
            </div>
        </div>
    )
}
