import { useContext, useState } from "react"
import { AuthContext } from "./authContext"
import { createUser, getToken } from "./api"
import { useNavigate } from "react-router-dom"

function Login() {
    const { auth } = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const CreateNewUser = () => {
        const [newUsername, setNewUsername] = useState("")
        const [newPassword, setNewPassword] = useState("")
        const [firstName, setFirstName] = useState("")
        const [lastName, setLastName] = useState("")

        const submitNewUser = () => {
            createUser({ newUsername, newPassword, firstName, lastName})
            .then(() => getToken({ auth, username, password }))
            .then(() => navigate("/"))
        } 

        return (
            <div>
                <h1>Create New User</h1>
                <div>
                    <div>Username:</div>
                    <input
                        onChange={(e) => setNewUsername(e.target.value)}
                        value={newUsername}
                    />
                </div>

                <div>
                    <div>Password:</div>
                    <input
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                    />
                </div>

                <div>
                    <div>First Name:</div>
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </div>

                <div>
                    <div>Last Name:</div>
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <button onClick={() => submitNewUser()}>Submit</button>
                </div>
            </div>

        )
    }

    const submitLogin = () => {
        getToken({ auth, username, password })
        .then(() => navigate("/"))
    }

    return (
        <div className='p-5'>
            <h1>Login</h1>
            <div>
                <div>Username: </div>
                <input 
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>

            <div>
                <div>Password: </div>
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <div style={{ marginTop: 20 }}>
                <button onClick={() => submitLogin()}>Submit</button>
            </div>
            <hr></hr>
            <CreateNewUser />
        </div>
    )
}

export default Login