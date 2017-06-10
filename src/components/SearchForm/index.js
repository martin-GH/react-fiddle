import React, { Component } from 'react';

export default class SearchForm extends Component {
	render() {
		return (
			<form className="form-inline search-form" onSubmit={this.props.onSubmit}>
				<h3>Company Presence Check</h3>

				<div className="form-group">
					<select name="country" className="form-control" onChange={this.props.onChange} defaultValue="DE">
						{this.props.countries.map(cc => {
							return <option key={cc} value={cc}>{cc}</option>
						})}
					</select>

					<input
						type="text"
						name="name"
						className="form-control"
						placeholder="Company name"
						value={this.props.name}
						onChange={this.props.onChange}
					/>

					<input
						type="text"
						name="street"
						className="form-control"
						placeholder="Street and Number"
						value={this.props.street}
						onChange={this.props.onChange}
					/>

					<input
						type="text"
						name="zip"
						className="form-control"
						placeholder="Zip / Post Code"
						value={this.props.zip}
						onChange={this.props.onChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary">Search</button>
			</form>
		);
	}
}
