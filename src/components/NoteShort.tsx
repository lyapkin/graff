import React from 'react'
import { Link } from 'react-router-dom'
import { Note } from '../types'
import { formatDate } from '../utils'

type Props = {
    data: Note
}
const NoteShort = ({data}: Props) => {
    const date = formatDate(new Date(data.date))
    
    return (
        <li className='list__item'>
            <Link to={'/' + data.id}>
                <h2 className='list__headline'>{data.name}</h2>
                <div className='list__attributes'>
                    <div className="list__attribute">
                        <h3>Date</h3>
                        <p>{date}</p>
                    </div>
                    <div className="list__attribute">
                        <h3>Type</h3>
                        <p>{data.type.name}</p>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default NoteShort