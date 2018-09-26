import _ from "lodash";
import axios from "axios";

import * as actionTypes from "../constants/actionTypes";


export const changeMessage = message => {
    return {type: actionTypes.MESSAGE_CHANGE, value: message};
};

export const validateMessage = message => {
    let error = null;
    if (!message.length)
        error = "Message mustn't be empty";
    else if (message.length > 255)
        error = "Length of the message mustn't be more than 255 symbols";

    if (error)
        return {type: actionTypes.MESSAGE_VALIDATE, value: message, error: error};

    return dispatch => {
        dispatch(sendMessage(message));
    };
};

const sendMessageStart = () => {
    return {type: actionTypes.MESSAGE_SEND_START};
};

const sendMessageSuccess = () => {
    return {type: actionTypes.MESSAGE_SEND_SUCCESS};
};

const sendMessageFailure = error => {
    return {type: actionTypes.MESSAGE_SEND_FAILURE, error: error};
};

const sendMessage = message => {
    return dispatch => {

        dispatch(sendMessageStart());

        axios({
            url: "/api/messages",
            method: 'post',
            responseType: 'json',
            data: {
                message: message
            }
        })
        .then(() => {
            dispatch(sendMessageSuccess());
            dispatch(listMessages());
        })
        .catch(error => {
            dispatch(sendMessageFailure(error.response.data.error));
        });
    }
};

const listMessageSuccess = messages => {
    return {type: actionTypes.MESSAGES_LIST_SUCCESS, messages: messages};
};

const listMessageFailure = error => {
    return {type: actionTypes.MESSAGES_LIST_FAILURE, error: error};
};

const listMessages = () => {
    return (dispatch, getState) => {
        let last = _.last(getState().chatState.messages);

        axios({
            url: "/api/messages" + (last ? '?last_id=' + last.id : ''),
            method: 'get',
            responseType: 'json'
        })
        .then(response => {
            dispatch(listMessageSuccess(response.data));
        })
        .catch(error => {
            dispatch(listMessageFailure(error.response.data.error));
        });
    }
};

export const listMessagesPeriodically = () => {
    return (dispatch, getState) => {
        let last = _.last(getState().chatState.messages);

        axios({
            url: "/api/messages" + (last ? '?last_id=' + last.id : ''),
            method: 'get',
            responseType: 'json'
        })
        .then(response => {
            dispatch(listMessageSuccess(response.data));
            setTimeout(() => dispatch(listMessagesPeriodically()), 5000);
        })
        .catch(error => {
            dispatch(listMessageFailure(error.response.data.error));
            setTimeout(() => dispatch(listMessagesPeriodically()), 5000)
        });
    }
};