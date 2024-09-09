import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext, UserContext } from "./authContext"
import { createBook, fetchUser, getBooks } from "./api"
import Tabs from './Tabs'

function App() {
  const { auth } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [books, setBooks] = useState([])
  const [bookshelf, setBookshelf] = useState([])

  useEffect(() => {
    fetchUser({ auth })
    .then((response) => {
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)
      setUser(response.data.id)
    })
  }, [auth.accessToken])

  useEffect(() => {
    getBooks({ auth, user })
    .then((response) => {
      setBookshelf(response.data)
    })
  }, [user])

  const search = (searchTerm) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
    .then((response) => {
      console.log(response.data.items)
      setBooks(response.data.items)
    })
  }

  const Books = () => {
    

    const addToBookshelf = (bookTitle, bookAuthors, bookImage) => {
      createBook({auth}, user, bookAuthors, bookTitle, bookImage)
    }


    return (
      <div>
        {books && books.map(book => {
          const [show, setShow] = useState(false)

          return (
            <div key={book.id} style={{borderStyle: "dashed", height: "200px"}} className="d-flex">
              <p className="p-2"> 
              <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : ""} style={{height: "100%",objectFit: "contain"}} />
              {!show ? <button className="m-1" onClick={() => setShow(!show)}>Options</button> : <button className="m-1" onClick={() => setShow(!show)}>Close Options</button>}
              <strong className="m-1">{book.volumeInfo.title} </strong> 
              by {book.volumeInfo.authors && (book.volumeInfo.authors.length === 1 ? book.volumeInfo.authors : book.volumeInfo.authors.map((author, i) => {return i < book.volumeInfo.authors.length - 1 ? author + " and " : author}))}
              </p>
              {show && 
              <div>
                <button className="m-1" onClick={() => addToBookshelf(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.imageLinks.smallThumbnail)}>Add to Bookshelf</button>
              </div>}
              
            </div>
          )
        })}
      </div>
    )
  }


  const Bookshelf = () => {
    return (
      <div className="d-flex flex-wrap">
        {bookshelf && bookshelf.map(book => {
          return(
            <div key={book.id}>
              <img src={book.image_link} />
            </div>
          ) 
        })}
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

  return (
    <div>
      <Tabs activeTab="search"/>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="col-lg-6 col-12 p-5">
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
        <div className="col-lg-6 col-12 p-5">
          <div className="d-flex justify-content-center">
            <h1>⬇️BOOKSHELF⬇️</h1>
          </div>
          <div className="d-flex justify-content-center">
            <Bookshelf />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
