import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	route('', './layout/public-layout.tsx', [
		index('routes/home.tsx'),
		route('/login', 'routes/auth/login.tsx'),
		route('/signup', 'routes/auth/signup.tsx'),
	]),

	route('', './layout/protected-layout.tsx', [
		route('', 'layout/dashboard-layout.tsx', [
			route('/dashboard', 'routes/dashboard.tsx'),
			route('/settings', 'routes/settings.tsx'),
			route('/transactions', 'routes/transactions.tsx'),
			route('/categories', 'routes/categories.tsx'),
			route('/analytics', 'routes/analytics.tsx'),
		]),
	]),
] satisfies RouteConfig;
