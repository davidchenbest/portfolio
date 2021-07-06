import React from 'react'
import './App.css';
import DarkMode from './components/DarkMode'
import NoteContainer from './components/NoteContainer'
import DarkProvider from './contexts/DarkContext'

function App() {
  return (
    <div className='noteApp'>
      <DarkProvider>
        <DarkMode></DarkMode>
        <NoteContainer></NoteContainer>
      </DarkProvider>
    </div>
  );
}

export default App;
