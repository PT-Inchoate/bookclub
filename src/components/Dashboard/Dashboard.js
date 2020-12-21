import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingPage from '../LandingPage/LandingPage';
import SidePanel from '../SidePanel/SidePanel';

import { setUser, clearUser } from '../../store';
import firebase from '../../firebase';
import logo from '../logo.svg'

import './Dashboard.css';

class Dashboard extends Component {

    render() {
        const { currentUser } = this.props;
        console.log("in dashboard currentUser ", currentUser)

          // Landing page
          return !currentUser.email ? 
              <LandingPage /> 
              : (
                  <div className="Dashboard-container">
                      <div className="Dashboard-navigation">
                          <SidePanel/>
                      </div>
                      <div className="Dashboard-view">Dashboard
                          <header className="App-header">
                              <img src={logo} className="App-logo" alt="logo" />
                      
                              <button className="button-primary">learn more</button>
                              <button className="button-primary__big">learn more</button>
                              
                              <p style={{color: "rgb(244,89,89)"}}>
                                Bookclub
                              </p>
                          </header>
                      </div>
                  </div>
              )
    }
}

const mapState = state => {
    return {
        currentUser: state.user
    }
}

export default connect(mapState, null)(Dashboard);
