import React from 'react';
import index from 'react-spinners-css/dist/Facebook';

import './SingleBook.css';

const SingleBook = (props) => {
    const { book } = props.location.state;
    console.log(' book ', book)
    console.log(' book 2', book.volumeInfo.imageLinks.thumbnail)
    


    return (
        <div className="SingleBook-container">
            <div className="SingleBook-container__title">Book Details</div>

            <div className="SingleBook-image">
                <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""}/>
            </div> 

            <div className="SingleBook-title">
                <div>{book.volumeInfo.title}</div>
                <div>{book.volumeInfo.authors[0]}</div>
            </div>

            <div className="SingleBook-rating">
                Rating: {book.volumeInfo.averageRating}
            </div>

            <div className="SingleBook-info">
                <div>Pages: {book.volumeInfo.pageCount}</div>
                <div>Language: {book.volumeInfo.language}</div> 
                <div>Published: {book.volumeInfo.publishedDate.slice(0,4)}</div>
            </div>
            
            {/* <p>{book.volumeInfo.description.slice(book.volumeInfo.description.indexOf('“') ? book.volumeInfo.description.indexOf('“') : book.volumeInfo.description.indexOf('"'))}</p> */}

            <p className="SingleBook-description">{book.volumeInfo.description}</p>

            <div className="SingleBook-borrow"><button>Borrow</button></div>
        </div>
    )
}

export default SingleBook;
