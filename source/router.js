import React, { useEffect, useState } from 'react';
import { locationToRoute } from './utils';
import { history, RouterContext } from './context';
import { Route } from './route';
import { Link } from './link';

const Router = ({ routes, NotFound, children }) => {

	const [route, setRoute] = useState(history.location);

	const routes = Object.keys(routes).map(key => routes[key].path);

	const unlisten = history.listen(handleRouteChange);

	const is404 = routes.indexOf(route.path) === -1;

	const handleRouteChange = location => setRoute({ route: locationToRoute(location) });

	useEffect(() => {
		// stop listening for changes if the Router component unmounts
		return () => unlisten();
	}, []);

	return (
		<RouterContext.Provider value={{ route }}>
			{ is404 ? <NotFound /> : children }
		</RouterContext.Provider>
	);

};

export { history, RouterContext, Router, Route, Link };