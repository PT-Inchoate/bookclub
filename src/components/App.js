import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../store';

import Auth from './Auth/Auth';
import Dashboard from './Dashboard/Dashboard';

import logo from './logo.svg';
import './App.css';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/login" component={Auth} />
                            <Route exact path="/signup" component={Auth} /> 
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App
