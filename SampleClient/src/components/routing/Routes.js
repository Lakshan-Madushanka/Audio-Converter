// import react components

import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import appication components
import Landing from '../../components/Landing';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';
import History from '../../components/History';

const Routes = (props) => {
	return (
		<section className='container'>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/register' component={Register} />
				<Route path='/login' component={Login} />
				<Route path='/history' component={History} />
			</Switch>
		</section>
	);
};

export default Routes;
