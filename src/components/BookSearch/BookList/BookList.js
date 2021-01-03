import React from 'react';

import './BookList.css';

const BookList = (props) => {
    // displays book search results
    return (
        <div className="list"> {
            props.books.map(book => {
            
                let image 
                if (book.image) {
                    image = book.image
                } else {
                    image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""
                }
                
            return (
                <div key={book.id}>
                    <div>{book.volumeInfo.title}</div>
                    <div>{book.volumeInfo.authors[0]}</div>
                    <img src={image}/>
                </div>
            )
            })
        }
        </div>
    )
}

export default BookList;
