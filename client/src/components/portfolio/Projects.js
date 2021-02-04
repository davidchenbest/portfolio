import React from 'react'
import { motion } from 'framer-motion'

export default function Projects() {
    const largeImg = (e) => {
        window.open(e.target.src);
    }
    const imgClick = (e) => {
        window.location.href = '#'
        const selection = e.target.dataset.number
        document.querySelector(`.portSection div.port-screen.${selection}`).style.display = 'grid'
    }
    const exitScreen = (e) => {
        e.target.parentNode.style.display = 'none'
    }

    return (
        <div className='portSection'>
            <h2 className='title'>Portfolio & Projects</h2>
            <div className='portSelect'>
                <motion.div
                    whileHover={{ y: '-5px' }}

                    className='img-section' >
                    <motion.img whileTap={{ scale: 1.2 }} alt='Broadfeet' onClick={imgClick} src={require('../../images/bf1.JPG')} data-number='one' id='port-img' />
                    <h3>Inventory Management</h3>
                    <p>Automotive application design for business to business use</p>
                    <div className='techDes'>
                        <div>Node Express EJS MongoDB</div>
                        <a rel="noopener noreferrer" target="blank" href="http://inventory.broadfeet.com" id='inventory app' ><i className="material-icons">&#xe879;</i></a>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ y: '-5px' }}

                    className='img-section' >
                    <motion.img whileTap={{ scale: 1.2 }} alt='flashcard' onClick={imgClick} src={require('../../images/flash1.JPG')} data-number='two' id='port-img' />
                    <h3>Flashcard</h3>
                    <p>Personal studying tool design with simple features</p>
                    <div className='techDes'>
                        <div> Node Express  React MongoDB</div>
                        <a rel="noopener noreferrer" target="blank" href="https://github.com/davidchenbest/flashcards-app" id='github' ><motion.img whileTap={{ scale: 1.2 }} alt='github' src={require('../../images/github.png')} /></a>
                    </div>
                </motion.div>
            </div>

            <div className='port-screen one'>
                <span className='exit-screen' onClick={exitScreen}>X</span>
                <div className='screen-img-con'>
                    <motion.img whileTap={{ scale: 1.2 }} alt='Broadfeet' src={require('../../images/bf1.JPG')} id='screen-img' onClick={largeImg} />
                    <motion.img whileTap={{ scale: 1.2 }} alt='Broadfeet' src={require('../../images/bf2.JPG')} id='screen-img' onClick={largeImg} />
                    <motion.img whileTap={{ scale: 1.2 }} alt='Broadfeet' src={require('../../images/bf3.JPG')} id='screen-img' onClick={largeImg} />
                </div>
                <div>
                    <h1 className='screen-title'>Inventory Management</h1>
                    <p>This full stack website, developed entirely by me, was aim as a  automotive inventory system that takes quickbook files and calculates number of products in the inventory for each part number. </p>
                    <p>It supports product search through part number or car's year, make, model, and submodel.</p>
                    <p>With a login feature that enables the system admin to add/remove users as well as assigning different access and roles to each user. </p>
                    <p>There is also product management tabs that allow admin to download report of inventory via CSV. </p>
                    <p>Allows adding/modifying products through part number and  product description such as fitment and dimension.</p>
                    <a rel="noopener noreferrer" target='_blank' href='http://inventory.broadfeet.com/' className='button'> Try it out</a>
                </div>
            </div>
            <div className='port-screen two'>
                <span className='exit-screen' onClick={exitScreen}>X</span>
                <div className='screen-img-con'>
                    <motion.img whileTap={{ scale: 1.2 }} alt='flashcard' src={require('../../images/flash1.JPG')} id='screen-img' onClick={largeImg} />
                    <motion.img whileTap={{ scale: 1.2 }} alt='flashcard' src={require('../../images/flash2.JPG')} id='screen-img' onClick={largeImg} />
                </div>
                <div>
                    <h1 className='screen-title'>Flashcard</h1>
                    <p>This is a flashcard app developed for personal use.</p>
                    <p>Easy to understand minimalistic design web app for efficient studying with convenient navigation functions</p>
                    <a rel="noopener noreferrer" target='_blank' href='https://flashcard-jia.web.app/' className='button'> Try it out</a>
                </div>
            </div>

        </div>
    )
}
