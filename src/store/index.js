import { configureStore } from '@reduxjs/toolkit';

import filters from '../reducers/filters';
import heroes from '../components/heroesList/heroesSlice';


const stringMiddleware = () => (next) => (actions) => {
    if (typeof actions === 'string') {
        return next({
            type: actions
        })
    }
    return next(actions)
};

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;