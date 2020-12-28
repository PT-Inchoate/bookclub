import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import Auth from './Auth/Auth';
import Dashboard from './Dashboard/Dashboard';

import { setUser, clearUser } from './../store';
import firebase from '../firebase';

import './App.css';

class App extends Component {
    componentDidMount() {
        //redirecting exsting user
        firebase.auth().onAuthStateChanged(user => {
            console.log('that user', user)
            if(user) {
                this.props.setUser(user);
                this.props.history.push('/');                
            }
            else {
                this.props.history.push('/login');
                this.props.clearUser();
            }
        });
    }

    render() {
        return (
            // <div className="container">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/login" component={Auth} />
                    <Route exact path="/signup" component={Auth} /> 
                </Switch>
            // </div>
        )
    }
}

const mapState = state => {
    return {
        currentUser: state.user
    }
}

const mapDispatch = dispatch => {
    return {
        setUser(user) {
            dispatch(setUser(user))
        },
        clearUser() {
            dispatch(clearUser())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(App));
