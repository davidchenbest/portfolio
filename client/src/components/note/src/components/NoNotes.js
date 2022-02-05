import React,{useContext} from 'react'
import { DarkContext } from '../contexts/DarkContext'
import { motion } from "framer-motion";
import {scaleVariant} from '../framer-motion/motion'


export default function NoNotes() {
    const { isDark, colors } = useContext(DarkContext)
  const { background, color } = isDark ? colors.dark : colors.light
    return (
        <motion.span id='noNotes' style={{ background, color }}
            variants={scaleVariant} initial="initial" animate="animate"
        >No notes available</motion.span>
    )
}
