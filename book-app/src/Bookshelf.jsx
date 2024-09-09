import {useContext, useEffect, useState} from 'react'
import { AuthContext, UserContext } from './authContext'
import Tabs from './Tabs'
import { getBooks } from './api'

function Bookshelf() {
    const [bookshelf, setBookshelf] = useState([])
    const { auth } = useContext(AuthContext)
    const { user, setUser } = useContext(UserContext)
    
    useEffect(() => {
        getBooks({ auth, user })
        .then((response) => {
          setBookshelf(response.data)
        })
      }, [user])

    return (
        <div>
            <Tabs activeTab="bookshelf" />
            <div className="d-flex flex-wrap">
                {bookshelf && bookshelf.map(book => {
                    return(
                        <div key={book.id}>
                            <img src={book.image_link} />
                        </div>
                    ) 
                })}
            </div>
        </div>
    )

}

export default Bookshelf