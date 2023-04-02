import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { URL_BASE } from "../../constants";
import { Filters, FiltersState, Note } from "../../types";

const initialState: FiltersState = {
    entities: {
        eventTypes: [],
        programs: []
    },
    loading: 'idle',
    error: null
}

export const fetchFilters = createAsyncThunk<Filters, undefined>('filters/fetchFilters', async () => {
    const resProgram = await fetch(URL_BASE + '/program')
    let data = await resProgram.json()
    const dataProgram = data.results

    const resType = await fetch(URL_BASE + '/config/eventtype')
    data = await resType.json()
    const dataType = data.results
    
    return {
        eventTypes: dataType,
        programs: dataProgram.map((item: Note) => ({id: item.id, name: item.name}))
    }
})

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.entities = action.payload
            })
            .addCase(fetchFilters.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
    }
})

export const selectAllFilters = (state: RootState) => state.filters.entities
export const selectLoadingFilters = (state: RootState) => state.filters.loading

export default filtersSlice.reducer