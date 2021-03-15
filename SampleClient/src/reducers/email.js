import { RESEND_EMAIL } from '../actions/types';

const initialState = {
	status: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case RESEND_EMAIL:
			return {
				...state,
				status: payload,
			};

		default:
			return state;
	}
}
