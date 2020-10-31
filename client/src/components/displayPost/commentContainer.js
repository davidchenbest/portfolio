import React, {useState} from 'react'
import cap from '../../modules/capitalizeFirstLetter'
import secToDate from '../../modules/secToDate'

const CommentContainer = ({comments})=>{
    const [show,setShow] = useState(false)
    return(
       <div className='comment-con'>
           <p id='comment-section' onClick={()=>{setShow(!show)}}>comments</p>
           
           {show && 
           comments.map((c,i) =>
           <div className='eachComment' key={i}>
               <div className='comment-name-con'>
                    <p>{cap(c.author.first)}</p>
                    <p>{cap(c.author.last)}</p>
                    <p className='date'>{secToDate(c.date)}</p>
               </div>
               <div className='comment-content-con'>
               <p >{c.content}</p>
               </div>

           </div>
            
            
            )}
       </div> 
    )

}

export default CommentContainer