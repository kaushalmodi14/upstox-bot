import axios from 'axios';


export const API = {
    baseUrl: 'https://api.upstox.com/v2/',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${bearer}`
},
    get: async function(endpoint, params, customHeaders = undefined) {
        const headers = customHeaders || this.headers
        return axios.get(this.baseUrl + endpoint, { params, headers })
    }
}