import React from "react";

import FormSignIn from "./forms/FormSignIn";

export default class SignIn extends React.Component {
    render() {
        return (
            <div className="sign-in">
                <div className="sign-in-panel">
                    <FormSignIn
                        sending={this.props.sending}
                        username={this.props.username}
                        onChange={this.props.changeUsername}
                        onSubmit={this.props.validateUsername} />
                </div>
            </div>
        );
    }
};
