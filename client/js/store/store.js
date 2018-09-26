import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import signInReducer from '../reducers/signInReducer';
import chatReducer from '../reducers/chatReducer';

const reducers = combineReducers({
    signInState: signInReducer,
    chatState: chatReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

