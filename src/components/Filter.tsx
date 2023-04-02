import React, { BaseSyntheticEvent, ReactNode, useEffect, useState } from 'react'
import { IS_MOBILE } from '../constants'
import { fetchFilters, selectAllFilters, selectLoadingFilters } from '../features/filters/filtersSlice'
import { selectParams, setEventType, setPrograms, setSearch } from '../features/notes/notesSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import MultipleOptions from './MultipleOptions'

const Filter = ({children}: {children: ReactNode}) => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectLoadingFilters)
    const filters = useAppSelector(selectAllFilters)
    const setParams = useAppSelector(selectParams)
    const [searchValue, setSearchValue] = useState(setParams.search)
    
    useEffect(() => {
        if (loading === 'idle') {
            dispatch(fetchFilters())
        }
    }, [loading])

    const radioHandler = (e: BaseSyntheticEvent) => {
        dispatch(setEventType(e.target.value))
    }

    const checkboxHandler = (e: BaseSyntheticEvent) => {
        dispatch(setPrograms(e.target.value))
    }

    const searchHandler = () => {
        dispatch(setSearch(searchValue))
    }

    return (
        <div className='filters container-filter'>
            <div className="filters__header">
                {
                    (IS_MOBILE && children) || 
                    <h1 className='filters__headline'>Filters</h1>   
                }
            </div>
            <form className="filters__set">
                <div className="filters__search">
                    <h2>Name</h2>
                    <input type="text" value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onBlur={searchHandler} />
                </div>
                <div className="filters__options">
                    <h2>Programs</h2>
                    {loading === 'succeeded' &&
                        <MultipleOptions programs={filters.programs}
                                            setPrograms={setParams.programs}
                                            clickHandler={checkboxHandler} />}
                    {(loading === 'pending') && <div>Loading</div>}
                    {(loading === 'failed') && <div>Error</div>}
                </div>
                <div className="filters__radio">
                    <h2>Event type</h2>
                    {loading === 'succeeded' && <div className="radio">
                        {filters.eventTypes.map(item => (
                            <div className="radio__item" key={item.id}>
                                <input className="radio__input" type="radio" name="radio" id={"event-type-" + item.id}
                                        value={item.id} checked={item.id === setParams.eventType ? true : false}
                                        onChange={radioHandler} />
                                <label className="radio__label" htmlFor={"event-type-" + item.id}>
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </div>}
                    {(loading === 'pending') && <div>Loading</div>}
                    {(loading === 'failed') && <div>Error</div>}
                </div>
            </form>
        </div>
    )
}

export default Filter