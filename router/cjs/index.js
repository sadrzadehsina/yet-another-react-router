'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var qs = require('querystringify');
var history$1 = require('history');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);

const locationToRoute = location => ({
  path: location.path,
  hash: location.hash,
  query: qs__default['default'].parse(location.search)
});

const history = history$1.createBrowserHistory();
const RouterContext = /*#__PURE__*/React__default['default'].createContext({
  route: locationTouRoute(history.location)
});

const Route = ({
  path,
  children
}) => {
  const {
    route
  } = React__default['default'].useContext(RouterContext);
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
  } = React__default['default'].useContext(RouterContext);

  const handleClick = event => {
    event.preventDefault();
    if (route.path === to) return;
    if (onClick) onClick(event);
    history.push(to);
  };

  return /*#__PURE__*/React__default['default'].createElement("a", _extends({}, props, {
    onClick: handleClick
  }), children);
};

const Router = ({
  routes,
  NotFound,
  children
}) => {
  const [route, setRoute] = React.useState(history.location);
  const paths = Object.keys(routes).map(key => routes[key].path);
  const unlisten = history.listen(handleRouteChange);
  const is404 = paths.indexOf(route.path) === -1;

  const handleRouteChange = location => setRoute({
    route: locationToRoute(location)
  });

  React.useEffect(() => {
    // stop listening for changes if the Router component unmounts
    return () => unlisten();
  }, []);
  return /*#__PURE__*/React__default['default'].createElement(RouterContext.Provider, {
    value: {
      route
    }
  }, is404 ? /*#__PURE__*/React__default['default'].createElement(NotFound, null) : children);
};

exports.Link = Link;
exports.Route = Route;
exports.Router = Router;
exports.RouterContext = RouterContext;
exports.history = history;
