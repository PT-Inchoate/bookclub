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
        usersRef: firebase.database().ref('users'),
        currentUser: null
    }

    componentDidMount () {
        let user = firebase.auth().currentUser;
        this.setState({
            currentUser: user
        });
    }

    render() {
        const { currentUser } = this.props;
        // const { userOnState } = this.state;
        console.log("in dashboard  state ", this.state)
        // console.log("in state   ", this.state.userOnState)
        // console.log("in dashboard currentUser displayName ", currentUser.displayName)

          // Landing page
        //   return !currentUser.email ? 
        //       <LandingPage /> 
        //       : (
        //           <div className="Dashboard-container">
        //               <div className="Dashboard-navigation">
        //                   <SidePanel currentUser={currentUser}/>
        //               </div>
        //               <div className="Dashboard-view">Dashboard
        //                   <header className="App-header">
        //                       <img src={logo} className="App-logo" alt="logo" />
                      
        //                       <button className="button-primary">learn more</button>
        //                       <button className="button-primary__big">learn more</button>
                              
        //                       <p style={{color: "rgb(244,89,89)"}}>
        //                         Bookclub
        //                       </p>
        //                   </header>
        //               </div>
        //           </div>
        //       )
        return !currentUser.email ? 
            <Spinner /> 
                : (
                    !currentUser.email ?
                    <LandingPage /> :
                    <div className="Dashboard-container">
                        <SidePanel currentUser={currentUser}/>
                        <div className="Dashboard-view">
                            <div className="Dashboard-user">                        
                                {/* <button className="button-primary">learn more</button>
                                <button className="button-primary__big">learn more</button> */}
                                
                                <div style={{color: "rgb(244,89,89)"}}>
                                    Bookclub
                                </div>
                                <div>Hi, {currentUser.displayName}!</div>
                            </div>
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
