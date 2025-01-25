import { APIEndpoints, axiosClient } from '@/api';

export const uploadUserAvatarImage = async (image: Blob) => {
  const formData = new FormData();

  formData.append('file', image);

  const uploadedImage = await fetch('http://localhost:5000/api/user/upload', {
    body: formData,
    method: 'POST',
  });
  
  console.log(uploadedImage);

  return uploadedImage;
};
