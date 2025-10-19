import axiosInstance from '~/axios/axiosInstance';
import type { SettingsFormData } from '~/features/user/types/settings';
import type { ApiResponse } from '~/types/api-response';

const API_BASE = '/settings';

export const getUserSettings = async () => {
	const { data } = await axiosInstance.get<ApiResponse<{ data: SettingsFormData }>>(API_BASE);
	return data;
};

export const updateUserSettings = async (settings: SettingsFormData) => {
	const { data } = await axiosInstance.put<ApiResponse<{ data: SettingsFormData }>>(API_BASE, settings);
	return data;
};
