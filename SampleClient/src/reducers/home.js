const initialState = {
	loading: true,
	homeData: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case 'HOME_LOADED':
			return {
				...state,
				loading: false,
				homeData: payload,
			};

		default:
			return state;
	}
}
