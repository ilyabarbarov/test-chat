import _ from "lodash";
import * as actionTypes from "../constants/actionTypes";

const initialState = {sending: false, message: {value: '', error: null}, messages: [], error: null};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MESSAGES_LIST_SUCCESS:
            return {...state, messages: _.unionBy(state.messages, action.messages, 'id')};
        case actionTypes.MESSAGES_LIST_FAILURE:
            return {...state, error: action.error};
        case actionTypes.MESSAGE_CHANGE:
            return {...state, message: {value: action.value, error: null}};
        case actionTypes.MESSAGE_VALIDATE:
            return {...state, message: {value: action.value, error: action.error}};
        case actionTypes.MESSAGE_SEND_START:
            return {...state, sending: true};
        case actionTypes.MESSAGE_SEND_SUCCESS:
            return {...state, sending: false, message: {value: '', error: null}};
        case actionTypes.MESSAGE_SEND_FAILURE:
            return {...state, sending: false, error: action.error};
    }

    return state;
};

export default chatReducer;