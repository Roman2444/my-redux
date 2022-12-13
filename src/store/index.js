import { configureStore } from '@reduxjs/toolkit';

import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

// const store = createStore(
//     combineReducers({heroes, filters}), 
//     compose(applyMiddleware(thunk),
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );

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