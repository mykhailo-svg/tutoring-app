import axios from 'axios';
import { cookies } from 'next/headers';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    console.log(document.cookie);

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
