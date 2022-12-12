import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

const store = createStore(
    combineReducers({heroes, filters}), 
    compose(applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;