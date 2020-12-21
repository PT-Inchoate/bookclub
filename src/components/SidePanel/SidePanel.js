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
        return (
            <nav className="SidePanel-container">
                <div class="SidePanel-data">
                    <div class="SidePanel-logo">
                        <img src={logo} alt="profile_pic"/>
                    </div>

                    <div class="SidePanel-profile">
                        <div class="SidePanel-profile__avatar">
                            <img src={logo} alt="profile_pic"/>
                        </div>
                        <div class="SidePanel-profile__info">
                            <p class="profile_name">Alex John</p>
                        </div>
                    </div>  
                </div> 

                <ul className="SidePanel-nav">
                    <li className="SidePanel-nav__item">
                        <Link to="/" className="SidePanel-nav__link">
                            Dashboard
                        </Link>
                    </li>
                    <li className="SidePanel-nav__item">
                        <Link to="/" className="SidePanel-nav__link">
                            My Clubs
                        </Link>
                    </li>
                    <li className="SidePanel-nav__item">
                        <Link to="/" className="SidePanel-nav__link">
                            My Statistics
                        </Link>
                    </li>
                    <li className="SidePanel-nav__item">
                        <Link to="/" className="SidePanel-nav__link">
                            My Reads
                        </Link>
                    </li >
                </ul>

                <div className="SidePanel-logout">
                    <button onClick={this.handleLogout}>Log Out</button>
                </div>
            </nav>
        )
    }
}

export default withRouter(connect(null, null)(SidePanel));
