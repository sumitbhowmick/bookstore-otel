import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("/api/books");
    setBooks(res.data);
  };

  const addBook = async () => {
    await axios.post("/api/books", { title, author });
    setTitle("");
    setAuthor("");
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookstore</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={addBook} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </div>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="mb-2">
            {book.title} by {book.author}
            <button
              onClick={() => deleteBook(book._id)}
              className="ml-4 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}