import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
            cover: "",
        },
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books/" + bookId);
                reset(res.data);
            } catch (err) {
                console.log("Error:", err);
            }
        };

        fetchBook();
    }, [bookId, reset]);

    const onSubmit = async (data) => {
        try {
            await axios.put("http://localhost:8800/books/" + bookId, data);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form">
            <h1>Update Book</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title" {...register("title")} />
                {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}

                <textarea placeholder="Description" rows={5} {...register("description")} className="textarea"/>
                {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}

                <input type="number" placeholder="Price" {...register("price")} />
                {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}

                <input type="text" placeholder="Cover (image URL)" {...register("cover")} />
                {errors.cover && <p style={{ color: "red" }}>{errors.cover.message}</p>}

                <button className="form-button" type="submit">
                    Update
                </button>
            </form>
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Update;
