import React from "react";

export default class Messages extends React.Component {
    render() {
        return (
            <div className="messages">
                <div className="messages-wrapper" >
                    {this.props.items.map(item => {
                        return (
                            <div className="messages-item" key={item.id}>
                                <span className="messages-user">{item.username}:</span>
                                <span className="messages-text">{item.message}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
};