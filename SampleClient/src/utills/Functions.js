import axios from 'axios';

export const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export const getAuthToken = () => {
	if (localStorage.getItem('auth')) {
		const auth = JSON.parse(localStorage.getItem('auth'));

		return auth.token;
	}
};

export const setPaginationValues = (pagination, data) => {
	pagination.currentPage = data.current_page;
	pagination.noOfPages = data.last_page;
	pagination.perPage = data.per_page;
	pagination.totalItems = data.total;
};
