import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { setPaginationValues } from '../utills/Functions';
import { historyPaginate } from '../actions/history';
import { Link, Redirect } from 'react-router-dom';

import { history } from '../actions/history';

export const History = ({
	history,
	user,
	historyData,
	historyPaginate,
	isAuthenticated,
}) => {
	useEffect(() => history(userId), []);

	const userId = user && user.id;
	let data = historyData && historyData.data;
	if (!Array.isArray(data) && data) {
		data = Object.entries(data)[0][1];
	}

	if (isAuthenticated === 'verifyEmail' || !isAuthenticated) {
		return <Redirect to='/' />;
	}

	let pagination = {
		currentPage: 0,
		noOfPages: 0,
		perPage: 0,
		totalItems: 0,
	};

	if (historyData) {
		setPaginationValues(pagination, historyData);
	}

	const handlePageClick = (e) => {
		history(userId, e);
	};
	return (
		<div style={{ overflow: 'auto', marginTop: '5rem' }}>
			<div class='container'>
				<h2>User History</h2>
				<p>Preious activities</p>
				<table
					class='table table-bordered table-primary'
					style={{ overflow: 'auto' }}
				>
					<thead>
						<tr>
							<th>Id</th>
							<th>Input File</th>
							<th>Output File</th>
							<th>Input Format</th>
							<th>Output Format</th>
							<th>Download Status</th>
							<th>Convert Status</th>
							<th>Last Modified Date</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							Array.isArray(data) &&
							data.map((data) => (
								<tr key={data.id}>
									<td>{data.id}</td>
									<td>{data.input_file}</td>
									<td>{data.output_file}</td>
									<td>{data.input_format}</td>
									<td>{data.output_format}</td>
									<td>{data.convert_status}</td>
									<td>{data.downloaded}</td>
									<td>{data.updated_at}</td>
								</tr>
							))}

						{data && !Array.isArray(data) && (
							<tr key={data.id}>
								<td>{data.id}</td>
								<td>{data.input_file}</td>
								<td>{data.output_file}</td>
								<td>{data.input_format}</td>
								<td>{data.output_format}</td>
								<td>{data.convert_status}</td>
								<td>{data.downloaded}</td>
								<td>{data.updated_at}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{historyData && (
				<div className='pagination' style={{ justifyContent: 'center' }}>
					<Pagination
						activePage={pagination.currentPage}
						itemsCountPerPage={pagination.perPage}
						totalItemsCount={pagination.totalItems}
						pageRangeDisplayed={10}
						onChange={handlePageClick}
						activeClassName={'active'}
						itemClass='page-item'
						linkClass='page-link'
						firstPageText='first'
						lastPageText={'last'.concat(' (', pagination.noOfPages).concat(')')}
					/>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,

	user: state.auth.user,
	historyData: state.history.history,
});
export default connect(mapStateToProps, { history, historyPaginate })(
	History
);
