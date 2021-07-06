
import React, { useContext } from 'react';
import { DarkContext } from '../contexts/DarkContext'

export default function ViewToggle({ listViewState }) {
    const { isDark } = useContext(DarkContext)
    const color = isDark ? { color: 'gray' } : { color: 'black' }
    return (
        <div onClick={() => listViewState.setListView(pre => !pre)} >
            {listViewState.listView ? <i className="material-icons" style={color}>&#xe8f0;</i>
                : <i className="material-icons" style={color}>&#xe8ef;</i>}
        </div>
    )
}