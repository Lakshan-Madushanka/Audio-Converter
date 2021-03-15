import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	USER_LOADING,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: true,
	user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload, isAuthenticated } = action;

	switch (type) {
		case USER_LOADING:
			return {
				...state,
				loading: 'is_loading',
			};
		case USER_LOADED:
			return {
				...state,
				loading: false,
				user: payload,
				isAuthenticated,
			};

		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				payload,
				isAuthenticated: true,
				loading: false,
			};

		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};
		default:
			return state;
	}
}
