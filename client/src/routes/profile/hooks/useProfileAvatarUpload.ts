import { useMutation } from '@tanstack/react-query';
import { uploadUserAvatarImage } from '../api';
import { AxiosError } from 'axios';

export const useProfileAvatarUpload = () => {
  const { data, mutateAsync, isPending } = useMutation<
    Awaited<ReturnType<typeof uploadUserAvatarImage>>,
    AxiosError,
    Parameters<typeof uploadUserAvatarImage>[0]
  >({
    mutationFn: uploadUserAvatarImage,
  });

  return { data, uploadAvatar: mutateAsync, isPending };
};
