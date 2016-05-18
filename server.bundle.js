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

	var express = __webpack_require__(23);
	var path = __webpack_require__(24);
	var compression = __webpack_require__(25);
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
	  return '\n    <!doctype html public="storage">\n    <html>\n      <meta charset=utf-8/>\n      <title>Frederic Rey - Front-end Web Developer</title>\n      <link href=\'https://fonts.googleapis.com/css?family=Permanent+Marker\' rel=\'stylesheet\' type=\'text/css\'>\n      <link rel="stylesheet" href="/semantic/dist/semantic.min.css">\n      <link rel="stylesheet" href="/devicons/css/devicons.min.css">\n      <link rel="stylesheet" href="/common.css">\n      <link rel=stylesheet href=/index.css>\n      <script src=\'https://www.google.com/recaptcha/api.js\'></script>\n      <div id=app>' + appHtml + '</div>\n      <script src="/jquery/jquery-2.2.3.min.js"></script>\n      <script src="/semantic/dist/semantic.min.js"></script>\n      <script src="/bundle.js"></script>\n  ';
	}

	app.post('/contactMe', function (req, res) {
	  // req.accepts('application/json');
	  // console.log(req.params);
	  res.send({
	    message: 'OK'
	  });
	});

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

	var _Superpowers = __webpack_require__(11);

	var _Superpowers2 = _interopRequireDefault(_Superpowers);

	var _Works = __webpack_require__(17);

	var _Works2 = _interopRequireDefault(_Works);

	var _Contact = __webpack_require__(18);

	var _Contact2 = _interopRequireDefault(_Contact);

	var _Footer = __webpack_require__(20);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _appState = __webpack_require__(22);

	var _appState2 = _interopRequireDefault(_appState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	    _this.state = _appState2.default;
	    return _this;
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'ui centered stackable grid container' },
	        _react2.default.createElement(_Header2.default, { superpowers: this.state.superpowers }),
	        _react2.default.createElement(_AboutMe2.default, null),
	        _react2.default.createElement(_Superpowers2.default, { superpowers: this.state.superpowers }),
	        _react2.default.createElement(_Works2.default, null),
	        _react2.default.createElement(_Contact2.default, null),
	        _react2.default.createElement(
	          'div',
	          { className: 'ui horizontal divider' },
	          _react2.default.createElement('i', { className: 'circular inverted blue lightning icon' })
	        ),
	        _react2.default.createElement(_Footer2.default, { footerLinks: this.state.footerLinks })
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

	var _reactRouter = __webpack_require__(3);

	var _HeaderContentLeft = __webpack_require__(8);

	var _HeaderContentLeft2 = _interopRequireDefault(_HeaderContentLeft);

	var _HeaderContentRight = __webpack_require__(9);

	var _HeaderContentRight2 = _interopRequireDefault(_HeaderContentRight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  superpowers: _react.PropTypes.array.isRequired
	};

	function Header(_ref) {
	  var superpowers = _ref.superpowers;

	  return _react2.default.createElement(
	    'div',
	    { id: 'header', className: 'three column row header-main-container' },
	    _react2.default.createElement('div', { className: 'three wide column' }),
	    _react2.default.createElement(
	      'div',
	      { className: 'nine wide column' },
	      _react2.default.createElement(
	        'div',
	        { className: 'ui centered blue card' },
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
	            _react2.default.createElement(_HeaderContentRight2.default, null)
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'description' },
	            'Frederic is et patiti et patata...',
	            _react2.default.createElement(
	              'a',
	              { 'data-scroll': true, href: '#aboutMe' },
	              'find more'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'extra content' },
	          _react2.default.createElement(
	            'a',
	            { 'data-scroll': true, href: '#superpowers' },
	            superpowers.length,
	            ' Superpowers'
	          )
	        )
	      )
	    ),
	    _react2.default.createElement('div', { className: 'three wide column' })
	  );
	}

	Header.propTypes = propTypes;

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
	    { id: "aboutMe", className: "one column row" },
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
	          { className: "content" },
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Superpower = __webpack_require__(12);

	var _Superpower2 = _interopRequireDefault(_Superpower);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  superpowers: _react.PropTypes.array.isRequired
	};

	var Superpowers = function (_React$Component) {
	  _inherits(Superpowers, _React$Component);

	  function Superpowers() {
	    _classCallCheck(this, Superpowers);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Superpowers).apply(this, arguments));
	  }

	  _createClass(Superpowers, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { id: 'superpowers', className: 'one column row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'column' },
	          _react2.default.createElement(
	            'div',
	            { className: 'ui center aligned raised padded segment' },
	            _react2.default.createElement(
	              'h3',
	              { className: 'ui icon header' },
	              _react2.default.createElement('i', { className: 'headerIcon circular inverted blue lightning icon' }),
	              _react2.default.createElement(
	                'p',
	                { className: 'headerText' },
	                'Super Powers'
	              )
	            ),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(
	              'div',
	              { className: 'ui large horizontal divided list' },
	              this.props.superpowers.map(function (superpower, idx) {
	                return _react2.default.createElement(_Superpower2.default, {
	                  key: idx,
	                  name: superpower.name,
	                  provider: superpower.provider,
	                  icon: superpower.icon,
	                  strength: superpower.strength,
	                  comment: superpower.comment });
	              })
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Star ratings init
	      $('.ui.rating').rating('disable');

	      // Superpower components - (onMouseOver/Hover)popups init
	      $('.superpower').popup({
	        inline: true,
	        delay: {
	          show: 100,
	          hide: 100
	        },
	        hoverable: true
	      });
	    }
	  }]);

	  return Superpowers;
	}(_react2.default.Component);

	Superpowers.propTypes = propTypes;

	exports.default = Superpowers;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  provider: _react.PropTypes.string,
	  icon: _react.PropTypes.string,
	  strength: _react.PropTypes.number.isRequired,
	  comment: _react.PropTypes.string.isRequired
	};

	var Superpower = function (_React$Component) {
	  _inherits(Superpower, _React$Component);

	  function Superpower() {
	    _classCallCheck(this, Superpower);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Superpower).apply(this, arguments));
	  }

	  _createClass(Superpower, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'item superpower',
	          'data-html': this.props.comment },
	        this.props.provider ? (0, _utils.generateIcon)(this.props.provider, this.props.icon) : '',
	        _react2.default.createElement(
	          'div',
	          { className: 'content' },
	          _react2.default.createElement(
	            'div',
	            { className: 'header' },
	            this.props.name
	          ),
	          _react2.default.createElement('div', { className: 'ui star rating',
	            'data-rating': this.props.strength,
	            'data-max-rating': '5' })
	        )
	      );
	    }
	  }]);

	  return Superpower;
	}(_react2.default.Component);

	Superpower.propTypes = propTypes;

	exports.default = Superpower;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generateIcon = generateIcon;
	exports.copyToClipboard = copyToClipboard;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _DeviconsIcon = __webpack_require__(14);

	var _DeviconsIcon2 = _interopRequireDefault(_DeviconsIcon);

	var _SemanticIcon = __webpack_require__(15);

	var _SemanticIcon2 = _interopRequireDefault(_SemanticIcon);

	var _SvgIcon = __webpack_require__(16);

	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * [Generates the appropriate icon React component]
	 * @param  {String} provider   [devicons/semantic/svg]
	 * @param  {String} icon       [For devicons & semantic, it should be the className
	 *                             of the according icon. Otherwise, the filename of
	 *                             the svg file should be here]
	 * @return {React Component}   [The appropriate React Component]
	 */
	function generateIcon(provider, icon) {
	  switch (provider) {
	    case 'devicons':
	      return _react2.default.createElement(_DeviconsIcon2.default, { icon: icon });

	    case 'semantic':
	      return _react2.default.createElement(_SemanticIcon2.default, { icon: icon });

	    case 'svg':
	      return _react2.default.createElement(_SvgIcon2.default, { icon: icon });

	    default:
	      return _DeviconsIcon2.default;
	  }
	}

	/**
	 * Copy param to clipboard.
	 * Works with:
	 * - Firefox 41+
	 * - Chrome 42+
	 * - IE 9+ & Edge
	 * - Opera 29+
	 * - Safari: NOT YET
	 * @param  {String}  text [Text to copy to clipboard]
	 */
	function copyToClipboard(text) {
	  // Doesn't work if 'hidden' or 'display-none'
	  var tempTxtInput = document.createElement('input');
	  tempTxtInput.id = 'textToCopy';
	  tempTxtInput.type = 'text';
	  tempTxtInput.readOnly = true;
	  // IMPORTANT: Only one dimension should be 0px
	  // otherwise Chrome won't select anything.
	  tempTxtInput.style.height = '0px';
	  tempTxtInput.defaultValue = text;

	  // Append to body the tempTxtInput with needed text
	  document.querySelector('body').appendChild(tempTxtInput);

	  // Select Input text
	  // Only works on text-type Input and textarea
	  tempTxtInput.select();
	  // document.getElementById(tempTxtInput.id).select();

	  // Copy selection
	  var copyBool = document.execCommand('copy');

	  // Remove tempTxtInput from DOM-Doc
	  document.querySelector('body').removeChild(tempTxtInput);
	  return copyBool;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  icon: _react.PropTypes.string.isRequired
	};

	function DeviconsIcon(_ref) {
	  var icon = _ref.icon;

	  var iconClass = 'devicons devicons-' + icon;
	  return _react2.default.createElement('span', { className: iconClass });
	}

	DeviconsIcon.propTypes = propTypes;

	exports.default = DeviconsIcon;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  icon: _react.PropTypes.string.isRequired
	};

	function SemanticIcon(_ref) {
	  var icon = _ref.icon;

	  var iconClass = icon + ' icon';
	  return _react2.default.createElement('i', { className: iconClass });
	}

	SemanticIcon.propTypes = propTypes;

	exports.default = SemanticIcon;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  icon: _react.PropTypes.string.isRequired
	};

	function SvgIcon(_ref) {
	  var icon = _ref.icon;

	  var iconSrc = '/svg/' + icon + '.svg';
	  var iconClass = icon + ' svgIcon';
	  return _react2.default.createElement('img', {
	    className: iconClass,
	    src: iconSrc,
	    alt: icon
	  });
	}

	SvgIcon.propTypes = propTypes;

	exports.default = SvgIcon;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Works(props) {
	  return _react2.default.createElement(
	    "div",
	    { id: "works", className: "eight wide column" },
	    _react2.default.createElement(
	      "div",
	      { className: "ui segment" },
	      _react2.default.createElement(
	        "a",
	        { className: "ui blue left ribbon label" },
	        _react2.default.createElement(
	          "h3",
	          null,
	          "Works"
	        )
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "content" },
	        _react2.default.createElement(
	          "p",
	          null,
	          "Please! check my works on:"
	        ),
	        _react2.default.createElement(
	          "p",
	          null,
	          "The source code of this website is even available at the bottom of the page."
	        )
	      )
	    )
	  );
	}

	exports.default = Works;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _SemanticIcon = __webpack_require__(15);

	var _SemanticIcon2 = _interopRequireDefault(_SemanticIcon);

	var _ContactFormModal = __webpack_require__(19);

	var _ContactFormModal2 = _interopRequireDefault(_ContactFormModal);

	var _utils = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Contact = function (_React$Component) {
	  _inherits(Contact, _React$Component);

	  function Contact() {
	    _classCallCheck(this, Contact);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Contact).apply(this, arguments));
	  }

	  _createClass(Contact, [{
	    key: 'handleCopyEmailToClipboard',
	    value: function handleCopyEmailToClipboard() {
	      console.log('Contact.js: handleCopyEmailToClipboard - Email icon pushed');
	      var num = Math.floor(Math.random() * 100000 % 50);

	      if ((0, _utils.copyToClipboard)('COPY-TEST-' + num)) {
	        // Show copy success message
	        console.log('Copy to cliplard Succeeded');
	      } else {
	        console.log('Copy to clipboard Failed');
	        // Copy to clipboard not compatible
	        // Show alternative message
	      }
	    }
	  }, {
	    key: 'handleOpenFormModal',
	    value: function handleOpenFormModal() {
	      $('.ui.modal').modal('show');
	    }
	  }, {
	    key: 'handleCloseFormModal',
	    value: function handleCloseFormModal() {
	      $('.ui.modal').modal('hide');
	      // document.querySelector('.ui.modal form').reset();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { id: 'contact', className: 'eight wide column' },
	        _react2.default.createElement(
	          'div',
	          { className: 'ui segment' },
	          _react2.default.createElement(
	            'a',
	            { className: 'ui blue right ribbon label' },
	            _react2.default.createElement(
	              'h3',
	              null,
	              'Contact'
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'mainContent' },
	            _react2.default.createElement(
	              'div',
	              { id: 'contactTop' },
	              _react2.default.createElement(
	                'p',
	                null,
	                'We can get in touch by:'
	              ),
	              _react2.default.createElement('i', { title: 'Click to copy to clipboard!',
	                className: 'mail link icon',
	                onClick: this.handleCopyEmailToClipboard }),
	              _react2.default.createElement(
	                'span',
	                { id: 'contactEmail' },
	                'Frederic.Rey.Pro@gmail.com'
	              ),
	              _react2.default.createElement('br', null),
	              _react2.default.createElement(
	                'span',
	                null,
	                'or directly on',
	                _react2.default.createElement(
	                  'a',
	                  {
	                    href: 'https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-rey-a2928299',
	                    target: '_blank' },
	                  _react2.default.createElement(_SemanticIcon2.default, { icon: 'linkedin' })
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'h5',
	              { className: 'ui horizontal divider header' },
	              _react2.default.createElement('i', { className: 'small send icon' }),
	              'Quick form'
	            ),
	            _react2.default.createElement(
	              'span',
	              { id: 'contactBottom' },
	              'Click ',
	              _react2.default.createElement(
	                'button',
	                {
	                  className: 'ui mini basic blue button',
	                  onClick: this.handleOpenFormModal },
	                'here'
	              ),
	              ' to contact me.'
	            )
	          )
	        ),
	        _react2.default.createElement(_ContactFormModal2.default, { closeModal: this.handleCloseFormModal })
	      );
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      $('#contactEmail').popup({
	        inline: true,
	        target: '.mail.link.icon',
	        content: 'Click the icon to copy the Email!'
	      });
	    }
	  }]);

	  return Contact;
	}(_react2.default.Component);

	exports.default = Contact;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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

	var propTypes = {
	  closeModal: _react.PropTypes.func.isRequired
	};

	var ContactFormModal = function (_React$Component) {
	  _inherits(ContactFormModal, _React$Component);

	  function ContactFormModal(props) {
	    _classCallCheck(this, ContactFormModal);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContactFormModal).call(this, props));
	    // Put bindings here if necessary
	  }

	  _createClass(ContactFormModal, [{
	    key: 'handleSubmit',
	    value: function handleSubmit(e) {
	      console.log('ContactBackSide.js: handleSubmit()');
	      e.preventDefault();
	      var email = e.target.elements[0].value;
	      var fullname = e.target.elements[1].value;
	      var message = e.target.elements[2].value;
	      console.log('Email: ' + email + '\n Fullname: ' + fullname + '\n Message: ' + message);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { id: 'contactFormModal', className: 'ui modal' },
	        _react2.default.createElement(
	          'div',
	          { className: 'content' },
	          _react2.default.createElement(
	            'div',
	            { className: 'ui center aligned raised padded segment' },
	            _react2.default.createElement(
	              'h3',
	              { className: 'ui icon header' },
	              _react2.default.createElement('i', { className: 'headerIcon circular inverted blue send icon' }),
	              _react2.default.createElement(
	                'p',
	                { className: 'headerText' },
	                'Quick Form'
	              )
	            ),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(
	              'form',
	              { method: 'POST', className: 'ui form', onSubmit: this.handleSubmit },
	              _react2.default.createElement(
	                'div',
	                { className: 'field' },
	                _react2.default.createElement(
	                  'label',
	                  { htmlFor: 'email' },
	                  'Email'
	                ),
	                _react2.default.createElement('input', {
	                  id: 'email',
	                  type: 'email',
	                  name: 'email',
	                  placeholder: 'Enter your email' })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'field' },
	                _react2.default.createElement(
	                  'label',
	                  { htmlFor: 'fullname' },
	                  'Full name'
	                ),
	                _react2.default.createElement('input', {
	                  id: 'fullname',
	                  type: 'text',
	                  name: 'fullname',
	                  placeholder: 'Enter your full name' })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'field' },
	                _react2.default.createElement(
	                  'label',
	                  { htmlFor: 'message' },
	                  'Message'
	                ),
	                _react2.default.createElement('textarea', {
	                  id: 'message',
	                  name: 'message',
	                  cols: '30',
	                  rows: '4' })
	              ),
	              _react2.default.createElement('div', { 'class': 'g-recaptcha', 'data-sitekey': '6LcVnx8TAAAAAH9NmpieueQZWJF-rpjMBlBfOpKu' }),
	              _react2.default.createElement('br', null),
	              _react2.default.createElement(
	                'div',
	                { className: 'ui buttons' },
	                _react2.default.createElement(
	                  'button',
	                  { className: 'ui button',
	                    onClick: this.props.closeModal },
	                  'Cancel'
	                ),
	                _react2.default.createElement('div', { className: 'or' }),
	                _react2.default.createElement(
	                  'button',
	                  { className: 'ui blue button', type: 'submit' },
	                  'Submit'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return ContactFormModal;
	}(_react2.default.Component);

	ContactFormModal.propTypes = propTypes;

	exports.default = ContactFormModal;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _FooterLinks = __webpack_require__(21);

	var _FooterLinks2 = _interopRequireDefault(_FooterLinks);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  footerLinks: _react.PropTypes.array.isRequired
	};

	var Footer = function (_React$Component) {
	  _inherits(Footer, _React$Component);

	  function Footer() {
	    _classCallCheck(this, Footer);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).apply(this, arguments));
	  }

	  _createClass(Footer, [{
	    key: 'handleMouseOver',
	    value: function handleMouseOver(e) {
	      $(e.target).transition('jiggle');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { id: 'footer', className: 'one column row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'column' },
	          _react2.default.createElement(_FooterLinks2.default, { footerLinks: this.props.footerLinks }),
	          _react2.default.createElement('br', null),
	          'Built with ',
	          _react2.default.createElement('i', { className: 'red heart icon', onMouseOver: this.handleMouseOver }),
	          'with  React',
	          _react2.default.createElement('br', null),
	          '© 2016 Frederic Rey',
	          _react2.default.createElement('br', null),
	          _react2.default.createElement(
	            'a',
	            {
	              id: 'sourceCode',
	              className: 'ui tiny pointing blue label',
	              href: 'https://github.com/DdZ-Fred/fredrey',
	              target: '_blank' },
	            'Source Code'
	          )
	        )
	      );
	    }
	  }]);

	  return Footer;
	}(_react2.default.Component);

	Footer.propTypes = propTypes;

	exports.default = Footer;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  footerLinks: _react.PropTypes.array.isRequired
	};

	function FooterLinks(_ref) {
	  var footerLinks = _ref.footerLinks;

	  return _react2.default.createElement(
	    "div",
	    { id: "footerLinks", className: "ui tiny horizontal divided list" },
	    footerLinks.map(function (link, idx) {
	      return _react2.default.createElement(
	        "div",
	        { key: idx, className: "item" },
	        _react2.default.createElement(
	          "div",
	          { className: "content" },
	          _react2.default.createElement(
	            "a",
	            { "data-scroll": true, href: "#" + link.anchor, className: "header" },
	            link.title,
	            link.icon && _react2.default.createElement("i", { className: link.icon + " icon" })
	          )
	        )
	      );
	    })
	  );
	}

	FooterLinks.propTypes = propTypes;

	exports.default = FooterLinks;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  superpowers: [{
	    name: 'HTML/CSS',
	    provider: 'devicons',
	    icon: 'html5',
	    strength: 4,
	    comment: 'HTML is fine, that being said, I\'m not an expert ' + 'in CSS even though I usually get the job done anyway'
	  }, {
	    name: 'JavaScript/ES6',
	    provider: 'devicons',
	    icon: 'javascript_badge',
	    strength: 3,
	    comment: 'Trying as much as I can to write ' + '<a href="https://github.com/airbnb/javascript/" target="_blank">Airbnb-style</a> code'
	  }, {
	    name: 'ESLint',
	    provider: 'svg',
	    icon: 'eslint',
	    strength: 4,
	    comment: 'Because writing good and consistent code is important. ' + 'I use the <a href="https://www.npmjs.com/package/eslint-config-airbnb-base">airbnb-base</a> config'
	  }, {
	    name: 'NodeJS',
	    provider: 'devicons',
	    icon: 'nodejs_small',
	    strength: 3,
	    comment: 'Experience with:<br />' + '<strong>npm</strong> / ' + '<strong>globals</strong> / ' + '<strong>module locals</strong><br />' + 'Small experience with native modules'
	  }, {
	    name: 'React',
	    provider: 'devicons',
	    icon: 'react',
	    strength: 3,
	    comment: '...React is magic ?'
	  }, {
	    name: 'Meteor',
	    provider: 'devicons',
	    icon: 'meteor',
	    strength: 4,
	    comment: 'Meteor is definitely the most magical!'
	  }, {
	    name: 'MongoDB',
	    provider: 'devicons',
	    icon: 'mongodb',
	    strength: 3,
	    comment: 'Used a lot with Meteor and NodeJS/Express apps.\n                <br />Had been using Mongoose as well.'
	  }, {
	    name: 'Webpack',
	    provider: 'svg',
	    icon: 'webpack',
	    strength: 3,
	    comment: 'Its use is quite new to me but I know the most common config properties.\n                <br />Has always been used with Babel so far.'
	  }],
	  socialProfiles: [{
	    name: 'Linkedin',
	    url: 'https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-rey-a2928299',
	    provider: 'semantic',
	    // Semantic UI: OR 'linkedin square'
	    icon: 'linkedin'
	  }, {
	    name: 'GitHub',
	    url: 'https://github.com/DdZ-Fred',
	    provider: 'semantic',
	    // Semantic UI: OR 'github alternate' OR 'github square'
	    icon: 'github'
	  }, {
	    name: 'BitBucket',
	    url: 'https://bitbucket.org/DdZ-Fred',
	    provider: 'semantic',
	    // Semantic UI: OR 'bitbucket square'
	    icon: 'bitbucket'
	  }, {
	    name: 'Twitter',
	    url: 'https://twitter.com/rey_fr7154a',
	    provider: 'semantic',
	    // Semantic UI: OR 'twitter square'
	    icon: 'twitter'
	  }],
	  footerLinks: [{
	    title: 'AboutMe',
	    anchor: 'aboutMe',
	    icon: ''
	  }, {
	    title: 'Superpowers',
	    anchor: 'superpowers',
	    icon: ''
	  }, {
	    title: 'Works',
	    anchor: 'works',
	    icon: ''
	  }, {
	    title: 'Contact',
	    anchor: 'contact',
	    icon: ''
	  }, {
	    title: 'Top',
	    anchor: 'header',
	    icon: 'pointing up'
	  }]
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ }
/******/ ]);