import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import SidePanel from './SidePanel/SidePanel';
import Auth from './Auth/Auth';
import Dashboard from './Dashboard/Dashboard';
import Statistics from './Statistics/Statistics';
import Club from './Club/Club';
import PersonalReading from './PersonalReading/PersonalReading';
import SingleBook from './SingleBook/SingleBook';


import { setUser, clearUser } from './../store';
import firebase from '../firebase';

import './App.css';

class App extends Component {
    componentDidMount() {
        //redirecting exsting user
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                let allUserData;
                const db = firebase.firestore();

                firebase.database().ref('users').child(user.uid).once('value')
                .then((data) => {
                    let fetchedData = data.val()

                    allUserData = {...fetchedData, ...user};
                    this.props.setUser(allUserData);
                    // console.log('this.props.history -----> ', this.props.location.pathname)
                    this.props.history.push(this.props.location.pathname);  // currently active path
                })
            }
            else {
                this.props.history.push('/login');
                this.props.clearUser();
            }
        });
    }

    render() {
        const {isLoggedIn , currentUser } = this.props;
        // console.log("this.props logg ", this.props)

        // default routes
        let routes = (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Auth} />
                <Route exact path="/signup" component={Auth} />
            </Switch>
        );

        // routes for authenticated users
        if (isLoggedIn) {
            routes = (
                <div className="App-view">
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/reads" component={PersonalReading} />
                        <Route exact path="/clubs" component={Club} />
                        <Route exact path="/stats" component={Statistics} />
                        <Route exact path="/books/:id" component={SingleBook} />
                    </Switch>
                </div>
            );
        }

        return (
            <div className={isLoggedIn ? 'App-container' : null}>
                {isLoggedIn ? <SidePanel currentUser={currentUser}/> : null }
                    {routes}
            </div>
        )
    }
}

const mapState = state => {
    return {
        currentUser: state.user,
        isLoggedIn: !!state.user.uid
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
