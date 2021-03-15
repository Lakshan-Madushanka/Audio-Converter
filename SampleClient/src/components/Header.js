import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';

const Header = ({ isAuthenticated, logout }) => {
	

	const mystyle = {
		color: 'red',
		display: 'flex',
	};
	return (
		<div>
			<section id='topbar' className='d-flex align-items-center'>
				<div
					id='header-s'
					className='container d-flex justify-content-center justify-content-md-between'
				>
					<div className='contact-info d-flex align-items-center'>
						<i className='bi bi-envelope d-flex align-items-center'>
							<a href='mailto:contact@example.com'>epmadushanka@gmail.com</a>
						</i>
						<i className='bi bi-phone d-flex align-items-center ms-4'>
							<span>071 12383737</span>
						</i>
					</div>
					<div className='header-left' style={mystyle}>
						<div className='cta d-none d-md-flex align-items-center'>
							<Link to='/' className='scrollto'>
								Home
							</Link>
							<span>|</span>
						</div>
						{isAuthenticated && (
							<div className='cta d-none d-md-flex align-items-center'>
								<Link to='/history' className='scrollto'>
									History
								</Link>
								<span>|</span>
							</div>
						)}
						{!isAuthenticated ? (
							<div className='cta d-none d-md-flex align-items-center'>
								<Link to='/login' className='scrollto'>
									Login &nbsp;|
								</Link>
								<span>|</span>
							</div>
						) : (
							''
						)}
						{isAuthenticated && (
							<div className='cta d-none d-md-flex align-items-center'>
								<a onClick>Logout</a>
							</div>
						)}

						{!isAuthenticated && (
							<div className='cta d-none d-md-flex align-items-center'>
								<Link to='/register' className='scrollto'>
									Register
								</Link>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	//loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Header);
