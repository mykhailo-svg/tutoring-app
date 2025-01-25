import { APIEndpoints, axiosClient } from '@/api';
import { COOKIES_NAME } from '@/global_types';
import cookies from 'js-cookie';

export const uploadUserAvatarImage = async (image: Blob) => {
  const formData = new FormData();

  formData.append('file', image);

  const uploadedImage = await fetch('http://localhost:5000/api/user/upload', {
    body: formData,
    method: 'POST',
    headers: { Authorization: `Bearer ${cookies.get(COOKIES_NAME.ACCESS_TOKEN)}` },
  });

  console.log(uploadedImage);

  return uploadedImage;
};
