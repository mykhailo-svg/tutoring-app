import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useCallback, useMemo, useRef, useState } from 'react';
import { getPaginatedUserChats } from '../api/actions';
import { GetDirectMessengerChatsResponse } from '../types';
import { useDebounce } from 'use-debounce';

export type DirectChatsQueryingData = {
  filters: Partial<{
    search: string;
  }>;
};

const DEFAULT_QUERYING_DATA_STATE: DirectChatsQueryingData = {
  filters: {},
};

export const usePaginatedDirectChats = () => {
  const isFirstFetchRef = useRef(true);

  const [queryingData, setQueryingData] = useState<DirectChatsQueryingData>(
    DEFAULT_QUERYING_DATA_STATE
  );

  const [debouncedQueryingData] = useDebounce(queryingData, 300);

  const changeQueryingData = useCallback(
    (mutation: (prevState: DirectChatsQueryingData) => Partial<DirectChatsQueryingData>) =>
      setQueryingData((prevState) => ({ ...prevState, ...mutation(prevState) })),
    [setQueryingData]
  );

  const fetchChats = useCallback(() => {
    if (!isFirstFetchRef.current) {
      return getPaginatedUserChats(queryingData);
    }

    isFirstFetchRef.current = false;
  }, [queryingData]);

  const { isError, error, isPending, data } = useQuery<
    Awaited<ReturnType<typeof getPaginatedUserChats> | undefined>,
    AxiosError
  >({
    queryKey: ['queryingData', queryingData],
    queryFn: fetchChats,
  });

  return {
    isError,
    data,
    isLoading: isPending,
    queryingData,
    changeQueryingData,
  };
};
