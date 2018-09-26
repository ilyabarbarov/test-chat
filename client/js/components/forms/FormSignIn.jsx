import React from "react";

export default class FormSignIn extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.refs.username.value = this.props.username.value;
        this.refs.username.focus();
    }

    componentDidUpdate() {
        this.refs.username.value = this.props.username.value;
    }

    onChange(e) {
        if (this.props.onChange)
            this.props.onChange(e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onSubmit)
            this.props.onSubmit(this.refs.username.value.trim());
    }

    render() {
        let form = this;

        return (
            <form className="form form_center" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input className="form-input"
                        id="username"
                        ref="username"
                        disabled={this.props.sending}
                        onChange={this.onChange}
                        autoComplete="off"
                        maxLength={32} />
                </div>
                {this.props.username.error && (
                    <div className="form-group">
                        <div className="form-error">{this.props.username.error}</div>
                    </div>
                )}
                <div className="form-group">
                    <button className="form-button" disabled={this.props.sending}>Sign in</button>
                </div>
            </form>
        );
    }
};