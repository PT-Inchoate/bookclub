import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../firebase';

import './Auth.css';

export class Auth extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        errors: [],
        loading: false,
        prevLogin: true
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        console.log('props.match.path ', this.props.match.path)
        const { email, password, username, prevLogin } = this.state;

        const isLogin = this.props.match.path === '/login';
        const pageTitle = isLogin ? 'Login' : 'Sign Up';
        const descriptionLink = isLogin ? '/signup': '/login';
        const descriptionText = isLogin ? 'Don’t have an account?' : 'Have an account?';

        return (
            <div className="Auth-container">
                <form className="Auth-form" onSubmit={this.handleSubmit}>
                    <h1 className="Auth-form__title">Login</h1>
                    <div className="Auth-form__social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
 
                    {pageTitle !== 'Login' && (
                        <input
                            className="Auth-form__input"
                            onChange={this.handleChange}
                            value={username}
                            name="name"
                            type="text"
                            placeholder="Username"
                            autoComplete="off"
                        />
                    )}

                    <input 
                        className="Auth-form__input"
                        onChange={this.handleChange}
                        value={email}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                    /> 

                    <input 
                        className="Auth-form__input"
                        onChange={this.handleChange}
                        value={password}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />

                    <div className="Auth-checkbox">
                        {pageTitle === 'Login' && (
                            <Link to="/forgot" className="Auth-form__forgot">Forgot password?</Link>
                        )}    
                    </div>

                    <button 
                        className="button-primary Auth-btn" 
                    >
                        {pageTitle}
                    </button>

                </form>

                <div className="Auth-alternative">
                    <Link to={descriptionLink} 
                        className="color-grey-light"
                        onClick={() => (prevLogin => !prevLogin)}
                    >{descriptionText}</Link>
                </div>
                
            </div>
        )
    }
}

export default Auth;
