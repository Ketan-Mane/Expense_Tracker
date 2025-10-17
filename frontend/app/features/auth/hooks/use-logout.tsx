import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '~/features/auth/slices/authSlice';

const useLogout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logout,
		onSettled: () => {
			dispatch(logoutAction());
			queryClient.clear();
			navigate('/login', { replace: true });
		},
	});
};
export default useLogout;
