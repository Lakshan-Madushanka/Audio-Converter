import {
	HISTRY_LODED_SUCCESS,
	HISTRY_LODED_FAIL,
	History_LOADING,
} from '../actions/types';

const initialState = {
	status: false,
	history: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case HISTRY_LODED_SUCCESS:
			return {
				...state,
				status: true,
				history: payload,
			};
		case HISTRY_LODED_FAIL:
			return {
				...state,
				status: false,
			};

		case History_LOADING:
			return {
				...state,
				status: 'loading',
			};
		default:
			return state;
	}
}
