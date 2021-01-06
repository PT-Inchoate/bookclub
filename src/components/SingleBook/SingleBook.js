import React from 'react';

// import './SingleBook.css';

const SingleBook = (props) => {
    const { book } = props.location.state;
    console.log(' book ', book)


    return (
        <div className="SingleBook-container"> 
            SingleBook - {book.volumeInfo.title}
        </div>
    )
}

export default SingleBook;
