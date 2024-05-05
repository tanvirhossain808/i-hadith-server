const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
// const connectDb = require("./DB/hadith_db.db")

const PORT = process.env.PORT || 5000
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./DB/hadith_db.db", (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connected");
    }
})

app.get(`/bookDetails`, (req, res) => {
    const bookName = req.query.bookName;
    db.get(`SELECT * FROM books WHERE book_name = ?`, [bookName], (error, row) => {
        if (error) {
            throw new Error(error.message);
        }

        if (row) {
            // Book exists, return its details
            res.json({ bookDetails: row });
        } else {
            // Book doesn't exist
            res.json({ message: "Book not found" });
        }
    });
});


app.get(`/isTrue`, (req, res) => {
    const bookName = req.query.bookName;
    db.get(`SELECT * FROM books WHERE book_name = ?`, [bookName], (error, row) => {
        if (error) {
            throw new Error(error.message);
        }

        // If a row is returned, the book exists; otherwise, it doesn't
        const isTrue = !!row;
        console.log(isTrue);
        res.json({ isTrue });

    });
});


app.get("/", (req, res) => {

    db.all(`SELECT * FROM books`, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }
        res.send(row)
        // console.log(row);
    });
})
/* const sql = `SELECT * FROM chapter WHERE book_id = ?`;
app.get("/chapters", (req, res) => {
    console.log(req.query);
    db.all(`SELECT * FROM chapter WHERE book_id = ${req.query.bookId} AND  number  = ${req.query.hadishNo}`, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }
        res.send(row)
        // console.log(row);
    });
}) */
const sql = `SELECT * FROM chapter WHERE book_id = ?`;
app.get("/chapters", (req, res) => {
    console.log(req.query);
    db.all(`SELECT * FROM chapter WHERE book_id = ${req.query.bookId}`, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }
        res.send(row)
        // console.log(row);
    });
})

app.get("/hadith", (req, res) => {
    db.all(`SELECT * FROM hadith `, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }
        res.send(row)
        // console.log(row);
    });
})
app.get("/section", (req, res) => {
    db.all(`SELECT * FROM section `, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }
        res.send(row)
        // console.log(row);
    });
})


const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log("listing port" + " " + PORT)
        })
    }
    catch (error) {
        console.log(error);
    }
}

start()