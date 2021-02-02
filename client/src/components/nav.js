import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom';
  
  export default function Nav() {
      const [slideMenu,setSlideMenu] = useState(false)

    const displayLogout =() => {
        if (document.cookie.includes('jiachenuser')) {
            return (
                <>
                    <li  ><NavLink activeClassName='active' to="/manage"  >Manage</NavLink></li>
                    <li id='nav-login'><a href='/logout'>Logout</a></li>
                </>
            )
        }
        return (
            <li id='nav-login' ><a href='/login'>Login</a></li>
        )
    }

    const displayMenu = () => {
        console.log(slideMenu);
        const menu = document.querySelector('.nav-list')
        if (!slideMenu) {
            menu.style.display = 'flex'
        }
        else menu.style.display = 'none'
        setSlideMenu(!slideMenu )
    }

      return (
        <nav>
        <motion.span animate={{ transition: { duration: .5, ease: 'easeInOut' }, scale: [1, 1.1, 1] }}><NavLink to='/' id='logo'>Jia Chen</NavLink></motion.span>
        <ul className='nav-list'>

            <li ><NavLink activeClassName='active' to="/blog"  >Blog</NavLink></li>
            <li ><NavLink activeClassName='active' to="/gallery"  >Gallery</NavLink></li>
            <li ><a rel="noopener noreferrer" target='_blank' href='https://drive.google.com/file/d/1GkDC0JBxphOvPf7A27iR5U8qU5E6iuCv/view?usp=sharing'>Resume</a></li>
            <li id='github' ><a rel="noopener noreferrer" target="blank" href="https://github.com/davidchenbest" ><motion.img whileTap={{ scale: 1.2 }} alt='github' src={require('../images/github.png')} /></a></li>
            {
                displayLogout()
            }
        </ul>


        <span className="material-icons menu-icon" onClick={()=> displayMenu()}>&#xe5d2;</span>


    </nav>
      )
  }