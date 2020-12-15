import React, { Component } from 'react';
import { motion } from 'framer-motion'



class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {

            slideMenu: false
        };

    }
    componentDidMount() {
        let path = window.location.pathname
        path = path.split('/')
        path = path[1]
        if (path === '') path = 'home'
        else if (path === 'manage') this.auth()
        let aArr = document.querySelectorAll('.nav-list li a')
        aArr.forEach(a => {
            const tabName = a.innerHTML.toLowerCase()
            if (tabName.includes(path)) {
                a.className += 'active'
            }
        })
    }

    auth() {
        if (!document.cookie.includes('jiachenuser')) {
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

    displayMenu = () => {
        const menu = document.querySelector('.nav-list')
        if (!this.state.slideMenu) {
            menu.style.display = 'flex'
        }
        else menu.style.display = 'none'
        this.setState({ slideMenu: !this.state.slideMenu })
    }





    render() {
        return (
            <nav>
                <motion.a animate={{ transition: { duration: .5, ease: 'easeInOut' }, scale: [1, 1.1, 1] }} href='/' id='logo'>Jia Chen</motion.a>
                <ul className='nav-list'>

                    <li ><a href='/blog'>Blog</a></li>
                    <li ><a rel="noopener noreferrer" target='_blank' href='https://drive.google.com/file/d/1GkDC0JBxphOvPf7A27iR5U8qU5E6iuCv/view?usp=sharing'>Resume</a></li>
                    <li id='github' ><a rel="noopener noreferrer" target="blank" href="https://github.com/davidchenbest" ><motion.img whileTap={{ scale: 1.2 }} alt='github' src={require('../images/github.png')} /></a></li>
                    {
                        this.displayLogout()
                    }
                </ul>


                <span className="material-icons menu-icon" onClick={this.displayMenu}>&#xe5d2;</span>


            </nav>

        );
    }
}



export default Nav;