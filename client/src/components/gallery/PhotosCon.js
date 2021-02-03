import React from 'react'
import secToDate from '../../modules/secToDate'

export default function PhotosCon({ folderObj, photos, photoClick }) {
    return (
        <div>
            {photos.map(element =>
                <div key={element.id}>
                    <p onClick={(e) => photoClick(e, folderObj, element)}>{element.photoLink}</p>
                    <p>{secToDate(element.date)}</p>
                    <p>{element.description}</p>
                </div>
            )}
        </div>
    )
}
