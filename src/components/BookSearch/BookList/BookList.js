import React from 'react';
import { Link } from "react-router-dom";

import './BookList.css';

const BookList = (props) => {
    // displays book search results
    return (
        <div className="BookList-container"> {
            props.books.map(book => {
            
                let image 
                if (book.image) {
                    image = book.image
                } else {
                    image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""
                }
                
            return (
                <Link to={{
                    pathname: `/books/${book.id}`,
                    state: {book}
                }} 
                key={book.id} 
                className="BookList-item"
                >
                    <div className="BookList-item__image">
                        <img src={image}/>
                    </div>

                    <div>
                        <div>{book.volumeInfo.title}</div>
                        <div>{book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Author is Unknown"  }</div>
                    </div>
                </Link>
            )
            })
        }
        </div>
    )
}

export default BookList;
