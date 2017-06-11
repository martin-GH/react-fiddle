export const createQueryString = (obj) => {
	return Object.keys(obj).map(key => {
		return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
	}).join('&');
};

export const isEmpty = (arr) => {
	return arr.reduce((a, b) => {
		a = a || b === null || b.toString() === '';

		return a;
	}, false);
};
