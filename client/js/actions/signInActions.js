import axios from "axios";

import * as actionTypes from "../constants/actionTypes";

export const changeUsername = username => {
    return {type: actionTypes.USERNAME_CHANGE, value: username};
};

export const validateUsername = username => {
    let error = null;
    if (!username.length)
        error = "Username mustn't be empty";
    else if (username.length > 32)
        error = "Length of the username mustn't be more than 32 symbols";

    if (error)
        return {type: actionTypes.USERNAME_VALIDATE, value: username, error: error};

    return dispatch => {
        dispatch(signIn(username));
    };
};

const signInSend = () => {
    return {type: actionTypes.SIGN_IN_SEND_START};
};

const signInSuccess = () => {
    return {type: actionTypes.SIGN_IN_SEND_SUCCESS};
};

const signInFailure = () => {
    return {type: actionTypes.SIGN_IN_SEND_FAILURE};
};

export const signIn = (username) => {
    return dispatch => {
        dispatch(signInSend());

        axios({
            url: "/api/login",
            method: 'post',
            responseType: 'json',
            data: {
                username: username
            }
        })
        .then(() => {
            dispatch(signInSuccess());
            setImmediate(() => window.location.href = '/');
        })
        .catch(() => {
            dispatch(signInFailure());
        });
    }
};