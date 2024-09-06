import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./authContext"

function Header() {
    const { auth } = useContext(AuthContext)
  
  
  function submit() {
    auth.setAccessToken([])
  }

    return (
        <div style={{ padding: '10px', color: 'white', backgroundColor: 'black'}} className="d-flex justify-content-between">
          <div style={{ fontWeight: 'bold' }}>Margins</div>
          <Link style={{ marginRight: '10px', color: "white" }} to='/login' onClick={() => {submit()}}>Logout</Link>
        </div>
      )
}

export default Header