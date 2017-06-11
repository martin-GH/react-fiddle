import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Promise from 'es6-promise';

import config from './config';
import Listings from './components/Listings';
import Loader from './components/Loader';
import SearchForm from './components/SearchForm';
import { createQueryString, isEmpty } from './shared/helper';

class App extends Component {
	constructor() {
		super();

		this.state = {
			loading: false,
			country: 'DE',
			name: 'Einstein',
			street: 'Unter den Linden 42',
			zip: '10117',
			countries: [],
			directories: [],
			listings: [],
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		fetch(config.directories)
			.then(response => response.json())
			.then(directories => {
				const countries = Object.keys(directories);
				this.setState({countries, directories});
			});
	}

	handleInput(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (isEmpty([this.state.name, this.state.country, this.state.street, this.state.zip])) {
			return;
		}

		this.searchRequest();
	}

	searchRequest() {
		this.setState({listings: [], loading: true});

		const options = {
			method: 'POST',
			body: JSON.stringify({
				public_key: config.publicKey,
				country: this.state.country,
				name: this.state.name,
				street: this.state.street,
				zip: this.state.zip,
			})
		};

		fetch(config.api, options)
			.then(response => response.json())
			.then(parsed => {
				const {id, token, country} = parsed.response.searchData;
				const listings = this.state.directories[country].map(directory => this.getListing(id, token, directory));
				this.setListings(listings);
			})
			.catch(() => {
				this.setState({loading: false});
			});
	}

	getListing(id, token, directory) {
		const params = createQueryString({
			token,
			directory,
			public_key: config.publicKey,
		});
		const url = `${config.api}/${id}?${params}`;

		return fetch(url).then(response => response.json()).then(parsed => parsed.response.result);
	}

	setListings(listings) {
		Promise.all(listings).then(items => {
			console.log(items);
			this.setState({listings: items, loading: false});
		});
	}

	render() {
		const content = this.state.loading ? <Loader/> : <Listings data={this.state.listings}/>;

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

						{content}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
