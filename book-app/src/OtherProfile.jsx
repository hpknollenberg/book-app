import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOtherBooks, getOtherProfile } from "./api"
import { AuthContext } from "./authContext"

function OtherProfile() {
    const { username } = useParams()
    const {auth} = useContext(AuthContext)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [bookshelf, setBookshelf] = useState([])

    
    useEffect(() => {
        getOtherProfile({auth, username})
        .then((response) => {
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
        })
    }, [])

    useEffect(() => {
        getOtherBooks({auth, username})
        .then((response) => {
            setBookshelf(response.data)
        })
    }, [])

    return (
        <div>
            <h1>{username}</h1>
            <h5>{firstName} {lastName}</h5>
            <hr></hr>
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

export default OtherProfile