import axios from "axios";

const BackendApi = (url) => {
    const client = axios.create({
        baseURL: "http://192.168.43.96:8080" + url,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })

    client.interceptors.response.use(response => {
        return response
    }, function (error) {
        console.log('An error occurred while calling backend', error)
        if (error.response) {
            if (error.response.status === 404) {
                return {status: error.response.status}
            }
            return Promise.reject(error.response)
        } else if (error.request) {
            console.log('The request was made but no response was received')
        }
    })

    return client
}

export default BackendApi;