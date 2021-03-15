// import react modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// application modules
import { register } from '../../actions/auth';

const Register = ({ register, loading, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

	console.log('register');
	console.log(isAuthenticated);
	if (isAuthenticated === 'verifyEmail' || isAuthenticated) {
		return <Redirect to='/' />;
	}
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className='container'>
			<div className='row main' style={{ marginTop: '10rem' }}>
				<div className='main-login main-center'>
					<h5>Sign up once and watch any of our free demos.</h5>
					<form
						className=''
						method='post'
						action='#!'
						onSubmit={(e) => {
							e.preventDefault();
							console.log('why');
							register(formData);
						}}
					>
						<div className='form-group'>
							<label htmlFor='name' className='cols-sm-2 control-label'>
								Your Name
							</label>
							<div className='cols-sm-10'>
								<div className='input-group'>
									<span className='input-group-addon'>
										<i className='fa fa-user fa' aria-hidden='true'></i>
									</span>
									<input
										type='text'
										className='form-control'
										name='name'
										id='name'
										placeholder='Enter your Name'
										onChange={onChange}
									/>
								</div>
							</div>
						</div>

						<div className='form-group'>
							<label htmlFor='email' className='cols-sm-2 control-label'>
								Your Email
							</label>
							<div className='cols-sm-10'>
								<div className='input-group'>
									<span className='input-group-addon'>
										<i className='fa fa-envelope fa' aria-hidden='true'></i>
									</span>
									<input
										type='text'
										className='form-control'
										name='email'
										id='email'
										placeholder='Enter your Email'
										onChange={onChange}
									/>
								</div>
							</div>
						</div>

						<div className='form-group'>
							<label htmlFor='password' className='cols-sm-2 control-label'>
								Password
							</label>
							<div className='cols-sm-10'>
								<div className='input-group'>
									<span className='input-group-addon'>
										<i className='fa fa-lock fa-lg' aria-hidden='true'></i>
									</span>
									<input
										type='password'
										className='form-control'
										name='password'
										id='password'
										placeholder='Enter your Password'
										required
										onChange={onChange}
									/>
								</div>
							</div>
						</div>

						<div className='form-group'>
							<label htmlFor='confirm' className='cols-sm-2 control-label'>
								Confirm Password
							</label>
							<div className='cols-sm-10'>
								<div className='input-group'>
									<span className='input-group-addon'>
										<i className='fa fa-lock fa-lg' aria-hidden='true'></i>
									</span>
									<input
										type='password'
										className='form-control'
										name='password_confirmation'
										id='confirm'
										placeholder='Confirm your Password'
										onChange={onChange}
									/>
								</div>
							</div>
						</div>

						<div className='form-group '>
							{loading !== 'is_loading' && (
								<a
									href='#!'
									id='button'
									className='btn btn-primary btn-lg btn-block login-button'
								>
									<button type='submit' className='btn btn-primary'>
										Register
									</button>
								</a>
							)}

							{loading === 'is_loading' && (
								<span
									style={{ marginLeft: '9rem' }}
									className='spinner-border text-warning'
									role='status'
								/>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

Register.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { register })(Register);
