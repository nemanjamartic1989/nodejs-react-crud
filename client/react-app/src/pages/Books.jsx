import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const result = await axios.get("http://localhost:8000/books");
                setBooks(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks()
    }, [])

    return (
        <div>
            <h1>Book</h1>
            <div className="books">
                {books.map(book => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt=""/>}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>{book.price}</span>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add new book</Link></button>
        </div>
    )
}

export default Books;