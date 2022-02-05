import React, { useContext } from 'react'
import { DarkContext } from '../contexts/DarkContext'

export default function DarkMode() {


    const { isDark, setIsDark, colors } = useContext(DarkContext)
    const { background, color } = !isDark ? colors.dark : colors.light



    const setting = () => {
        setIsDark(!isDark)

    }

    return (
        <span id='darkMode' onClick={() => setting()} style={{ background, color }}>{isDark ? 'Light' : 'Dark'}</span>
    )
}
