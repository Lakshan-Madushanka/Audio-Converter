import { RESEND_EMAIL } from '../actions/types';
import { setAlert } from './alert';
import axios from 'axios';

export const resendEmail = (userID) => async (dispatch) => {
	dispatch({
		type: RESEND_EMAIL,
		payload: 'loading',
	});
	try {
		const res = await axios.get(
			`http://localhost:801/AudioToMp3Converter/api/users/${userID}/resend`
		);
		res && dispatch(setAlert('Verification email resent', 'primary'));
		dispatch({
			type: RESEND_EMAIL,
			payload: 'finished',
		});
	} catch (err) {
		dispatch(setAlert('error occured', 'primary'));
	}
};
