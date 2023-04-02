import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { URL_BASE } from '../../constants'
import { Note, NotesState } from '../../types'


const initialState: NotesState = {
    entities: [],
    loading: 'idle',
    error: null,
    params: {
        page: {
            current: 1,
            isNext: false
        },
        limit: 5,
        programs: {},
        eventType: null,
        search: ''
    }
}

export const fetchNotes = createAsyncThunk<{data: Note[], isNextPage: boolean}, undefined, {state: RootState}>('notes/fetchNotes', async (_, {getState}) => {
    const params = getState().notes.params
    const limit = 'limit=' + params.limit
    const offset = params.page.current > 1 ? '&offset=' + (params.page.current - 1) * params.limit : ''
    const type = params.eventType !== null ? '&type=' + params.eventType : ''
    const programs = Object.keys(params.programs).length > 0 ? '&program=' + Object.keys(params.programs).join('&program=') : ''
    const search = params.search.trim().length > 0 ? '&search=' + params.search : ''

    const res = await fetch(URL_BASE + '/event/?' + limit + offset + search + type + programs)
    const data = await res.json()
    
    return {
        data: data.results.map((item: Note) => ({id: item.id, date: item.date, name: item.name, description: item.description, location: item.location, type: item.type})),
        isNextPage: data.next === null ? false : true
    }
})

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setPrograms: (state, action) => {
            if (action.payload in state.params.programs) {
                delete state.params.programs[action.payload]
            } else {
                state.params.programs[action.payload] = ''
            }
            state.params.page.current = 1
        },
        setEventType: (state, action) => {
            if (state.params.eventType === action.payload) {
                state.params.eventType = null
            } else {
                state.params.eventType = Number(action.payload)
            }
            state.params.page.current = 1
        },
        setSearch: (state, action) => {
            state.params.search = action.payload
        },
        shiftPageLeft: (state) => {
            state.params.page.current--
        },
        shiftPageRight: (state) => {
            state.params.page.current++
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.entities = action.payload.data
                state.params.page.isNext = action.payload.isNextPage
            })
    }
})

export const {} = notesSlice.actions

export const selectAllNotes = (state: RootState) => state.notes.entities
export const selectOneNote = (state: RootState, id: number) => state.notes.entities.find(item => item.id === id)
export const selectParams = (state: RootState) => state.notes.params
export const selectLoadingNotes = (state: RootState) => state.notes.loading

export const {setPrograms, setEventType, shiftPageLeft, shiftPageRight, setSearch} = notesSlice.actions

export default notesSlice.reducer