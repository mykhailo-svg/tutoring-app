"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

async function getData() {
  const options = {
    method: "GET",
  };

  const response = fetch("http://localhost:5000/api", options)
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
    queryKey: ["movies"], //Array according to Documentation
  });

  return <div>{data ? data.message : "nothing"}</div>;
};
