import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import firebase from '../../firebase';
import logo from '../../Assets/books.png';

import './SidePanel.css';

class SidePanel extends Component {
    handleLogout = () => {
        firebase.auth().signOut()
            .then()
    }

    render() {
        console.log("side currentUser ", this.props.currentUser)
        const { currentUser } = this.props;
        // active - props.match

        return (
            <div className="SidePanel-container">
                <div className="SidePanel-logo">
                    <img src={logo} alt="profile_pic"/>
                </div>

                <ul className="SidePanel-nav">
                    <li className="SidePanel-nav__item">
                        <i className="SidePanel-nav__icon fas fa-columns"></i>
                        <Link to="/" className="SidePanel-nav__link">
                            Dashboard
                        </Link>
                    </li>
                    <li className="SidePanel-nav__item">
                        <i className="SidePanel-nav__icon fas fa-users"></i>
                        <Link to="/" className="SidePanel-nav__link">
                            My Clubs
                        </Link>
                    </li>
                    <li className="SidePanel-nav__item">
                        <i className="SidePanel-nav__icon fas fa-chart-bar"></i>
                        <Link to="/" className="SidePanel-nav__link">
                            My Statistics
                        </Link>
                    </li>
                    <li className="SidePanel-nav__item">
                        <i className="SidePanel-nav__icon fas fa-book"></i>
                        <Link to="/" className="SidePanel-nav__link">
                            My Reads
                        </Link>
                    </li >
                </ul>

                <div className="SidePanel-logout">
                    <div className="SidePanel-profile__avatar">
                        <img src={currentUser.photoURL} className="SidePanel-profile__avatar-image" alt="profile_pic"/>
                    </div>
                    <div className="SidePanel-profile__info">
                        <div className="SidePanel-profile__name">{currentUser.displayName}</div>
                        
                        <div className="SidePanel-profile__logout"
                        onClick={this.handleLogout}>Logout
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default withRouter(connect(null, null)(SidePanel));
