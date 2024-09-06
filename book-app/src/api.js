import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"


export const createBook = ({ auth }, user, authors, title, imageLink) => {
    return axios({
        method: 'post',
        url: `${baseUrl}/create-book/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
        data: {
            user: user,
            authors: authors,
            title: title,
            image_link: imageLink
        }
    })
}


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
        return response
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
        auth.setAccessToken([])
    })
}