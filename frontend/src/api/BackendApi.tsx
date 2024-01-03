import axios from "axios";

const BackendApi = (url: string) => {
    const client = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_BACKEND_URL + url,
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