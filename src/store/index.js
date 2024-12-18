import { createStore, combineReducers } from 'redux';
import { chatReducer } from './reducers/chatReducer';

const rootReducer = combineReducers({
    chat: chatReducer
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);