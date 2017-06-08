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

class App extends Component {
	constructor() {
		super();

		this.state = {
			posts: [],
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.requestData('reactjs');
	}

	requestData(topic) {
		let url = `http://www.reddit.com/r/${topic}.json`;
		fetch(url).then(response => {
			return response.json();
		}).then(parsed => {
			const posts = parsed.data.children.map(item => item.data);
			this.setState({posts});
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
						<h2>What are you searching for?</h2>

						<SearchForm
							value={this.state.value}
							onSubmit={this.handleSubmit}
							onChange={this.handleInput}
						/>

						<ResultList posts={this.state.posts} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
