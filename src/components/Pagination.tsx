import React, { BaseSyntheticEvent } from 'react'
import { selectParams, shiftPageLeft, shiftPageRight } from '../features/notes/notesSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import Left from '../media/Chevron_Left.svg'
import Right from '../media/Chevron_Right.svg'

const Pagination = () => {
    const params = useAppSelector(selectParams)
    const dispatch = useAppDispatch()
    
    const handleLeftClick = (e: BaseSyntheticEvent) => {
        if (params.page.current > 1 ) {
            dispatch(shiftPageLeft())
        }
    }

    const handleRightClick = (e: BaseSyntheticEvent) => {
        if (params.page.isNext) {
            dispatch(shiftPageRight())
        }
    }
    return (
        <div >
            <div className='pagination'>
                <button onClick={handleLeftClick}><Left /></button>
                <p className='pagination__number'>{params.page.current}</p>
                <button onClick={handleRightClick}><Right /> </button>
            </div>
        </div>
    )
}

export default Pagination