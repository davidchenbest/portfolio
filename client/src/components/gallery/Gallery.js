import React,{useEffect,useState} from 'react'
import fetchGraphQL from '../../modules/fetchGraphQL'
import {galleryFolders} from '../../queries/galleryQueries'
import secToDate from '../../modules/secToDate'
import PhotosCon from './PhotosCon'

export default function Gallery() {
    const [folders, setFolders] =useState([])
    useEffect( () => {
        (async()=>{
            const data = await fetchGraphQL(galleryFolders())
            setFolders(data.data.folders)
        })()
        
    }, [])



    return (
        <div>
            {!folders.length && 'Loading'}
            {folders.map(element=>
                <div key={element.id}>
                    <h1>{element.title}</h1>
                    <p>{secToDate(element.date)}</p>
                    <p>{element.description}</p>
                    <PhotosCon photos={element.photos}></PhotosCon>
                </div>
            )}
        </div>
    )
}
