import React, { Component } from 'react';

export default class Listings extends Component {
	render() {
		const listings = (
			<ul className="list-group">
				<div className="listing-header list-group-item">
					<div className="row">
						<div className="col-xs-12 col-sm-3">Directory</div>
						<div className="col-sm-5 hidden-xs">Business Info</div>
						<div className="col-sm-2 hidden-xs text-center">Hours</div>
						<div className="col-sm-2 hidden-xs text-center">Photo</div>
					</div>
				</div>

				{this.props.data.map((listing, i) => {
					const {directoryType, openingHoursStatus, photosStatus, syncStatus} = listing;

					/*if (syncStatus === 'NOT_FOUND') {
						return (
							<ListingNotFound
								key={directoryType}
								cx={i % 2 ? 'odd' : 'even'}
								directoryType={directoryType}
							/>
						);
					}*/

					return (
						<Listing
							key={directoryType}
							cx={i % 2 ? 'odd' : 'even'}
							directoryType={directoryType}
							openingHoursStatus={openingHoursStatus}
							photosStatus={photosStatus}
						/>
					);
				})}
			</ul>
		);

		return this.props.data.length ? listings : null;
	}
}

class Listing extends Component {
	render() {
		return (
			<li className={`list-group-item ${this.props.cx}`}>
				<div className="row">
					<div className="col-xs-12 col-sm-3">
						<img src={`img/directory_logos/${this.props.directoryType}.png`} width="30" height="30"
								 alt={this.props.directoryType}/> {this.props.directoryType}
					</div>
					<div className="col-sm-5 hidden-xs">Business Info</div>
					<div className="col-sm-2 hidden-xs text-center">
						<img src={`img/${this.props.openingHoursStatus}.svg`} width="17" height="18"/>
					</div>
					<div className="col-sm-2 hidden-xs text-center">
						<img src={`img/${this.props.photosStatus}.svg`} width="17" height="18"/>
					</div>
				</div>
			</li>
		);
	}
}

class ListingNotFound extends Component {
	render() {
		return (
			<li className="list-group-item">
				<div className="row">
					<div className="col-xs-12 col-sm-3">
						<img src={`img/directory_logos/${this.props.directoryType}.png`} width="30" height="30"
								 alt={this.props.directoryType}/> {this.props.directoryType}
					</div>
					<div className="col-sm-9 hidden-xs">Listing not found</div>
				</div>
			</li>
		)
	}
}
