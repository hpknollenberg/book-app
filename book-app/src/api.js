import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"


export const createUser = ({ newUsername, newPassword, firstName, lastName }) => {
    return axios({
        method: 'post',
        url: `${baseUrl}/create-user/`,
        data: {
            username: newUsername,
            password: newPassword,
            first_name: firstName,
            last_name: lastName
        }
    }).then(response => {
        console.log('CREATE USER: ', response)
    })
    .catch(error => {
        console.log('ERROR: ', error)
    })
}


export const fetchUser = ({ auth }) => {
    return axios({
        method: 'get',
        url: `${baseUrl}/profile/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }).then(response => {
        console.log('PROFILE: ', response)
    })
    .catch(error => {
        console.log('ERROR: ', error)
    })
}


export const getToken = ({ auth, username, password }) => {
    return axios.post(`${baseUrl}/token/`, {
        username: username,
        password: password
    }).then(response => {
        auth.setAccessToken(response.data.access)
    })
    .catch(error => {
        console.log('ERROR: ', error)
        auth.setAccessToken(undefined)
    })
}