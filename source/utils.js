import qs from 'querystringify';

export const locationToRoute = location => ({
	path: location.path,
	hash: location.hash,
	query: qs.parse(location.search)
});