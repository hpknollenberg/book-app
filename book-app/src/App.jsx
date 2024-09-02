import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [searchTerm, setSearchTerm] = useState("Blood Meridian")
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
    .then((response) => {
      console.log(response.data.items)
      setBooks(response.data.items)
    })
  }, [searchTerm])

  const Books = () => {
    return (
      <div>
        {books && books.map(book => {
          return (
            <div key={book.id}>
              <p><strong>{book.volumeInfo.title}</strong> by {book.volumeInfo.authors && (book.volumeInfo.authors.length === 1 ? book.volumeInfo.authors : book.volumeInfo.authors.map((author, i) => {return i < book.volumeInfo.authors.length - 1 ? author + " and " : author}))}</p>
            </div>
          )
        })}
      </div>
    )
  }
  
  const SearchBox = () => {
    const [typedTerm, setTypedTerm] = useState("")

    return (
      <div>
        <input value={typedTerm} onChange={e => setTypedTerm(e.target.value)}/>
        <button onClick={() => setSearchTerm(typedTerm)}>Search</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Book App</h1>
      <SearchBox />
      <Books />
    </div>
  )
}

export default App
