import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [searchTerm, setSearchTerm] = useState("dogs")
  const [title, setTitle] = useState("")

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
    .then((response) => {
      console.log(response.data)
    })
  }, [])

  return (
    <div>
      <h1>Book App</h1>
    </div>
  )
}

export default App
