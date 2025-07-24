import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

    const navigate = useNavigate();

    const handleClick = async e => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/books", book)
        } catch {

        }
    }

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="Description" onChange={handleChange} name="description"/>
            <input type="number" placeholder="Price" onChange={handleChange} name="price"/>
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover"/>
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add;