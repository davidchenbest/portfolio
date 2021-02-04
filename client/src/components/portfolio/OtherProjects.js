import React from 'react'
import { motion } from 'framer-motion'


export default function OtherProjects() {
    const otherProject = (e) => {
        let element = e.target.querySelector('a')
        if (element) element.click()
    }
    return (
        <div className='other-projects' onClick={(e) => otherProject(e)}>
            <h2 className='second-title'>Other Projects</h2>
            <div className='otherProject'>
                <a rel="noopener noreferrer" target="_blank" href='https://jiachen.netlify.com/'>
                    <span>Portfolio/Blog/Gallery</span>
                </a>
                <a rel="noopener noreferrer" target="_blank" href='https://github.com/davidchenbest/portfolio' ><motion.img whileTap={{ scale: 1.2 }} alt='github' src={require('../../images/github.png')} id="gitIcon" /></a>
            </div>
            <div className='otherProject'>
                <a rel="noopener noreferrer" target="_blank" href='https://jianotes.web.app/'>
                    <span>Note app</span>
                </a>
                <a rel="noopener noreferrer" target="_blank" href='https://github.com/davidchenbest/note-app' ><motion.img whileTap={{ scale: 1.2 }} alt='github' src={require('../../images/github.png')} id="gitIcon" /></a>
            </div>
            <div className='otherProject'>
                <a rel="noopener noreferrer" target="_blank" href='https://university-search-program.herokuapp.com/'>
                    <span>St. John’s Class Search Program</span>
                </a>
                <a rel="noopener noreferrer" target="_blank" href='https://github.com/davidchenbest/university-search-program' ><motion.img whileTap={{ scale: 1.2 }} alt='github' src={require('../../images/github.png')} id="gitIcon" /></a>
            </div>
            <div className='otherProject'>
                <a rel="noopener noreferrer" target="_blank" href='https://sudoku-jia.web.app/'>
                    <span>Sudoku game</span>
                </a>
                <a rel="noopener noreferrer" target="_blank" href='https://github.com/davidchenbest/sudoku' ><motion.img whileTap={{ scale: 1.2 }} alt='github' src={require('../../images/github.png')} id="gitIcon" /></a>
            </div>
            <div className='otherProject'>
                <a rel="noopener noreferrer" target="_blank" href='https://davidchenbest.github.io/paint-app/index.html'>
                    <span>Paint app</span>
                </a>
                <a rel="noopener noreferrer" target="_blank" href='https://github.com/davidchenbest/paint-app' ><motion.img whileTap={{ scale: 1.2 }} alt='github' src={require('../../images/github.png')} id="gitIcon" /></a>
            </div>

        </div>
    )
}
