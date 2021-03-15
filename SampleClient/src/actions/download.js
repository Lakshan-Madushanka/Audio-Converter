import { setAlert } from './alert';
//import setAuthToken from '../utills/setAuthToken';
import axios from 'axios';

export const download = (userID, name) => async (dispatch) => {
	axios({
		url: `http://localhost:801/AudioToMp3Converter/api/users/${userID}/download`,
		//your url
		method: 'GET',
		responseType: 'blob', // important
	})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${name}.mp3`); //or any other extension
			document.body.appendChild(link);
			link.click();
		})
		.catch((error) => {
			dispatch(setAlert(error.response.statusText, 'danger'));
			dispatch(setAlert('File can be already been downloaded', 'danger'));
		});
};
