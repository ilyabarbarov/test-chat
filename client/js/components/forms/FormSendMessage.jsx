import React from "react";

export default class FormSendMessage extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.refs.message.value = this.props.message.value;
        this.refs.message.focus();
    }

    componentDidUpdate() {
        this.refs.message.value = this.props.message.value;
    }
    
    onChange(e) {
        if (this.props.onChange)
            this.props.onChange(e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onSubmit)
            this.props.onSubmit(this.refs.message.value.trim());
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input className="form-input form-control_80"
                        ref="message"
                        disabled={this.props.sending}
                        onChange={this.onChange}
                        maxLength={255} />
                    <button className="form-button form-control_20" disabled={this.props.sending}>Send</button>
                </div>
                {this.props.message.error && (
                    <div className="form-group">
                        <div className="form-error">{this.props.message.error}</div>
                    </div>
                )}
            </form>
        );
    }
};