import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // তোমার Laravel API base URL
    headers: {
        'Content-Type': 'application/json',
        // যদি authentication token লাগে:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

export default api;
