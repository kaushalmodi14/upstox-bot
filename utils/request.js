import axios from 'axios';

console.log(process.env.UPSTOX_API_KEY);   
const bearer = process.env.UPSTOX_API_KEY || '';

export const API = {
    baseUrl: 'https://api.upstox.com/v2/',
    baseV3Url: 'https://api.upstox.com/v3/',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${bearer}`
},
    get: async function(endpoint, params, customHeaders = undefined) {
        const headers = customHeaders || this.headers
        return axios.get(this.baseUrl + endpoint, { params, headers })
    },
    getv3: async function(endpoint, params, customHeaders = undefined) {
        const headers = customHeaders || this.headers
        return axios.get(this.baseV3Url + endpoint, { params, headers })
    },
    customGet: async function(fullUrl, params, customHeaders = undefined) {
        const headers = customHeaders || this.headers
        return axios.get(fullUrl, { params, headers })
    }
}