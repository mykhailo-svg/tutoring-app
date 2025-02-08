import { APIEndpoints, axiosClient } from '@/api';
import { Languages } from '@/components/LanguagesSelect';

type UpdateUserGeneralDataPayload = Partial<{
  interests: string[];
  languages: Languages<false>;
}>;

export const updateUserGeneralData = async (payload: UpdateUserGeneralDataPayload) => {
  return axiosClient.put(APIEndpoints.user.updateUserGeneralData, payload);
};
