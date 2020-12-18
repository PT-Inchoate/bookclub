import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../firebase';

import './Auth.css';

export class Auth extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        errors: {},
        loading: false,
        prevLogin: true
    }

    isFormValid = ({ email, password }) => email && password;

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    //checking values that were set on state from login form
    handleInputErrors = values => {
        // Email Errors
        if (!values.email) {
            this.setState(prevState => ({
                errors: {                   
                    email: 'Email required'      
                }
            }))
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            this.setState(prevState => ({
                errors: {                   
                    email: 'Invalid email address'      
                }
            }))
        }
        // Password Errors
        if (!values.password) {
            this.setState(prevState => ({
                errors: {                   
                    password: 'Password required'   
                }
            }))
        } else if (values.password.length < 6) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors.password,                    
                    password: 'Password must be at least 6 characters'      
                }
            }))
        }
        else {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors.password,                    
                    password: ''      
                }
            }))
        }
      }

    handleSubmit = event => {
        event.preventDefault();
        this.handleInputErrors(this.state);
        console.log('this.setState ', this.state)

        if(this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);   
        }
    }

    render() {
        const { email, password, username, prevLogin, errors } = this.state;

        const isLogin = this.props.match.path === '/login';
        const pageTitle = isLogin ? 'Login' : 'Sign Up';
        const linkTitle = isLogin ? 'Sign Up' : 'Login';
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

                    { errors.email && <p className="Auth-error">{ errors.email }</p>}

                    <input 
                        className="Auth-form__input"
                        onChange={this.handleChange}
                        value={password}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />

                    { errors.password && <p className="Auth-error">{ errors.password }</p>}

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
                    >{descriptionText}<span>{linkTitle}</span></Link>
                </div>
                
            </div>
        )
    }
}

export default Auth;
