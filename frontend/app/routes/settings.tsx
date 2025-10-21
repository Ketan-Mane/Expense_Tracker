import Settings from '~/features/user/components/Settings';

export const meta = () => {
	return [
		{ title: 'Settings - Expense Tracker' },
		{ name: 'description', content: 'Welcome to React Router! Hello React' },
	];
};

const page = () => {
	return <Settings />;
};
export default page;
