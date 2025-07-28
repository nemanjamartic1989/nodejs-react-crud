import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    });

    const handleChange = (e) => {
        setBook(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    const [error,setError] = useState(false)
    const navigate = useNavigate();

    const handleClick = async e => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/books", book)
            navigate("/");
        } catch {
            console.log(err);
            setError(true)
        }
    }

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="Description" onChange={handleChange} name="description"/>
            <input type="number" placeholder="Price" onChange={handleChange} name="price"/>
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover"/>
            <button className="form-button" onClick={handleClick}>Add</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    )
}

export default Add;