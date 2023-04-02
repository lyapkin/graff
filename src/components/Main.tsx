import React, { useState } from 'react'
import { IS_MOBILE } from '../constants'
import BackButton from './BackButton'
import Filter from './Filter'

import List from './List'
import MobileFilterBtn from './MobileFilterBtn'
import Pagination from './Pagination'

const Main = () => {
    const [isFiltersShown, setIsFiltersShown] = useState(!IS_MOBILE)

    const showFilters = () => {
        setIsFiltersShown(true)
    }

    const hideFilters = () => {
        setIsFiltersShown(false)
    }

    return (
        <div className='wrapper'>
            {
            (!isFiltersShown || !IS_MOBILE) &&
                <div className='container main-screen'>
                    <h1 className='headline'>Space events</h1>
                    {IS_MOBILE && <MobileFilterBtn showFilters={showFilters} />}
                    <List />
                    <Pagination />
                </div>
            }
            {
            isFiltersShown &&
                <Filter>
                    <BackButton name={'Back'} click={hideFilters} />
                </Filter>
            }
        </div>
    )
}

export default Main