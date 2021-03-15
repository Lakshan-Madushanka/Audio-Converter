import {
	CONVERT_SUCCESS,
	CONVERT_FAIL,
	CONVERT_PPROCESSING,
	FILE_DOWNLOADED,
} from '../actions/types';

const initialState = {
	status: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case CONVERT_SUCCESS:
			return {
				...state,
				status: payload,
			};
		case CONVERT_FAIL:
			return {
				...state,
				status: payload,
			};
		case CONVERT_PPROCESSING:
			return {
				...state,
				status: payload,
			};
		case FILE_DOWNLOADED:
			return {
				...state,
				status: payload,
			};
		default:
			return state;
	}
}
