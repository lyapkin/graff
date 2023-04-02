import { SerializedError } from "@reduxjs/toolkit"

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed'

export type Note = {
    id: number,
    name: string,
    date: string,
    description: string,
    location: string,
    type: {
        id: number,
        name: string
    }
}

export type Params = {
    page: {
        current: number,
        isNext: boolean
    },
    limit: number,
    programs: {
        [id: number]: string
    },
    eventType: number | null,
    search: string
}

export type NotesState = {
    entities: Note[],
    loading: Loading,
    error: null | SerializedError,
    params: Params
}

type EventTypes = {
    id: number,
    name: string
}
export type Programs = {
    id: number,
    name: string
}
export type Filters = {
    eventTypes: EventTypes[],
    programs: Programs[]
}

export type FiltersState = {
    entities: Filters,
    loading: Loading,
    error: null | SerializedError
}