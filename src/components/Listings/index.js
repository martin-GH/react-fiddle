import React from 'react';

const Listings = ({data}) => {
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

			{data.map((listing, i) => {
				const {
					directoryType,
					openingHoursStatus,
					photosStatus,
					syncStatus,
					city,
					cityStatus,
					name,
					nameStatus,
					street,
					streetStatus,
					streetNo,
					streetNoStatus,
					zip,
					zipStatus,
					website,
					websiteStatus,
				} = listing;

				const businessInfo = {
					city,
					cityStatus,
					name,
					nameStatus,
					street,
					streetStatus,
					streetNo,
					streetNoStatus,
					zip,
					zipStatus,
					website,
					websiteStatus,
				};

				return (
					<Listing
						key={directoryType}
						businessInfo={businessInfo}
						cx={i % 2 ? 'odd' : 'even'}
						directoryType={directoryType}
						openingHoursStatus={openingHoursStatus}
						photosStatus={photosStatus}
					/>
				);
			})}
		</ul>
	);

	return data.length ? listings : null;
};

const BusinessInfo = ({data}) => {
	let website = null;

	if (data.websiteStatus === 'PRESENT') {
		website = <a href={data.website}>{data.website}</a>
	}

	return (
		<div className="BusinessInfo">
			<div className={data.nameStatus.toLowerCase()}>{data.name}</div>
			<div>
				<span className={data.streetStatus.toLowerCase()}>{data.street}</span>
				<span className={data.streetNoStatus.toLowerCase()}>{data.streetNo}</span>
			</div>
			<div>
				<span className={data.zipStatus.toLowerCase()}>{data.zip}</span>
				<span className={data.cityStatus.toLowerCase()}>{data.city}</span>
			</div>
			<div>{website}</div>
		</div>
	);
};

const Listing = ({businessInfo, cx, directoryType, openingHoursStatus, photosStatus}) => {
	return (
		<li className={`list-group-item ${cx}`}>
			<div className="row">
				<div className="col-xs-12 col-sm-3">
					<img src={`img/directory_logos/${directoryType}.png`} width="30" height="30"
							 alt={directoryType}/> {directoryType}
				</div>
				<div className="col-sm-5 hidden-xs">
					<BusinessInfo data={businessInfo}/>
				</div>
				<div className="col-sm-2 hidden-xs text-center">
					<img src={`img/${openingHoursStatus}.svg`} width="17" height="18"/>
				</div>
				<div className="col-sm-2 hidden-xs text-center">
					<img src={`img/${photosStatus}.svg`} width="17" height="18"/>
				</div>
			</div>
		</li>
	);
};

export default Listings;
