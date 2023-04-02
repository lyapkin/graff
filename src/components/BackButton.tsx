import React from 'react'
import BackArrow from '../media/BackArrow.svg'

type Props = {
    name: string,
    click: () => void
}
const BackButton = ({name, click}: Props) => {

    return (
        <button className='back-btn' onClick={click}>
            <BackArrow />
            <p>{name}</p>
        </button>
    )
}

export default BackButton