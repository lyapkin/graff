import React from 'react'
import { selectAllNotes, selectLoadingNotes } from '../features/notes/notesSlice'
import { useAppSelector } from '../hooks'

import NoteShort from './NoteShort'

const List = () => {
    const notes = useAppSelector(selectAllNotes)
    const loading = useAppSelector(selectLoadingNotes)
    
    const content = notes.map((item) => <NoteShort key={item.id} data={item} />)

    return (
        <ul className='list'>
            {(loading === 'pending') && <div>Loading</div>}
            {(loading === 'succeeded') && content}
            {(loading === 'failed') && <div>Error</div>}
        </ul>
    )
}

export default List