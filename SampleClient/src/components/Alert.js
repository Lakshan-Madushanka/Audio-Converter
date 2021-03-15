import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
	return (
		<div
			style={{
				width: '75%',
				margin: 'auto',

				marginTop: '2rem',
				marginBottom: '-10rem',
			}}
		>
			{alerts &&
				alerts.map((alert) => {
					return (
						<div
							key={alert.id}
							style={{
								color: 'white',
								backgroundColor: 'red',
							}}
							className={`alert alert-${alert.alertType} text-center`}
						>
							{alert.msg}
						</div>
					);
				})}
		</div>
	);
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
