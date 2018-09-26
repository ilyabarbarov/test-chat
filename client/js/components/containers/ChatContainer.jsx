import React from "react";
import {connect} from "react-redux";

import * as actions from "../../actions/chatActions";

import Chat from "../Chat";

const mapStateToProps = (state) => {
    return {
        messages: state.chatState.messages,
        message: state.chatState.message,
        sending: state.chatState.sending,
        error: state.chatState.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeMessage: message => dispatch(actions.changeMessage(message)),
        validateMessage: message => dispatch(actions.validateMessage(message)),
        listMessagesPeriodically: () => dispatch(actions.listMessagesPeriodically())
    };
};

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default ChatContainer;