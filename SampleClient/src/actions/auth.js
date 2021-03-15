import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADING,
} from '../actions/types';
import { client_id } from '../utills/Constants';
import { client_secret } from '../utills/Constants';
import { PASSPORT_GRANT_TYPE } from '../utills/Constants';
import { setAuthToken } from '../utills/Functions';
import { REGISTER_ROUTE, AuthRoute, GetAuthUserRoute } from './apiRoutes';
import { setAlert } from './alert';
//import setAuthToken from '../utills/setAuthToken';
import axios from 'axios';

//Load user
export const loadUser = () => async (dispatch) => {
	try {
		const res = await axios.get(GetAuthUserRoute);

		if (!res.data.verified) {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
				isAuthenticated: 'verifyEmail',
			});
		} else {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
				isAuthenticated: true,
			});
		}
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};
//Register User
export const register = (formData) => async (dispatch) => {
	dispatch({
		type: USER_LOADING,
	});
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	
	try {
		const res = await axios.post(REGISTER_ROUTE, formData, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});

		dispatch(login(formData));
	} catch (err) {
		let errors = err.response && err.response.data.error;
		if (errors.password) {
			dispatch(
				setAlert(
					'Password should contain letters, numbers and characters, At leat 8 characters and cannot be dummy( ex abc)',
					'danger'
				)
			);
		} else if (errors) {
			Object.values(errors).forEach((error) =>
				dispatch(setAlert(error[0], 'danger'))
			);
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
	
};

//Login User
export const login = ({ email, password }) => async (dispatch) => {
	dispatch({
		type: USER_LOADING,
	});
	//confihure headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({
		grant_type: PASSPORT_GRANT_TYPE,
		client_id,
		client_secret,
		username: email,
		password,
	});

	try {
		
		const res = await axios.post(AuthRoute, body, config);


		if (res) {
			const time = new Date().getTime();
			const expires_in = res.data.expires_in * 1000;
			const expires_at = expires_in + time;
			const auth = {
				token: res.data.access_token,
				expires_in,
				time,
				expires_at,
			};
			window.localStorage.getItem('auth') &&
				window.localStorage.removeItem(auth);
			window.localStorage.setItem('auth', JSON.stringify(auth));
		}

		setAuthToken(res.data.access_token);
		dispatch({
			type: LOGIN_SUCCESS,
		});
		dispatch(loadUser());
	} catch (err) {
		let errors = err.response && err.response.data;
		if (errors) {
			
			dispatch(setAlert('Invalid User Login Credentials', 'danger'));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

//LogOut //clear profile
export const logout = () => (dispatch) => {
	dispatch({ type: 'LOGOUT' });
};

// check if token has expired

export const tokenStatus = () => (dispatch) => {
	if (localStorage.getItem('auth')) {
		const auth = JSON.parse(localStorage.getItem('auth'));
		const timeInMillisenconds = new Date().getTime();
		if (timeInMillisenconds > auth.expires_at) {
			dispatch({
				type: 'LOGOUT',
			});

			dispatch(setAlert('Logging Time Out', 'danger'));
		} else {
			setAuthToken(auth.token);
			dispatch(loadUser());
		}
	}
};
