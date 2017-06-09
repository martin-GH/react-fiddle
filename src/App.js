import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class SearchForm extends Component {
	render() {
		return (
			<form className="form-inline search-form" onSubmit={this.props.onSubmit}>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="topic"
						value={this.props.value}
						onChange={this.props.onChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary">Search</button>
			</form>
		);
	}
}

class ResultList extends Component {
	render() {
		return (
			<div className="list-group">
				{this.props.posts.map(post => <a key={post.id} className="list-group-item" href={post.url}>{post.title}</a>)}
			</div>
		);
	}
}

class Loader extends Component {
	render() {
		return (
			<div className="loader">
				<div className="spinner"></div>
				<div className="text">Loading</div>
			</div>
		);
	}
}

class App extends Component {
	constructor() {
		super();

		this.state = {
			loading: false,
			posts: [],
			value: 'reactjs',
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.requestData(this.state.value);
	}

	requestData(topic) {
		let url = `http://www.reddit.com/r/${topic}.json`;
		let loading = true;

		this.setState({loading});

		fetch(url).then(response => {
			return response.json();
		}).then(parsed => {
			loading = false;

			const posts = parsed.data.children.map(item => item.data);
			this.setState({posts, loading});
		});
	}

	handleInput(event) {
		this.setState({
			value: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (!this.state.value) {
			return;
		}

		this.requestData(this.state.value)
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-xs-12">
						<h3>What are you searching for?</h3>

						<SearchForm
							value={this.state.value}
							onSubmit={this.handleSubmit}
							onChange={this.handleInput}
						/>

						{this.state.loading ? <Loader/> : <ResultList posts={this.state.posts} />}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
