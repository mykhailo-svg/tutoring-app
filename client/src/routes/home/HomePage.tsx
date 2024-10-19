'use client';
import { axiosClient } from '@/api';
import { useEffect } from 'react';

export const HomePage = () => {
  useEffect(() => {
    axiosClient.get('http://localhost:5000/api/auth/get');
  }, []);

  return <div></div>;
};
