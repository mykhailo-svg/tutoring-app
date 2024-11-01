import { COOKIES_NAME } from '@/global_types';
import axios from 'axios';

function getCookie(name: string) {
  const value = `; ${typeof document !== 'undefined' ? document.cookie : ''}`;
  const parts = value.split(`; ${name}=`);
  if (parts && parts.length === 2) {
    //@ts-ignore
    return parts.pop().split(';').shift();
  }
}

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    Authorization: `Bearer ${getCookie(COOKIES_NAME.ACCESS_TOKEN)}`,
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
