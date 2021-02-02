import React from 'react'
import secToDate from '../../modules/secToDate'

export default function PhotosCon({photos}) {
    return (
        <div>
            {photos.map(element=>
                <div key={element.id}>
                   <p>{element.photoLink}</p>
                   <p>{secToDate(element.date)}</p> 
                   <p>{element.description}</p>  
                </div>
                )}
        </div>
    )
}
