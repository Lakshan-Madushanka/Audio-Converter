// import react modules
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
//import application components
import { login } from '../../actions/auth';

const Login = ({ login, loading, isAuthenticated }) => {
	console.log(loading);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	if (isAuthenticated === 'verifyEmail' || !isAuthenticated) {
		return <Redirect to='/' />;
	}
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		// Redirect if loggoed in

		<div id='login'>
			{/* <h3 className='text-center text-white pt-5'>Login form</h3> */}

			<div className='container'>
				<div
					id='login-row'
					className='row justify-content-center align-items-center'
				>
					<div id='login-column' className='col-md-6'>
						<div id='login-box' className='col-md-12'>
							<form
								id='login-form'
								className='form'
								action='#!'
								method='post'
								onSubmit={(e) => {
									e.preventDefault();
									login(formData);
								}}
							>
								<h3 className='text-center text-info#'>Login</h3>
								<div className='form-group'>
									<label htmlFor='email' className='text-info#'>
										Email:
									</label>
									<br />
									<input
										type='email'
										name='email'
										id='email'
										className='form-control'
										onChange={onChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='password' className='text-info#'>
										Password:
									</label>
									<br />
									<input
										type='text'
										name='password'
										id='password'
										className='form-control'
										onChange={onChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='remember-me' className='text-info#'>
										<span>Remember me</span>
										<span>
											<input id='remember-me' name='remember-me' type='checkbox' />
										</span>
									</label>
									<br />
									{loading !== 'is_loading' && (
										<input
											style={{ backgroundColor: '#2653d4' }}
											type='submit'
											name='submit'
											className='btn btn-info btn-md'
											value='submit'
										/>
									)}
									{loading === 'is_loading' && (
										<span
											// style={{ marginLeft: '-50px' }}
											className='spinner-border text-warning'
											role='status'
										/>
									)}
								</div>
								<div id='register-link' className='text-right'>
									<Link
										to='/register'
										className='text-info#'
										style={{ color: '#fff700', textDecorationLine: 'underline' }}
									>
										Register here
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = {};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
