import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import firebase from '../../firebase';
import logo from '../../Assets/books35.png';

import './SidePanel.css';

class SidePanel extends Component {
    handleLogout = () => {
        firebase.auth().signOut()
            .then()
    }

    render() {
        console.log("side currentUser ", this.props.currentUser)
        const { currentUser } = this.props;

        // active nav link
        const { location } = this.props;

        const dashboardClass = location.pathname === "/" ? "SidePanel-nav__link--active" : "SidePanel-nav__item";
        const clubClass = location.pathname.match(/^\/clubs/) ? "SidePanel-nav__link--active" : "SidePanel-nav__item";
        const statsClass = location.pathname.match(/^\/stats/) ? "SidePanel-nav__link--active" : "SidePanel-nav__item";
        const readsClass = location.pathname.match(/^\/reads/) ? "SidePanel-nav__link--active" : "SidePanel-nav__item";

        return (
            <div className="SidePanel-container">
                <div className="SidePanel-logo">
                    <h3><a href="/"><img src={logo} alt="logo" /> Bookclub</a></h3>
                    
                    {/* <img src={logo} alt="profile_pic"/> */}
                </div>

                <ul className="SidePanel-nav">
                    <li className={dashboardClass}>
                        <i className="SidePanel-nav__icon fas fa-columns"></i>
                        <Link to="/" className="SidePanel-nav__link">
                            Dashboard
                        </Link>
                    </li>
                    <li className={clubClass}>
                        <i className="SidePanel-nav__icon fas fa-users"></i>
                        <Link to="/clubs" className="SidePanel-nav__link">
                            My Clubs
                        </Link>
                    </li>
                    <li className={statsClass}>
                        <i className="SidePanel-nav__icon fas fa-chart-bar"></i>
                        <Link to="/stats" className="SidePanel-nav__link">
                            My Statistics
                        </Link>
                    </li>
                    <li className={readsClass}>
                        <i className="SidePanel-nav__icon fas fa-book"></i>
                        <Link to="/reads" className="SidePanel-nav__link">
                            My Reads
                        </Link>
                    </li >
                </ul>

                <div className="SidePanel-logout">
                    <div className="SidePanel-profile__avatar">
                        <img src={currentUser.avatar} className="SidePanel-profile__avatar-image" alt="profile_pic"/>
                    </div>
                    <div className="SidePanel-profile__info">
                        <div className="SidePanel-profile__name">{currentUser.username}</div>
                        
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
