const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [
        {"name": "all", "label": "Все"},
        {"name": "fire", "label": "Огонь"},
        {"name": "water", "label": "Вода"},
        {"name": "wind", "label": "Ветер"},
        {"name": "earth", "label": "Земля"}
      ],
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
            
        default: return state
    }
}

export default reducer;