/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(2);

	var _reactRouter = __webpack_require__(3);

	var _routes = __webpack_require__(4);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var express = __webpack_require__(13);
	var path = __webpack_require__(14);
	var compression = __webpack_require__(15);
	// Allows to render our app to an html string

	// Alows to match the url to route and then render

	var app = express();
	app.use(compression());

	// express.static: Allows to specify the directory from which the static assets are to be served.
	// Param 1: root directory
	// Param 2+: Options
	//
	// path.join concatenates string arguments to crreate a single path
	app.use(express.static(path.join(__dirname, 'public')));

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n      <meta charset=utf-8/>\n      <title>My First React Router App</title>\n      <link rel="stylesheet" href="/semantic/dist/semantic.min.css">\n      <link rel="stylesheet" href="/common.css">\n      <link rel=stylesheet href=/index.css>\n      <div id=app>' + appHtml + '</div>\n      <script src="/semantic/dist/semantic.min.js"></script>\n      <script src="/bundle.js"></script>\n  ';
	}

	app.get('*', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    if (err) {
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      // `RouterContext` is the what `Router` renders. `Router` keeps these
	      // `props` in its state as it listens to `browserHistory`. But on the
	      // server our app is stateless, so we need to use `match` to
	      // get these props before rendering
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	      res.send(renderPage(appHtml));
	    } else {
	      res.status(404).send('Not Found');
	    }
	  });
	});

	var PORT = process.env.PORT || 8080;

	app.listen(PORT, function () {
	  console.log('Production Express server is running at localhost:' + PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(5);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(3);

	var _App = __webpack_require__(6);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(_reactRouter.Route, { path: '/', component: _App2.default });

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Header = __webpack_require__(7);

	var _Header2 = _interopRequireDefault(_Header);

	var _AboutMe = __webpack_require__(10);

	var _AboutMe2 = _interopRequireDefault(_AboutMe);

	var _Friends = __webpack_require__(11);

	var _Friends2 = _interopRequireDefault(_Friends);

	var _Footer = __webpack_require__(12);

	var _Footer2 = _interopRequireDefault(_Footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'ui centered grid' },
	        _react2.default.createElement(_Header2.default, null),
	        _react2.default.createElement(_AboutMe2.default, null),
	        _react2.default.createElement(_Friends2.default, null),
	        _react2.default.createElement(_Footer2.default, null)
	      );
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	exports.default = App;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _HeaderContentLeft = __webpack_require__(8);

	var _HeaderContentLeft2 = _interopRequireDefault(_HeaderContentLeft);

	var _HeaderContentRight = __webpack_require__(9);

	var _HeaderContentRight2 = _interopRequireDefault(_HeaderContentRight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Header(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'three column row header-main-container' },
	    _react2.default.createElement('div', { className: 'three wide column' }),
	    _react2.default.createElement(
	      'div',
	      { className: 'nine wide column' },
	      _react2.default.createElement(
	        'div',
	        { className: 'ui centered teal card' },
	        _react2.default.createElement(
	          'div',
	          { className: 'image' },
	          _react2.default.createElement('img', { src: 'https://avatars.githubusercontent.com/u/6842608?v=3', alt: '' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'ui grid content' },
	          _react2.default.createElement(
	            'div',
	            { className: 'two column row' },
	            _react2.default.createElement(_HeaderContentLeft2.default, null),
	            _react2.default.createElement(
	              'div',
	              { className: 'ui vertical divider' },
	              _react2.default.createElement('i', { className: 'random icon' })
	            ),
	            _react2.default.createElement(_HeaderContentRight2.default, null)
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'description' },
	            'Frederic is patiti patata......',
	            _react2.default.createElement(
	              'a',
	              { className: '' },
	              'findMore'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'extra content' },
	          _react2.default.createElement(
	            'a',
	            null,
	            '20+ Tech-Friends'
	          )
	        )
	      )
	    ),
	    _react2.default.createElement('div', { className: 'three wide column' })
	  );
	}

	exports.default = Header;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function HeaderContentLeft(props) {
	  return _react2.default.createElement(
	    "div",
	    { className: "eight wide column" },
	    _react2.default.createElement(
	      "a",
	      { className: "header" },
	      _react2.default.createElement(
	        "h3",
	        null,
	        "Frederic Rey"
	      )
	    ),
	    _react2.default.createElement(
	      "div",
	      { className: "meta" },
	      _react2.default.createElement(
	        "span",
	        { className: "date" },
	        "Joined in 2016"
	      ),
	      _react2.default.createElement("br", null),
	      _react2.default.createElement(
	        "span",
	        { className: "date" },
	        _react2.default.createElement("i", { className: "pf flag" }),
	        _react2.default.createElement("i", { className: "france flag" })
	      )
	    )
	  );
	}

	exports.default = HeaderContentLeft;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function HeaderContentRight(props) {
	  return _react2.default.createElement(
	    "div",
	    { className: "eight wide column headerContentRightContainer" },
	    _react2.default.createElement(
	      "div",
	      { className: "row" },
	      _react2.default.createElement(
	        "h3",
	        { className: "ui teal label" },
	        "FRONT"
	      )
	    ),
	    _react2.default.createElement(
	      "div",
	      { className: "row" },
	      _react2.default.createElement(
	        "h3",
	        { className: "ui blue label" },
	        "END"
	      )
	    ),
	    _react2.default.createElement(
	      "div",
	      { className: "row" },
	      _react2.default.createElement(
	        "h3",
	        { className: "ui teal label" },
	        "DEV"
	      )
	    )
	  );
	}

	exports.default = HeaderContentRight;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function AboutMe(props) {
	  return _react2.default.createElement(
	    "div",
	    { className: "one column row" },
	    _react2.default.createElement(
	      "div",
	      { className: "column" },
	      _react2.default.createElement(
	        "div",
	        { className: "ui segment" },
	        _react2.default.createElement(
	          "a",
	          { className: "ui blue ribbon label" },
	          _react2.default.createElement(
	            "h3",
	            null,
	            "About me"
	          )
	        ),
	        _react2.default.createElement(
	          "p",
	          null,
	          "This is about me youhouuuuu",
	          _react2.default.createElement("br", null),
	          "Patati et patata",
	          _react2.default.createElement("br", null),
	          "Spiri sporinf et spati poinrf"
	        )
	      )
	    )
	  );
	}

	exports.default = AboutMe;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Friends(props) {
	  return _react2.default.createElement(
	    "div",
	    { className: "one column row" },
	    _react2.default.createElement(
	      "div",
	      { className: "column" },
	      _react2.default.createElement(
	        "div",
	        { className: "ui segment" },
	        _react2.default.createElement(
	          "a",
	          { className: "ui blue right ribbon label" },
	          _react2.default.createElement(
	            "h3",
	            null,
	            "Friends"
	          )
	        ),
	        _react2.default.createElement(
	          "p",
	          null,
	          "My Friends/Skills here"
	        )
	      )
	    )
	  );
	}

	exports.default = Friends;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Footer = function (_React$Component) {
	  _inherits(Footer, _React$Component);

	  function Footer() {
	    _classCallCheck(this, Footer);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).apply(this, arguments));
	  }

	  _createClass(Footer, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "three column row" },
	        _react2.default.createElement(
	          "div",
	          { className: "three wide column" },
	          "LEFT"
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "nine wide column" },
	          "LOGO HERE",
	          _react2.default.createElement("br", null),
	          _react2.default.createElement(
	            "a",
	            { href: "https://github.com/DdZ-Fred/fredrey" },
	            "Source Code"
	          )
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "three wide column" },
	          "RIGHT"
	        )
	      );
	    }
	  }]);

	  return Footer;
	}(_react2.default.Component);

	exports.default = Footer;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ }
/******/ ]);