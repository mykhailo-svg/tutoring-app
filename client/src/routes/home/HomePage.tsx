'use client';
import { axiosClient, getApiEndpointUrl } from '@/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

async function getData() {
  const options = {
    method: 'GET',
  };

  const response = fetch(getApiEndpointUrl('/'), options)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

async function getMovies() {
  const data = await getData();
  return data;
}

export const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getMovies(),
    queryKey: ['movies'], //Array according to Documentation
  });

  useEffect(() => {
    axiosClient.get('http://localhost:5000/api/auth/get');
  }, []);

  return <div>{data ? data.message : 'nothing'}</div>;
};
