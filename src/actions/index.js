export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const heroesDeleted = (id) => {
    return {
        type: 'HEROES_DELETED',
        payload: id
    }
}

export const heroesAdded = (hero) => {
    return {
        type: 'HEROES_ADDED',
        payload: hero
    }
}

export const setActiveFilter = (filter) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: filter
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}