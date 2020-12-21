import React from 'react';
import ReactDOM from 'react-dom';
import App from "./Components/App";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'

import store from './store';
import './index.css';

ReactDOM.render(<Provider store={store}>
    <Router>
        <App />
    </Router>
</Provider>, document.getElementById("root"));
