const express = require('express');
const {v4: uuid} = require('uuid');

class Book {
    constructor(
        id = uuid(),
        title = "",
        description = "",
        authors =  "",
        favorite = "",
        fileCover = "",
        fileName =  ""){
            this.id = id
            this.title = title
            this.description = description
            this.authors = authors
            this.favorite = favorite
            this.fileCover = fileCover
            this.fileName = fileName
        }
}

const stor = {
    book: [
        new Book(),
        new Book(),
    ],
};

const app = express();

app.use(express.json())

app.get('/api/books', (req, res) => {
    const {book} = stor;
    res.json(book)
})

app.get('/api/books/:id', (req, res) => {
    const {book} = stor
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if (idx !== -1){
        res.json(book[idx])
    }
    else {
        res.status(404)
        res.json('404 || Page not found')
    }
})

app.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
})

app.post('/api/books', (req, res) => {
    const {book} = stor
    const {title, description} = req.body

    const newBook = new Book(uuid(), title, description)
    book.push(newBook)

    res.status(201)
    res.json(newBook)
}
)

app.put('api/books/:id', (req, res) => {
    const {book} = stor
    const {title, description} = req.body
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if (idx !== -1){
        book[idx] = {
            ...book[idx],
            title,
            description,
        }

        res.json(book[idx])
    }
    else{
        res.status(404)
        res.json('404 || Page not found')
    }
})

app.delete ('/api/books/:id', (req, res) => {
    const {book} = stor
    const id = req.params
    const idx = book.findIndex(el => el.id === id)

    if (idx !== -1){
        book.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json("404 || Page not found")
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)