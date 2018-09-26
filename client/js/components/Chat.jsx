import React from "react";

import FormSendMessage from "./forms/FormSendMessage";
import Messages from "./Messages";

export default class Chat extends React.Component {
    componentDidMount() {
        if (this.props.listMessagesPeriodically)
            this.props.listMessagesPeriodically();
    }

    render() {
        return (
            <div className="chat">
                <div className="chat-panel">
                    <div className="chat-block chat-block_up">
                        <Messages
                            items={this.props.messages} />
                    </div>
                    <div className="chat-block chat-block_down">
                        <FormSendMessage
                            message={this.props.message}
                            sending={this.props.sending}
                            onChange={this.props.changeMessage}
                            onSubmit={this.props.validateMessage} />
                    </div>
                </div>
                {this.props.error && (
                    <div className="chat-error">{this.props.error}</div>
                )}
            </div>
        );
    }
};