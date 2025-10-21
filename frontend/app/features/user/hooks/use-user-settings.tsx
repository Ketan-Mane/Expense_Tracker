import { useQuery } from '@tanstack/react-query';
import { getUserSettings } from '../services/userSettingsService';

export const useUserSettings = () => {
	return useQuery({
		queryKey: ['userSettings'],
		queryFn: getUserSettings,
		staleTime: 1000 * 60 * 5,
	});
};
