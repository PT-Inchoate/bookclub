import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingPage from '../LandingPage/LandingPage';
import SidePanel from '../SidePanel/SidePanel';
import Spinner from '../UI/Spinner';

import { setUser, clearUser } from '../../store';
import firebase from '../../firebase';
import logo from '../logo.svg'

import './Dashboard.css';

class Dashboard extends Component {
    state = {
        // usersRef: firebase.database().ref('users'),
        currentUser: null
    }

    componentDidMount () {
        // let user = firebase.auth().currentUser;
        // this.setState({
        //     currentUser: user
        // });

        // firebase.auth().onAuthStateChanged(user => {
        //     this.setState({
        //         currentUser: user
        //     });
        // });
    }

    render() {
        const { currentUser } = this.props;
        // const { userOnState } = this.state;
        console.log("in dashboard  props ", this.props)
        console.log("in dashboard  state ", this.state)

        return !currentUser.email ? 
            <Spinner /> 
                : (
                    !currentUser.email ?
                    <LandingPage /> :
                    // <div className="Dashboard-container">
                    //     <SidePanel currentUser={currentUser}/>
                        // <div className="Dashboard-view">
                            <div className="Dashboard-container">                       
                                <div style={{color: "rgb(244,89,89)"}}>
                                    Bookclub
                                </div>
                                <div>Hi, {currentUser.username}!</div>

                                <div></div>
                                <div></div>
                            </div>
                        // </div>
                    // </div>
                )
    }
}

const mapState = state => {
    return {
        currentUser: state.user
    }
}

export default connect(mapState, null)(Dashboard);
