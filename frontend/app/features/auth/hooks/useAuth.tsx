import { useQuery } from '@tanstack/react-query';
import { verifyAuth } from '../services/authService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';

const useAuth = () => {
	const dispatch = useDispatch();

	const { data: user, isLoading } = useQuery({
		queryKey: ['auth'],
		queryFn: verifyAuth,
		retry: false,
	});

	useEffect(() => {
		if (!user) return;

		dispatch(setUser(user));
	}, [user]);

	return { isLoggedIn: !!user, user, isLoading };
};

export default useAuth;
