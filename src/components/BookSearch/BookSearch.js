import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import BookList from './BookList/BookList';

class BookSearch extends Component {
    state = {
        books: [],
        searchInput: '',
    }

    componentDidMount () {

    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    } 

    handleSearch = (event) => {
        event.preventDefault()
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchInput}`)
        .then(res => {
            console.log("res res ", res.data)
            this.setState({
                books: res.data.items
            })
        })
        .catch(err => console.error(err))
    }

    render() {
        console.log("this.state books ", this.state.books)
        return (
            <div className="container">
                <form onSubmit={this.handleSearch} >
                    <input className="search-box" name="searchInput" 
                        onChange={this.handleChange}  type="text" placeholder="Search Books Here"/>
                </form>

                { this.state.books ? (
                    <BookList 
                        books={this.state.books} 
                    />
                    )
                    : null
                }
            </div>
        )
    }
}

export default connect(null, null)(BookSearch);
