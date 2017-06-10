import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import config from './config';
import Listings from './components/Listings';
import Loader from './components/Loader';
import SearchForm from './components/SearchForm';
import { createQueryString } from './shared/helper';

class App extends Component {
	constructor() {
		super();

		this.state = {
			loading: false,
			country: 'DE',
			name: '',
			street: '',
			zip: '',
			countries: [],
			directories: [],
			listings: [],
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		fetch(config.directories).then(response => response.json()).then(directories => {
			const countries = Object.keys(directories);
			this.setState({countries, directories});
		})
	}

	handleInput(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (!this.state.name) { // TODO check for empty inputs... company etc.
			return;
		}

		this.searchRequest();
	}

	searchRequest() {
		let options = {
			method: 'POST',
			body: JSON.stringify({
				public_key: config.publicKey,
				country: this.state.country,
				name: this.state.name,
				street: this.state.street,
				zip: this.state.zip,
			})
		};

		fetch(config.api, options).then(response => {
			return response.json();
		}).then(parsed => {
			// reset results
			this.setState({listings: []});

			let {id, token, country} = parsed.response.searchData;

			this.state.directories[country].forEach((directory) => {
				this.presenceCheckRequest(id, token, directory);
			});
		});
	}

	presenceCheckRequest(id, token, directory) {
		let params = createQueryString({
			token,
			directory,
			public_key: config.publicKey,
		});
		let url = `${config.api}/${id}?${params}`;

		fetch(url).then(response => {
			return response.json();
		}).then(parsed => {
			const listing = parsed.response.result;
			const listings = this.state.listings.concat(listing);

			const loading = listings.length !== this.state.directories[this.state.country].length;

			this.setState({listings, loading});
		});
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<SearchForm
							countries={this.state.countries}
							name={this.state.name}
							street={this.state.street}
							zip={this.state.zip}
							onSubmit={this.handleSubmit}
							onChange={this.handleInput}
						/>

						{this.state.loading ? <Loader/> : <Listings data={this.state.listings} />}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
