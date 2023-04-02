import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { selectOneNote } from '../features/notes/notesSlice'
import { useAppSelector } from '../hooks'
import { Note } from '../types'
import { formatDate } from '../utils'
import BackButton from './BackButton'

const FullNote = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const note = useAppSelector((state) => selectOneNote(state, Number(id))) as Note
    const date = formatDate(new Date(note.date))

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className="container main-screen">
            <div className='page'>
                <BackButton name={'Back'} click={goBack} />
                <h1 className='page__headline'>{note?.name}</h1>
                <div className='page__attributes'>
                    <div className="page__attribute">
                        <h3>Date</h3>
                        <p>{date}</p>
                    </div>
                    <div className="page__attribute">
                        <h3>Location</h3>
                        <p>{note?.location}</p>
                    </div>
                    <div className="page__attribute">
                        <h3>Type</h3>
                        <p>{note?.type.name}</p>
                    </div>
                </div>
                <div className="page__description">
                    <h3>Description</h3>
                    <p>{note?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default FullNote