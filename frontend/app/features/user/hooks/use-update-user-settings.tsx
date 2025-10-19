import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserSettings } from '../services/userSettingsService';
import type { SettingsFormData } from '../types/settings';

export const useUpdateUserSettings = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (settings: SettingsFormData) => updateUserSettings(settings),
		onSuccess: (data) => {
			queryClient.setQueryData(['userSettings'], data);
		},
	});
};
