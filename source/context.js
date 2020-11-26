import React from 'react';
import { createBrowserHistory } from 'history';
import { locationToRoute } from './utils';

export const history = createBrowserHistory();

export const RouterContext = React.createContext({
	route: locationTouRoute(history.location)
});