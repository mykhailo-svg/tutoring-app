import { APIEndpoints, axiosClient } from '@/api';

type UpdateUserGeneralDataPayload = Partial<{
  interests: string[];
}>;

export const updateUserGeneralData = async (payload: UpdateUserGeneralDataPayload) => {
  return axiosClient.put(APIEndpoints.user.updateUserGeneralData, payload);
};
