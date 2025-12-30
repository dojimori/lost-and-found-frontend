import axios from 'axios'

// const apiUrl = 'http://10.94.50.70:3000';
const apiUrl = 'http://localhost:3000';

const api = axios.create({
    baseURL: `${apiUrl}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export { api, apiUrl }