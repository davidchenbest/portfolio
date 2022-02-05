import React, { useState, useCallback, useEffect, useRef } from 'react'
import '../css/speech.css'

let SpeechRecognition;
let recognition
try {
    SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition = new SpeechRecognition()
} catch (error) {
    console.log('Browser may not use speech recognition')
    console.log(error);
}

const abortSpeak = () => {
    recognition.abort()
}

export default function Speech({ speechInput }) {
    const [speaking, setSpeaking] = useState(false)
    const timeRef = useRef(0)

    const speak = useCallback(
        () => {
            setSpeaking(true)
            recognition.start()
            timeRef.current = new Date().getTime()
        },
        [],
    )

    const resultEvent = useCallback(
        (e) => {
            const current = e.resultIndex
            const message = e.results[current][0].transcript
            speechInput(message)
        }, [speechInput]
    )

    const endEvent = useCallback(
        (e) => {
            setSpeaking(false)
            if (new Date().getTime() - timeRef.current < 2000) {
                alert('Browser may not use speech recognition')
            }
        },
        [],
    )

    useEffect(() => {
        if (speaking) {
            recognition.onresult = resultEvent
            recognition.addEventListener('end', endEvent);
        }
        return () => {
            window.removeEventListener("end", endEvent);
            window.removeEventListener("result", resultEvent);
        }
    }, [speaking, endEvent, resultEvent])


    return (
        <>
            {SpeechRecognition && <i className={`material-icons ${speaking ? 'speaking' : ''}`} onClick={speaking ? abortSpeak : speak} style={{ backgroundColor: speaking ? 'rgb(255, 211, 194)' : 'white' }} >&#xe8c8;</i>}
        </>
    )
}
