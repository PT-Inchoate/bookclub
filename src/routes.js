import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import App from './components/App';

import firebase from './firebase';

class Routes extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={App} />
            </Switch>
        )
    }
}

const mapState = state => {
    
}

const mapDispatch = dispatch => {
    return {
        
    }
}

export default withRouter(connect(mapState, mapDispatch)(Routes));