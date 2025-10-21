import { useUserSettings } from '~/features/user/hooks/use-user-settings';

const useFormatCurrency = () => {
	const { data: settings } = useUserSettings();

	const defaultCurrency = settings?.defaultCurrency || 'INR';
	const formatCurrency = (amount: number) =>
		amount.toLocaleString('en-US', {
			style: 'currency',
			currency: defaultCurrency,
		});

	return formatCurrency;
};
export default useFormatCurrency;
