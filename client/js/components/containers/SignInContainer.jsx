import React from "react";
import {connect} from "react-redux";

import * as actions from "../../actions/signInActions";

import SignIn from "../SignIn";

const mapStateToProps = state => {
    return {
        sending: state.signInState.sending,
        username: state.signInState.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUsername: username => dispatch(actions.changeUsername(username)),
        validateUsername: username => dispatch(actions.validateUsername(username))
    };
};

const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInContainer;