import { useMutation } from '@tanstack/react-query';
import { updateUserGeneralData } from '../api';
import { AxiosError } from 'axios';

export const useUpdateUserGeneralData = () => {
  const { data, mutateAsync, isPending } = useMutation<
    Awaited<ReturnType<typeof updateUserGeneralData>>,
    AxiosError,
    Parameters<typeof updateUserGeneralData>[0]
  >({
    mutationFn: updateUserGeneralData,
  });

  return { data, updateUserGeneralData: mutateAsync, isPending };
};
