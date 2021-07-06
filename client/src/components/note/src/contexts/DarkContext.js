import React, { useState, createContext } from 'react'

export const DarkContext = createContext()

const DarkProvider = (props) => {
    const [colors] = useState(
        {
            dark: { background: '#424242', color: 'white' },
            light: { background: 'white', color: 'black' },
        }
    )
    const [isDark, setIsDark] = useState(false)
    const containerBackground = !isDark ? 'rgb(255, 211, 194)' : '#28282A'
    return (
        <DarkContext.Provider value={{ colors, isDark, setIsDark }}>
            <div style={{ background: containerBackground }}>

                {props.children}
            </div>
        </DarkContext.Provider>
    )
}

export default DarkProvider