import axiosRequest from '../services/axiosRequest'

// ==================
// GET 
// ==================

export const GetUsers = () => {
    //TODO
}
// ==================
// POST 
// ==================

export const LogUser = (user) => {
    axiosRequest.post('/login', user)
    .then((res) => {
        localStorage.setItem("token", res.data.token)
        console.log(res)
    })
    .catch((error) => {
        if (error.response) {
            console.log(error.response.data.message)
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
    }) 
}
// ==================
// PUT 
// ==================

// ==================
// DELETE 
// ==================
