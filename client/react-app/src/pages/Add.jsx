import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
    cover: yup.string().required("Cover is required"),
});

const Add = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:8800/books", data);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title" {...register("title")} />
                {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}

                <input type="text" placeholder="Description" {...register("description")} />
                {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}

                <input type="number" placeholder="Price" {...register("price")} />
                {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}

                <input type="text" placeholder="Cover (image URL)" {...register("cover")} />
                {errors.cover && <p style={{ color: "red" }}>{errors.cover.message}</p>}

                <button className="form-button" type="submit">
                    Add
                </button>
            </form>
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Add;
