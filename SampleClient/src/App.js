//react packages
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
//appication components
import Routes from './components/routing/Routes';
import Landing from './components/Landing';
import Header from './components/Header';
import Alert from './components/Alert';
import { loadUser, tokenStatus } from './actions/auth';

const App = () => {
	useEffect(() => store.dispatch(tokenStatus()), []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					{/* <Navbar /> */}
					<Header />
					<Alert />

					<Switch>
						<Route exact path='/' component={Landing} />

						{/* <Route exact path="/" component={Landing} /> */}
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
