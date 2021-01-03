import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

// import './PersonalReading.css';
import BookSearch from '../BookSearch/BookSearch';
import RecommendedBooks from './RecommendedBooks/RecommendedBooks';

class PersonalReading extends Component {
    state = {
        books: []
    }

    componentDidMount () {
    }

    render() {
        // list of books + progress + clickble books for more info

        return (
            <div className="PersonalReading-container">
                Personal Readings 
                <BookSearch />
            </div>
        )
    }
}

export default connect(null, null)(PersonalReading);
