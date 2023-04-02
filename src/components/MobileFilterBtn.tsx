import React from 'react'
import FilterLogo from '../media/Filters.svg'

type Props = {
    showFilters: () => void
}

const MobileFilterBtn = ({showFilters}: Props) => {
    return (
        <button className='filter-btn' onClick={showFilters}>
            <FilterLogo />
            <p>Filters</p>
        </button>
    )
}

export default MobileFilterBtn