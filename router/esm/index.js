import React, { useState, useEffect } from 'react';
import qs from 'querystringify';
import { createBrowserHistory } from 'history';

const locationToRoute = location => ({
  path: location.path,
  hash: location.hash,
  query: qs.parse(location.search)
});

const history = createBrowserHistory();
const RouterContext = /*#__PURE__*/React.createContext({
  route: locationTouRoute(history.location)
});

const Route = ({
  path,
  children
}) => {
  const {
    route
  } = React.useContext(RouterContext);
  if (route.path !== path) return null;
  return children;
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const Link = props => {
  const {
    to,
    onClick,
    children
  } = props;
  const {
    route
  } = React.useContext(RouterContext);

  const handleClick = event => {
    event.preventDefault();
    if (route.path === to) return;
    if (onClick) onClick(event);
    history.push(to);
  };

  return /*#__PURE__*/React.createElement("a", _extends({}, props, {
    onClick: handleClick
  }), children);
};

const Router = ({
  routes,
  NotFound,
  children
}) => {
  const [route, setRoute] = useState(history.location);
  const paths = Object.keys(routes).map(key => routes[key].path);
  const unlisten = history.listen(handleRouteChange);
  const is404 = paths.indexOf(route.path) === -1;

  const handleRouteChange = location => setRoute({
    route: locationToRoute(location)
  });

  useEffect(() => {
    // stop listening for changes if the Router component unmounts
    return () => unlisten();
  }, []);
  return /*#__PURE__*/React.createElement(RouterContext.Provider, {
    value: {
      route
    }
  }, is404 ? /*#__PURE__*/React.createElement(NotFound, null) : children);
};

export { Link, Route, Router, RouterContext, history };
