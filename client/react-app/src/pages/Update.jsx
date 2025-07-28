import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: 0,
        cover: ""
    });

    const handleChange = (e) => {
        setBook(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchBook = async () => {
            try {
            const res = await axios.get("http://localhost:8800/books/" + bookId);
            setBook(res.data);
            } catch (err) {
            console.log("Greška pri učitavanju knjige:", err);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleClick = async e => {
        e.preventDefault();

        try {
            await axios.put("http://localhost:8800/books/" + bookId, book);
            navigate("/");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="form">
            <h1>Update the Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title" value={book.title}/>
            <input type="text" placeholder="Description" onChange={handleChange} name="description" value={book.description}/>
            <input type="number" placeholder="Price" onChange={handleChange} name="price" value={book.price}/>
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover" value={book.cover}/>
            <button className="form-button" onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update;