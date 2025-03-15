import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { getPaginatedDirectMessages, GetPaginatedDirectMessagesPayload } from '../api/actions';
import { User } from '@/global_types';

const DEFAULT_QUERYING_DATA_STATE: GetPaginatedDirectMessagesPayload = {
  paginationData: {},
};

export const usePaginatedDirectMessages = (companionId: User['id']) => {
  const isFirstFetchRef = useRef(true);

  const [queryingData, setQueryingData] = useState<GetPaginatedDirectMessagesPayload>(
    DEFAULT_QUERYING_DATA_STATE
  );

  useEffect(() => {
    console.log(queryingData);
  }, [queryingData]);

  const changeQueryingData = useCallback(
    (
      mutation: (
        prevState: GetPaginatedDirectMessagesPayload
      ) => Partial<GetPaginatedDirectMessagesPayload>
    ) => setQueryingData((prevState) => ({ ...prevState, ...mutation(prevState) })),
    [setQueryingData]
  );

  const fetchChats = useCallback(() => {
    if (!isFirstFetchRef.current) {
      return getPaginatedDirectMessages(companionId, queryingData);
    }

    isFirstFetchRef.current = false;
  }, [queryingData]);

  const { isError, isPending, data } = useQuery<
    Awaited<ReturnType<typeof getPaginatedDirectMessages> | undefined>,
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
