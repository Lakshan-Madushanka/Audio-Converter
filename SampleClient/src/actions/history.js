import {
	HISTRY_LODED_SUCCESS,
	HISTRY_LODED_FAIL,
	History_LOADING,
} from './types';

import { setAlert } from './alert';
import axios from 'axios';
/////////////////////////////////////////

export const history = (userId, page) => async (dispatch) => {
	dispatch({
		type: History_LOADING,
	});

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	let res;
	try {
		if (page) {
			res = await axios.get(
				`http://localhost:801/AudioToMp3Converter/api/users/${userId}/history?page=${page}`,

				config
			);
		} else {
			res = await axios.get(
				`http://localhost:801/AudioToMp3Converter/api/users/${userId}/history`,

				config
			);
		}

		dispatch({
			type: HISTRY_LODED_SUCCESS,
			payload: res.data.data,
		});
	} catch (err) {
		if (err.response.data.error) {
			dispatch(setAlert(err.response.data.error, 'danger'));
		}

		dispatch({
			type: HISTRY_LODED_FAIL,
		});
	}
};

export const historyPaginate = (userId, page) => async (dispatch) => {
	try {
		let res;
		if (page) {
			res = await axios.get(
				`http://localhost:801/AudioToMp3Converter/api/users/${userId}/history?page=${page}`
			);

			console.log('his pagi');
			console.log(res);
		} else {
			console.log(res);
			console.log('pppppppppppppppppppppppp');
			dispatch({
				type: 'HOME_LOADED',
				payload: res.data,
			});
		}
	} catch (err) {
		if (err) {
			alert(err);
		}
	}
};
