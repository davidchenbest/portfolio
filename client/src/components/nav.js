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
        else if(path ==='manage')this.auth()
        let aArr = document.querySelectorAll('.nav-list li a')
        aArr.forEach(a => {
            const tabName = a.innerHTML.toLowerCase()
            if (tabName.includes(path)) {
                a.className += 'active'
            }
        })
    }

    auth(){
        if(!document.cookie.includes('jiachenuser')){
            window.location.assign('/blog')
        }

    }

    displayLogout() {
        if (document.cookie.includes('jiachenuser')) {
            return (
                <>
                    <li  ><a href='/manage'>Manage</a></li>
                    <li id='nav-login'><a href='/logout'>Logout</a></li>
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
                <li ><a href='/' id='logo'>Jia Chen</a></li>
                <li ><a href='/blog'>Blog</a></li>
                {
                    this.displayLogout()
                }
            </ul>



        );
    }
}



export default Nav;