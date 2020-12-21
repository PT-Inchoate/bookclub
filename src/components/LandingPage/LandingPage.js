import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';

const LandingPage = () => (
    <div className="LandingPage-container">
        LandingPage
        <Link to="/login">Get Started</Link>
    </div>
)
  
export default LandingPage;
