import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/launch_digital_library_development"
})

class Book {
  constructor({ id, title, author, pageCount, page_count, description, fiction }) {
    this.id = id
    this.title = title
    this.author = author
    this.pageCount = pageCount || page_count
    this.description = description
    this.fiction = fiction
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM books;")

      const booksData = result.rows
      const books = booksData.map(book => new this(book))

      return books
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

  static async findById(id) {
    try {
      const query = "SELECT * FROM books WHERE id = $1;"
      const result = await pool.query(query, [id])

      const bookData = result.rows[0]
      const book = new this(bookData)

      return book

    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

  async save() {
    try {
      const query = "INSERT INTO books (title, author, page_count, description, fiction) VALUES ($1, $2, $3, $4, $5) RETURNING id;"
      const result = await pool.query(query, [this.title, this.author, this.pageCount, this.description, this.fiction])

      const newBookId = result.rows[0].id
      this.id = newBookId

      return true

    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

}

export default Book