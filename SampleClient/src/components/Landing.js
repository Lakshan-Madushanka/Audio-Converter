import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
/////
import { resendEmail } from '../actions/email';
import { getAuthToken } from '../utills/Functions';
import { setAlert } from '../actions/alert';
import { convert } from '../actions/convert';
import { download } from '../actions/download';

//Third party packages
// Import React FilePond
import { FilePond } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

const Landing = ({
	isAuthenticated,
	user,
	resendEmail,
	email,
	setAlert,
	convert,
	convertStatus,
	download,
}) => {
	useEffect(() => {
		setAuthToken({ token: getAuthToken() });
	}, []);

	const [files, setFiles] = useState([]);
	const [authToken, setAuthToken] = useState({ token: '' });
	const [convertData, setConvertData] = useState({});
	const getToken = (e) => {
		setAuthToken({ token: getAuthToken() });
	};

	return (
		<Fragment>
			{isAuthenticated === 'verifyEmail' && (
				<div style={{ marginTop: '12rem' }}>
					<div className='card' style={{ textAlign: 'center' }}>
						<div className='card-header'>Email Verification</div>
						<div className='card-body'>
							<h5 className='card-title'>
								Email verification sent to below link
							</h5>
							<p className='card-text'>
								Refresh the site after email verification
							</p>
							{email.status !== 'loading' ? (
								<button
									className='btn btn-primary'
									onClick={(e) => {
										e.preventDefault();
										resendEmail(user.id);
									}}
								>
									Resend
								</button>
							) : (
								<span
									style={{ marginLeft: '9rem' }}
									className='spinner-border text-warning'
									role='status'
								/>
							)}
						</div>
					</div>
				</div>
			)}
			<Fragment>
				{isAuthenticated && isAuthenticated !== 'verifyEmail' && (
					<div style={{ margin: '15rem auto', width: '50%' }}>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								convert(user.id, convertData);
							}}
						>
							<FilePond
								files={files}
								onupdatefiles={setFiles}
								allowMultiple={false}
								onBlur={getToken}
								name='input_file'
								acceptedFileTypes={['audio/*']}
								server={{
									process: {
										url:
											`http://localhost:801/AudioToMp3Converter/api/users/${user.id}/music`,
										headers: {
											Authorization: `Bearer ${authToken.token} `,
										},
										onerror: (res) => {
											let a = JSON.parse(res);
											a.error === 'File already exists'
												? setAlert(a.error, 'danger')
												: Object.values(a.error).forEach((error) =>
														setAlert(error[0], 'danger')
												  );
										},
									},
								}}
								//name="files" {/* sets the file input name, it's filepond by default */}
								labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
							/>
							<div class='form-group'>
								<label for='text'>Output File Name:</label>
								<input
									type='text'
									class='form-control'
									placeholder='Enter output audio name here'
									id='output'
									max='150'
									onChange={(e) => setConvertData({ output_file: e.target.value })}
								/>
							</div>
							{convertStatus !== 'processing' ? (
								<button
									type='submit'
									class='btn btn-primary btn-block'
									style={{ marginTop: '2rem' }}
								>
									Convert to MP3
								</button>
							) : (
								<div
									className='form-group'
									style={{ textAlign: 'center', color: 'blue' }}
								>
									Converting....
									<span
										// style={{ marginLeft: '-50px' }}
										className='spinner-border text-warning'
										role='status'
									/>
								</div>
							)}
						</form>
						{convertStatus === 'success' && (
							<button
								className='btn btn-primary btn-block'
								style={{ marginTop: '2rem', backgroundColor: 'green' }}
								onClick={(e) => download(user.id, convertData.output_file)}
							>
								Download
							</button>
						)}
					</div>
				)}
			</Fragment>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	//loading: state.auth.loading,
	email: state.email,
	user: state.auth.user,
	convertStatus: state.convert.status,
});

export default connect(mapStateToProps, {
	resendEmail,
	setAlert,
	convert,
	download,
})(Landing);
