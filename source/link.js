import React from 'react';
import { RouterContext, history } from './context';

export const Link = props => {

	const { to, onClick, children } = props;

	const { route } = React.useContext(RouterContext);

	const handleClick = event => {

		event.preventDefault();

		if (route.path === to) return;

		if (onClick) onClick(event);

		history.push(to);

	};

	return <a {...props} onClick={handleClick}>{children}</a>;

};