import * as actionTypes from '../constants/actionTypes'

const initialState = {sending: false, username: {value: '', error: null}};

const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERNAME_CHANGE:
            return {...state, username: {value: action.value, error: null}};
        case actionTypes.USERNAME_VALIDATE:
            return {...state, username: {value: action.value, error: action.error}};
        case actionTypes.SIGN_IN_SEND_START:
            return {...state, sending: true};
        case actionTypes.SIGN_IN_SEND_SUCCESS:
            return {...state, sending: false, username: {value: '', error: null}};
        case actionTypes.SIGN_IN_SEND_FAILURE:
            return {...state, sending: false};
    }

    return state;
};

export default signInReducer;