import React, { BaseSyntheticEvent, useState } from 'react'
import { Programs } from '../types'

type Props = {
    programs: Programs[],
    setPrograms: {[id: number]: string},
    clickHandler: (e: BaseSyntheticEvent) => void
}

const MultipleOptions = ({programs, setPrograms, clickHandler}: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div className='select'>
            <button className={'select__dropdown' + ((isOpen && ' select__dropdown--up') || ' select__dropdown--down')}
                    type='button' onClick={() => setIsOpen(!isOpen)}>
                {'Chosen ' + Object.keys(setPrograms).length}
            </button>
            <div className={"select__options" + ((isOpen && ' select__options--open') || ' select__options--close')} >
                {programs.map(item => (
                    <div className="select__option" key={item.id}>
                        <input className='select__input' type="checkbox" id={"program" + item.id} value={item.id}
                            checked={item.id in setPrograms}
                            onChange={clickHandler} />
                        <label className='select__label' htmlFor={"program" + item.id}>{item.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MultipleOptions