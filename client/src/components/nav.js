import React, { Component } from 'react';



class Nav extends Component {
    constructor() {
        super();
        this.state = {
            data: ''
        };

    }
    componentDidMount() {
        let path = window.location.pathname
        path = path.split('/')
        path = path[1]
        if (path === '') path = 'home'
        let aArr = document.querySelectorAll('.nav-list li a')
        aArr.forEach(a => {
            const tabName = a.innerHTML.toLowerCase()
            if (tabName.includes(path)) {
                a.className += 'active'
            }
        })
    }

    displayLogout() {
        if (document.cookie.includes('jiachenuser')) {
            return (
                <>
                    <li  ><a href='/manage'>Manage</a></li>
                    <li id='nav-login'><a href='/logout'>logout</a></li>
                </>
            )
        }
        return (
            <li id='nav-login' ><a href='/login'>Login</a></li>
        )
    }





    render() {
        return (

            <ul className='nav-list'>
                <li ><a href='/'>Home</a></li>
                <li ><a href='/blog'>Blog</a></li>
                {
                    this.displayLogout()
                }
            </ul>



        );
    }
}



export default Nav;