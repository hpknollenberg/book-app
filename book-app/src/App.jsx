import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from "./authContext"
import { fetchUser } from "./api"

function App() {
  const { auth } = useContext(AuthContext)

  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [title, setTitle] = useState("")

  const search = (searchTerm) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
    .then((response) => {
      console.log(response.data.items)
      setBooks(response.data.items)
    })
  }

  const Books = () => {

    const addToBookshelf = (bookTitle, bookAuthors) => {
      setAuthors(bookAuthors)
      setTitle(bookTitle)
    }

    return (
      <div>
        {books && books.map(book => {
          return (
            <div key={book.id}>
              <p style={{borderStyle: "dashed"}}> 
              <img src={book.volumeInfo.imageLinks.smallThumbnail} />
              <button className="m-1" onClick={() => addToBookshelf(book.volumeInfo.title, book.volumeInfo.authors)}>Add</button> 
              <strong>{book.volumeInfo.title} </strong> 
              by {book.volumeInfo.authors && (book.volumeInfo.authors.length === 1 ? book.volumeInfo.authors : book.volumeInfo.authors.map((author, i) => {return i < book.volumeInfo.authors.length - 1 ? author + " and " : author}))}
              </p>
              
            </div>
          )
        })}
      </div>
    )
  }


  const Bookshelf = () => {
    return (
      <div>
        <p><strong>{title} </strong> by {authors && (authors.length === 1 ? authors : authors.map((author, i) => {return i < authors.length - 1 ? author + " and " : author}))}</p>
      </div>
    )
  }


  
  const SearchBox = () => {
    const [typedTerm, setTypedTerm] = useState("")

    return (
      <div className="p-2">
        <input value={typedTerm} onChange={e => setTypedTerm(e.target.value)}/>
        <button onClick={() => search(typedTerm)}>Search</button>
      </div>
    )
  }

  const submit = () => {
    fetchUser({ auth })
  }

  return (
    <div className="d-flex flex-wrap justify-content-center">
      <div className="col-lg-6 col-11 p-5">
        <div className="d-flex justify-content-center">
          <h1>⬇️SEARCH HERE⬇️</h1>
        </div>
        <div className="d-flex justify-content-center">
          <SearchBox />
        </div>
        <div style={{borderStyle: "solid"}}>
          <Books />
        </div>
        
      </div>
      <div className="col-lg-6 col-11 p-5">
        <h1>⬇️BOOKSHELF⬇️</h1>
        <Bookshelf />
          <div>
            <button onClick={() => submit()}>Fetch Profile</button>
          </div>
      </div>
    </div>
  )
}

export default App
