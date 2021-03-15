import {
	CONVERT_SUCCESS,
	CONVERT_FAIL,
	CONVERT_PPROCESSING,
} from '../actions/types';

import { setAlert } from './alert';
//import setAuthToken from '../utills/setAuthToken';
import axios from 'axios';

export const convert = (userID, data) => async (dispatch) => {
	dispatch({
		type: CONVERT_PPROCESSING,
		payload: 'processing',
	});
	const output_file = data.output_file;
	const body = JSON.stringify({
		output_file,
	});
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(
			`http://localhost:801/AudioToMp3Converter/api/users/${userID}/convert`,
			body,
			config
		);
		res && dispatch(setAlert('Audio converted Successfully', 'primary'));
		dispatch({
			type: CONVERT_SUCCESS,
			payload: 'success',
		});
	} catch (err) {
		let errors = err.response && err.response.data.error;

		if (typeof errors == 'string') {
			dispatch(setAlert(errors, 'danger'));
		} else if (errors) {
			Object.values(errors).forEach((error) =>
				dispatch(setAlert(error[0], 'danger'))
			);
		}
		dispatch({
			type: CONVERT_FAIL,
			payload: 'fail',
		});
	}
};
