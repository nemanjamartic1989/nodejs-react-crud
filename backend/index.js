import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodejs_react"
})

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get("/", (req, res) => {
    res.json("Backend part!")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.post("/books", (req, res) => {
    const now = new Date();
    const q = "INSERT INTO books (`title`, `description`, `cover`, `price`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8800, () => {
    console.log('Connected to backend!');
});