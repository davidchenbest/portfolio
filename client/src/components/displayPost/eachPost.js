import React from 'react'
import CommentContainer from './commentContainer'
import cap from '../../modules/capitalizeFirstLetter'

const EachPost = ({title,content,first,last,date,comments})=>{
    return(
       <>
           <div id='each-post-title-con'>
            <span id='each-post-title'>{title}</span>
           </div>
            <div id='each-post-name-con'>
                <i className="material-icons">&#xe7ff;</i>
                <span>{cap(first)} {cap(last)}</span>
                <p className='date'>{date}</p>
            </div>
           <div id='each-post-content-con'>
            <p>{content}</p>
           </div>
           
           <CommentContainer comments={comments}></CommentContainer>
       </> 
    )

}

export default EachPost