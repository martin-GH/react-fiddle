import React  from 'react';

const SearchForm = ({countries, name, street, zip, onChange, onSubmit}) => {
	return (
		<form className="form-inline search-form" onSubmit={onSubmit}>
			<h3>Company Presence Check</h3>

			<div className="form-group">
				<select name="country" className="form-control" onChange={onChange} defaultValue="DE">
					{countries.map(cc => {
						return <option key={cc} value={cc}>{cc}</option>
					})}
				</select>

				<input
					type="text"
					name="name"
					className="form-control"
					placeholder="Company name"
					value={name}
					onChange={onChange}
				/>

				<input
					type="text"
					name="street"
					className="form-control"
					placeholder="Street and Number"
					value={street}
					onChange={onChange}
				/>

				<input
					type="text"
					name="zip"
					className="form-control"
					placeholder="Zip / Post Code"
					value={zip}
					onChange={onChange}
				/>
			</div>
			<button type="submit" className="btn btn-primary">Search</button>
		</form>
	);
};

export default SearchForm;
