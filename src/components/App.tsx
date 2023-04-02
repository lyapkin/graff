import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './Main'
import FullNote from './FullNote'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchNotes, selectParams } from '../features/notes/notesSlice'

const App = () => {
    const dispatch = useAppDispatch()
    const params = useAppSelector(selectParams)
    
    useEffect(() => {
        dispatch(fetchNotes())
    }, [params])
    return (
        <Routes>
            <Route index element={<Main />} />
            <Route path=':id' element={<FullNote />} />
        </Routes>
    )
}

export default App