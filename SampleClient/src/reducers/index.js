import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import home from './home';
import email from './email';
import convert from './convert';
import history from './history';

export default combineReducers({
	alert,
	auth,
	home,
	email,
	convert,
	history,
});
