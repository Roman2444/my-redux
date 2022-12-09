const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }

        case 'HEROES_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter(el => el.id!==action.payload),
                heroesLoadingStatus: 'idle'
            }

        case 'HEROES_ADDED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesLoadingStatus: 'idle'
            }

        case 'SET_ACTIVE_FILTER':
            return {
                ...state,
                activeFilter: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filter: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
            
        default: return state
    }
}

export default reducer;