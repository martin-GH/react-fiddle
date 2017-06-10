export const createQueryString = (obj) => {
	return Object.keys(obj).map(key => {
		return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
	}).join('&');
};
