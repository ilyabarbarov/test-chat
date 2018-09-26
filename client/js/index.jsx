import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import ChatContainer from "./components/containers/ChatContainer";
import SignInContainer from "./components/containers/SignInContainer";

import store from "./store/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ChatContainer} />
                <Route path="/sign-in" component={SignInContainer} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.querySelector(".root"));
