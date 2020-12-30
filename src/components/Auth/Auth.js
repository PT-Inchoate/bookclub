import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'md5';

import firebase from '../../firebase';
import image from '../../Assets/login_image.svg';
import './Auth.css';

export class Auth extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        errors: {},
        loading: false,
        prevLogin: true,
        firebaseError: null,
        usersRef: firebase.database().ref('users')
    }

    isFormValid = ({ email, password }) => email && password;

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    //checking values that were set on state from login form
    handleInputErrors = (values, pageTitle )=> {
        let isError = false;

        // Email Errors
        if (!values.email) {
            this.setState(prevState => ({
                errors: {                   
                    email: 'Email required'      
                }
            }))
            isError = true;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            this.setState(prevState => ({
                errors: {                   
                    email: 'Invalid email address'      
                }
            }))
            isError = true;
        }
        // Password Errors
        if (!values.password) {
            this.setState(prevState => ({
                errors: {                   
                    password: 'Password required'   
                }
            }))
            isError = true;
        } else if (values.password.length < 6) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors.password,                    
                    password: 'Password must be at least 6 characters'      
                }
            }))
            isError = true;
        }
        else {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors.password,                    
                    password: ''      
                }
            }))
        }

        if (pageTitle !== 'Login') {
            if (!values.username) {
                this.setState(prevState => ({
                    errors: {                   
                        username: 'Username required'   
                    }
                }))
                isError = true;
            }
        }

        return isError;
    }

    handleSubmit = pageTitle => event => {
        const { errors, username } = this.state;
        event.preventDefault();
        const validationErrors = this.handleInputErrors(this.state, pageTitle);
        
        if(pageTitle === 'Login') {
            if(this.isFormValid(this.state) && validationErrors !== true) {
                this.setState({ errors: [], loading: true });
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then(signedInUser => {
                        this.setState({
                            currentUser: signedInUser,
                            loading: false
                        });
                    })
                    .catch(err => {
                        console.error("Authentication Error", err.message);
                        let firebaseError = err.message.slice(0, err.message.indexOf('.')+1) + ' Please try again';
                        this.setState({ firebaseError, loading: false });
                    });
            }
        }
        else {
            if(this.isFormValid(this.state) && username && validationErrors !== true) {
                this.setState({ errors: [], loading: true });
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    this.state.usersRef.child(createdUser.user.uid).set({
                        username: this.state.username,
                        avatar: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    });
                })
                .catch(err => {
                    console.error("Authentication Error", err.message);
                    let firebaseError = err.message.slice(0, err.message.indexOf('.')+1) + ' Please try again';
                    this.setState({ firebaseError, loading: false });
                });
            }
        }
    }

    // saveUser = createdUser => {
    //     console.log('createUser ',createdUser)
    //     return this.state.usersRef.child(createdUser.user.uid).set({
    //         username: createdUser.user.displayName,
    //         avatar: createdUser.user.photoURL
    //     });
    // }

    render() {
        const { email, password, username, prevLogin, errors, firebaseError } = this.state;
        const isLogin = this.props.match.path === '/login';
        const pageTitle = isLogin ? 'Login' : 'Sign Up';
        const linkTitle = isLogin ? 'Sign Up' : 'Login';
        const descriptionLink = isLogin ? '/signup': '/login';
        const descriptionText = isLogin ? 'Don’t have an account?' : 'Have an account?';
        const descriptionSubtext = isLogin ? 'or use your account' : 'or use your email for registration';

        return (
            <div className="Auth-container">
                {/* Left side of the auth page */}
                <div className="Auth-image-container">
                    <div className="Auth-image">
                        <img src={image} alt="illustration intro"/>
                    </div>
                    <div className="Auth-polygon"></div>
                </div>

                {/* Auth form */}
                <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={this.handleSubmit(pageTitle) }>
                    <h1 className="Auth-form__title">{pageTitle}</h1>
                    <div className="Auth-form__social-container">
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <h2 className="Auth-form__subtitle"><span>{descriptionSubtext}</span></h2>
 
                    {pageTitle !== 'Login' && (
                        <input
                            className={errors.username ? "Auth-form__input-error" : "Auth-form__input"}
                            onChange={this.handleChange}
                            value={username}
                            name="username"
                            type="text"
                            placeholder="Username"
                            autoComplete="off"
                        />
                    )}

                    { errors.username && <p className="Auth-error">{ errors.username }</p>}
                     
                    <input 
                        className={errors.email ? "Auth-form__input-error" : "Auth-form__input"}
                        onChange={this.handleChange}
                        value={email}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                    /> 

                    { errors.email && <p className="Auth-error">{ errors.email }</p>}

                    <input 
                        className={errors.password ? "Auth-form__input-error" : "Auth-form__input"}
                        onChange={this.handleChange}
                        value={password}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />

                    { errors.password && <p className="Auth-error">{ errors.password }</p>}
                    {firebaseError && <p className="Auth-error">{firebaseError}</p>}

                    <div className="Auth-checkbox">
                        <label>
                            <input type="checkbox"/>
                            <span></span>
                            <small className="rmb">Remember me</small>
                        </label>
                        
                        {pageTitle === 'Login' && (
                            <Link to="/forgot" className="Auth-form__forgot">Forgot password?</Link>
                        )}    
                    </div>

                    <button 
                        className="button-primary Auth-form__btn" 
                    >
                        {pageTitle}
                    </button>

                    <hr className="Auth-devider"/>

                </form>

                <div className="Auth-alternative">
                    <Link to={descriptionLink} 
                        className="color-grey-light"
                        onClick={() => (prevLogin => !prevLogin)}>
                        {descriptionText}<span>{linkTitle}</span>
                    </Link>
                </div>
                </div>

            </div>
        )
    }
}

export default Auth;
