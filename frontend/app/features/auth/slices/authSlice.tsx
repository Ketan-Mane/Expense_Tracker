import { createSlice } from '@reduxjs/toolkit';
import type { User } from '~/schemas/auth/user';

interface AuthState {
	user: User | null;
	token: null | string;
	isLoggedIn: boolean;
}

const initialState: AuthState = {
	user: null,
	token: null,
	isLoggedIn: false,
};

export const authSlice = createSlice({
	initialState,
	name: 'auth',
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		setToken(state, action) {
			state.token = action.payload;
		},
		logout(state) {
			state.user = null;
			state.token = null;
			state.isLoggedIn = false;
		},
	},
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
