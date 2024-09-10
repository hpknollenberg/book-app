import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext, UserContext } from "./authContext"
import { createBook, fetchUser, getBooks } from "./api"
import Tabs from './Tabs'
import { Button, Modal } from 'react-bootstrap'
import TextField from '@mui/material/TextField'

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

          const handleClose = () => setShow(false)
          const handleShow = () => setShow(true)

          return (
            <div key={book.id} style={{borderStyle: "dashed", width: '100%'}} className="d-flex justify-content-between align-items-between">
              <p className="d-flex align-items-center col-8"> 
                <div className="d-flex flex-wrap align-items-center m-1" style={{borderRight: 'solid'}}>
                  <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""} style={{width: '100%', height:'100%', objectFit: "fit-content"}} />
                </div>
                <div className="m-1 col-6">
                  <strong>{book.volumeInfo.title} </strong> 
                  <p>by {book.volumeInfo.authors && (book.volumeInfo.authors.length === 1 ? book.volumeInfo.authors : book.volumeInfo.authors.map((author, i) => {return i < book.volumeInfo.authors.length - 1 ? author + " and " : author}))}</p>
                </div>
              </p>
              <div className='m-1 d-flex flex-column justify-content-start align-items-end col-4'>
                <Button variant="dark" className="me-2" onClick={() => addToBookshelf(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.imageLinks.thumbnail)}>Add to Bookshelf</Button>
                <Button variant="secondary" className="m-2" onClick={handleShow}>
                  Review Book
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add a review for {book.volumeInfo.title}:</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <TextField multiline="true" style={{width: '100%'}}></TextField>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="dark" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
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
        <div className="p-5 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex justify-content-center">
            <h1>⬇️SEARCH HERE⬇️</h1>
          </div>
          <div className="d-flex justify-content-center">
            <SearchBox />
          </div>
          <div className='col-12 col-sm-6' style={{borderStyle: "solid"}}>
            <Books />
          </div>
        </div>

        
      </div>
  )
}

export default App
