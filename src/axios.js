// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v2/auth/', 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

export default instance;