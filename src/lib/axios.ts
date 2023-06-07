import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api-habit-helper.vercel.app//api/v1',
})
