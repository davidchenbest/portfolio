import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/tabs.css'

export default function Tabs({ tabs }) {
    return <div className='tabs'>
        {tabs && tabs.map(tab =>
            <NavLink exact activeClassName='active' to={tab.route} key={tab.name}  >{tab.name}</NavLink>
        )}
    </div>;
}
