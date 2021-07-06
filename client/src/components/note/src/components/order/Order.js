import React, { useEffect, useRef, useCallback, memo } from 'react'
import '../../css/order.css'

export default memo(function Order({ notesState }) {

    const categoryRef = useRef()
    const orderRef = useRef()

    const orderChange = useCallback(
        () => {
            const category = categoryRef.current.value
            const order = orderRef.current.value
            notesState.dispatch({ type: "ORDER", category, order })
        },
        [notesState],
    )

    useEffect(() => {
        orderChange()
    }, [orderChange])


    return (
        <div className='order'>
            <select onChange={orderChange} ref={categoryRef}>
                <option value='date'>Date</option>
                <option value='title'>Title</option>
                <option value='content'>Content</option>
            </select>
            <select onChange={orderChange} ref={orderRef}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
            </select>
        </div>
    )
}, (pre, next) => {
    if (JSON.stringify(pre.notesState.notes) === JSON.stringify(next.notesState.notes)) return true
    return false
})
