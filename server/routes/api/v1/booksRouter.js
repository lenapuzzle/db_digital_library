import express from "express"

import Book from "../../../models/Book.js"

const booksRouter = new express.Router()

booksRouter.get("/", async (req, res) => {
  // res.send("<p>Hello</p>")
  // your code here
  try {
    const books = await Book.findAll()

    res.json({ books: books })
  } catch (error) {
    console.error(`Error: ${error}`)
    res.status(500).json({ error: error })
  }
})

booksRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const result = await Book.findById(id)

    res.json({ book: result })

  } catch (error) {
    console.error(`Error: ${error}`)
    res.status(500).json({ error: error })
  }
})

booksRouter.post("/", async (req, res) => {
  try {
    const newBook = new Book(req.body)
    console.log(req.body)
    console.log(newBook)
    await newBook.save()
    console.log(newBook)
    res.json({ newBook: newBook })
  } catch (error) {
    console.log(error)
    res.json({ errors: error })
  }
})

export default booksRouter