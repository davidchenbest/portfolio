import React from 'react'

const ReviewScreen = ({type,title,goBack})=>{
    console.log(title);
    return(
        <div>
            <p>
            {title} {type} has been submitted for review
            </p>
            <button onClick={goBack}>Back</button>
        </div>
    )
}

export default ReviewScreen