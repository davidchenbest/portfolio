import React from 'react'
import { motion } from 'framer-motion'
import { slideDownVariant, fadeVariant } from '../framerMotion/motion'

export default function LandingContent() {
    return (
        <motion.div
            variants={slideDownVariant}
            initial='initial'
            animate='end'
            className='landing-content'>
            <motion.div
                className='img-con'>
                <motion.img whileTap={{ scale: 1.2 }} alt='Profile' src={require('../../images/pfp.jpg')} id='pfp' />
                <div >
                    <h1 id="name" >Jia Chen</h1>
                    <p className='description ' >Continuous Learning</p>

                </div>
            </motion.div>


            <motion.p
                variants={fadeVariant}
            >Software engineer pursuing software development <br /> with vision to create interactive and functional applications. </motion.p>
            <a href='mailto:davidchen108@gmail.com' className='button'>Get In Touch</a>
        </motion.div>
    )
}
