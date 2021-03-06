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

	var _axios = __webpack_require__(1);

	var _axios2 = _interopRequireDefault(_axios);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(3);

	var _reactRouter = __webpack_require__(4);

	var _utils = __webpack_require__(5);

	var _apiConfigs = __webpack_require__(6);

	var _errorHandlers = __webpack_require__(7);

	var _routes = __webpack_require__(8);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// #TODO:20 Test Heroku Free SSL Beta
	// https://blog.heroku.com/archives/2016/5/18/announcing_heroku_free_ssl_beta_and_flexible_dyno_hours
	var express = __webpack_require__(31);
	var path = __webpack_require__(32);
	var bodyParser = __webpack_require__(33);
	var compression = __webpack_require__(34);
	// Allows to render our app to an html string

	// Alows to match the url to route and then render


	var app = express();
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(bodyParser.json());
	app.use(compression());

	// express.static: Allows to specify the directory from which the static assets are to be served.
	// Param 1: root directory
	// Param 2+: Options
	//
	// path.join concatenates string arguments to crreate a single path
	app.use(express.static(path.join(__dirname, 'public')));

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n      <meta charset="utf-8"/>\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      <title>Frederic Rey - Front-end Web Developer</title>\n      <link rel="icon" href="/favicon.ico" type="image/x-icon">\n      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">\n      <link rel="apple-touch-icon" href="/apple-touch-icon.png">\n      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Permanent+Marker" type="text/css">\n      <link rel="stylesheet" href="/semantic/dist/semantic.min.css">\n      <link rel="stylesheet" href="/devicons/css/devicons.min.css">\n      <link rel="stylesheet" href="/common.css">\n      <link rel="stylesheet" href="/index.css">\n      <script src="/animations.js"></script>\n      <script type="text/javascript">\n        var onloadCallback = function() {\n          console.log(\'reCAPTCHA IS ready!\');\n          var contactMeBtn = document.querySelector(\'#contactBottom .grey.disabled.button\');\n          contactMeBtn.classList.remove(\'grey\');\n          contactMeBtn.classList.remove(\'disabled\');\n          contactMeBtn.classList.add(\'blue\');\n        }\n        window.onload = function() {\n          console.log(\'Window loaded! Executing animations...\');\n          animHeader();\n        }\n      </script>\n      <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>\n      <div id="app">' + appHtml + '</div>\n      <script src="/jquery/jquery-2.2.3.min.js"></script>\n      <script src="/semantic/dist/semantic.min.js"></script>\n      <script src="/bundle.js"></script>\n  ';
	}

	app.post('/contactMe', function (req, res) {
	  var _req$body = req.body;
	  var fullname = _req$body.fullname;
	  var email = _req$body.email;
	  var message = _req$body.message;
	  var recaptchaResponse = _req$body.recaptchaResponse;


	  var areDepsOk = fullname && email && message && recaptchaResponse;

	  if (areDepsOk) {
	    var recaptchaInstance = _axios2.default.create();
	    recaptchaInstance.request((0, _apiConfigs.getRecaptchaApiConf)(req)).then(function (_ref) {
	      var data = _ref.data;

	      // Response Status check
	      if (data.success) {
	        console.log('reCaptcha check Successful! Now sending the email!');
	        // Send Email with Mailgun here
	        var newMail = (0, _utils.createFormattedMessage)('client', {
	          fullname: req.body.fullname,
	          email: req.body.email,
	          message: req.body.message
	        });
	        var mailgunInstance = _axios2.default.create();
	        mailgunInstance.request((0, _apiConfigs.getMailgunApiConf)(newMail)).then(function (_ref2) {
	          var data = _ref2.data;

	          console.log('Mailgun: ' + data.message + '.\nMailgun: MessageID = ' + data.id);

	          res.send({
	            type: 'email_sent',
	            message: 'Your message has been sent! ' + 'I will answer as soon as I can!'
	          });
	        }).catch(function (mailgunRequestResponse) {
	          (0, _errorHandlers.handleMailgunErrors)(res, mailgunRequestResponse);
	        });
	      } else {
	        console.log('\nAPI[/contactMe]: reCaptcha check Failed!');
	        console.log('Error codes: ' + data['error-codes']);
	        // Don't send email with Mailgun

	        res.status(400).send({
	          type: 'recaptcha_check_failed',
	          message: 'The recaptcha check was unsuccessful, the message canot be sent!'
	        });
	      }
	    }).catch(function (recaptchaRequestResponse) {
	      (0, _errorHandlers.handleRecaptchaErrors)(res, recaptchaRequestResponse);
	    });
	  } else {
	    console.log('\nAPI[/contactMe]: Missing data.');
	    console.log('See data received below:\n' + JSON.stringify(req.body));
	    res.status(400).send({
	      type: 'missing_data',
	      message: 'We couldn\'t receive all your information' + ', please try submitting the form again!'
	    });
	  }
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

	module.exports = require("axios");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createFormattedMessage = createFormattedMessage;
	/**
	 * Returns a simple message/email object
	 * @param  {String} template    [client/notFound]
	 * @param  {Object} data        [Poly-structural...]
	 *  IF client:
	 *     - data.fullname       {String}   [Client full name]
	 *     - data.email          {String}   [Client email]
	 *     - data.message        {String}   [Client message]
	 *   IF notFound:
	 *     - data.resourceName   {String}   [Name of the resource requested]
	 *     - data.requestConfig  {Object}   [Represents the config used when the request was made]
	 * @return {Object}             [The email to send]
	 */
	function createFormattedMessage(template, data) {
	  var eFrom = 'FREDREY.COM <' + process.env.FREDREY_MAILGUN_LOGIN + '>';
	  var eTo = 'Frederic.Rey.Pro@gmail.com';
	  var eSubject = 'test';
	  var eHtml = void 0;

	  switch (template) {

	    case 'client':
	      {
	        eHtml = 'Dear Frederic!<br/><br/>\n        My name is ' + data.fullname + '.' + data.message + '<br/><br />\n        You can contact me at the following address: ' + data.email;
	        break;
	      }

	    case 'notFound':
	      {
	        eHtml = 'Dear mySelf!<br /><br />\n        The resource ' + data.resourceName + ' seems not to be available anymore.<br />\n        The request\'s config can be found below:<br />\n        ' + data.requestConfig.toString() + '<br /><br />\n        Cheers!';
	        break;
	      }

	    default:
	      {
	        // Test Mailgun API
	        eHtml = 'Dear myself!<br /><br />This is a Mailgun Test email!<br /><br />Fred';
	        break;
	      }
	  }
	  return {
	    from: eFrom,
	    to: eTo,
	    subject: eSubject,
	    html: eHtml
	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getRecaptchaApiConf = getRecaptchaApiConf;
	exports.getMailgunApiConf = getMailgunApiConf;
	/**
	 * Returns an object that represents the request config needed to consume the reCaptcha API.
	 * @param  {Object} req   [Client/browser request which contains the recaptcha response
	 *                        and client IP-Address]
	 * @return {Object}       [reCaptcha request config]
	 */
	function getRecaptchaApiConf(req) {
	  return {
	    method: 'post',
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
	    url: 'https://www.google.com/recaptcha/api/siteverify',
	    params: {
	      secret: process.env.RECAPTCHA_SECRET,
	      response: req.body.recaptchaResponse,
	      remoteip: req.ip
	    }
	  };
	}

	/**
	 * Returns an object that represents the request config needed to consume the Mailgun API.
	 * @param  {Object} mail [Object which represents an email (with to/from/subject...as properties)]
	 * @return {Object}      [Mailgun request config]
	 */
	function getMailgunApiConf(mail) {
	  return {
	    method: 'post',
	    baseURL: process.env.FREDREY_MAILGUN_BASEURL,
	    url: '/messages',
	    auth: {
	      username: 'api',
	      password: process.env.FREDREY_MAILGUN_KEY
	    },
	    params: mail
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleRecaptchaErrors = handleRecaptchaErrors;
	exports.handleMailgunErrors = handleMailgunErrors;

	var _axios = __webpack_require__(1);

	var _axios2 = _interopRequireDefault(_axios);

	var _apiConfigs = __webpack_require__(6);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Handles the errors that can occur when requesting the reCatpcha API
	 * @param  {Object} res                      [HTTP response of the /contactMe resource]
	 * @param  {Object} recaptchaRequestResponse [Axios response received requesting the reCaptcha API]
	 *         @property  {Number}  status       [Status code]
	 *         @property  {String}  statusText   [Status message]
	 *         @property  {Object}  config       [Original axios request config]
	 */
	function handleRecaptchaErrors(res, _ref) {
	  var status = _ref.status;
	  var statusText = _ref.statusText;
	  var config = _ref.config;

	  console.log('\nAPI[/contactMe]: reCaptcha request error.\nStatus: ' + statusText + ' (' + status + ')');
	  switch (status) {

	    // Internal Server error
	    case 500:
	      {
	        console.log('Type: Internal Server Error');
	        res.status(400).send({
	          type: 'recaptcha_server_error',
	          message: 'The Google reCatpcha servers coudn\'t answer, sorry! ' + 'You\'ll have to contact me the old (and boring) way!'
	        });
	        break;
	      }

	    // Not found
	    case 404:
	      {
	        console.log('Type: Not Found');
	        res.status(400).send({
	          type: 'recaptcha_not_found',
	          message: 'An error occured trying to contact the Google reCaptcha servers. ' + 'The error has been sent to me and will be resolved soon. ' + 'You\'ll have to contact me the old (and boring) way! sorry!'
	        });
	        // Send email to myself with error
	        var notFoundEmail = (0, _utils.createFormattedMessage)('notFound', {
	          resourceName: 'reCaptcha',
	          requestConfig: config
	        });
	        var instance = _axios2.default.create();
	        instance.request((0, _apiConfigs.getMailgunApiConf)(notFoundEmail)).then(function (_ref2) {
	          var data = _ref2.data;

	          console.log('\nMailgun: NotFound message sent!\n' + data.message + '\nMessageId: ' + data.id);
	        }).catch(function (_ref3) {
	          var status = _ref3.status;
	          var statusText = _ref3.statusText;

	          console.log('\nMailgun: Error trying to send NotFound email.\n          Status: ' + status + '\nStatusText: ' + statusText);
	        });
	        break;
	      }

	    // Bad request
	    case 400:
	      {
	        console.log('Type: Bad request');
	        res.status(400).send({
	          type: 'recaptcha_bad_request',
	          message: 'An error occured trying to contact the Google reCaptcha servers, sorry! ' + 'Please try again!. If the error is recurrent, then, I\'m afraid you\'ll ' + 'have to contact me the old way!'
	        });
	        break;
	      }

	    default:
	      {
	        console.log('Type: Other error');
	        res.status(400).send({
	          type: 'recaptcha_other_error',
	          message: 'An error occured trying to contact the Google reCaptcha servers, sorry! ' + 'I\'m afraid you\'ll have to contact me the old way!'
	        });
	        break;
	      }

	  }
	}

	/**
	 * Handles the errors that can occur when requesting the Mailgun API
	 * @param  {Object} res                    [HTTP response of the /contactMe resource]
	 * @param  {Object} mailgunRequestResponse [Axios response received requesting the Mailgun API]
	 *         @property  {Number}  status       [Status code]
	 *         @property  {String}  statusText   [Status message]
	 *         @property  {Object}  config       [Original axios request config]
	 */
	function handleMailgunErrors(res, _ref4) {
	  var status = _ref4.status;
	  var statusText = _ref4.statusText;
	  var config = _ref4.config;

	  console.log('\nAPI[/contactMe]: Mailgun request error.\nStatus: ' + statusText + ' (' + status + ')');
	  switch (status) {
	    // Bad Req: Required param missing
	    case 400:
	      {
	        console.log('Type: Bad request, a parameter was missing. See request config below:');
	        res.status(400).send({
	          type: 'mailgun_bad_request',
	          message: 'An error occured while trying to send the email, sorry! ' + 'I\'m afraid you\'ll have to contact me the old way!'
	        });
	        break;
	      }

	    // Unauthorized: No valid api key
	    case 401:
	      {
	        console.log('Type: Unauthorized: Api key not valid!. See request config below:');
	        res.status(400).send({
	          type: 'mailgun_unauthorized',
	          message: 'An error occured while trying to send the email, sorry! ' + 'I\'m afraid you\'ll have to contact me the old way!'
	        });
	        break;
	      }

	    // Mailgun special error(..code is supposed to be for payment errors)
	    case 402:
	      {
	        console.log('Type: Request failed but parameters are ok!.\nSee request config below:');
	        res.status(400).send({
	          type: 'mailgun_request_failed',
	          message: 'An error occured while trying to send the email, sorry! ' + 'I\'m afraid you\'ll have to contact me the old way!'
	        });
	        break;
	      }

	    // Not Found
	    case 404:
	      {
	        console.log('Type: Not found. See request config below:');
	        res.status(400).send({
	          type: 'mailgun_not_found',
	          message: 'An error occured while trying to send the email, sorry! ' + 'I\'m afraid you\'ll have to contact me the old way!'
	        });
	        break;
	      }
	    default:
	      {
	        console.log('Type: Server error #' + status + ', ' + statusText + '!.');
	        res.status(400).send({
	          type: 'mailgun_server_error',
	          message: 'There\'s something wrong with the email service (Mailgun) I use, sorry! ' + 'Their service will probably be back soon online but better to contact me the old way!'
	        });
	        break;
	      }

	  }
	  console.log(JSON.stringify(config));
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(9);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(4);

	var _App = __webpack_require__(10);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(_reactRouter.Route, { path: '/', component: _App2.default });

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Header = __webpack_require__(11);

	var _Header2 = _interopRequireDefault(_Header);

	var _Superpowers = __webpack_require__(14);

	var _Superpowers2 = _interopRequireDefault(_Superpowers);

	var _Works = __webpack_require__(20);

	var _Works2 = _interopRequireDefault(_Works);

	var _Contact = __webpack_require__(21);

	var _Contact2 = _interopRequireDefault(_Contact);

	var _Footer = __webpack_require__(28);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _appState = __webpack_require__(30);

	var _appState2 = _interopRequireDefault(_appState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import AboutMe from './AboutMe';


	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	    _this.state = _appState2.default;
	    _this.updateContactFormModalState = _this.updateContactFormModalState.bind(_this);
	    _this.updateContactInnerModalState = _this.updateContactInnerModalState.bind(_this);
	    return _this;
	  }

	  _createClass(App, [{
	    key: 'updateContactFormModalState',
	    value: function updateContactFormModalState() {
	      var newContact = this.state.contact;
	      newContact.formModalOpened = true;
	      this.setState({
	        contact: newContact
	      });
	    }
	  }, {
	    key: 'updateContactInnerModalState',
	    value: function updateContactInnerModalState(newModalType, newModalContent) {
	      var newContact = this.state.contact;
	      newContact.innerModalType = newModalType;
	      newContact.innerModalContent = newModalContent;
	      this.setState({
	        contact: newContact
	      });
	    }

	    // TODO:50 Prepare AboutMe component text
	    // TODO:70 Re-Add AboutMe component

	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'ui centered stackable grid container' },
	        _react2.default.createElement(_Header2.default, { superpowers: this.state.superpowers }),
	        _react2.default.createElement(_Superpowers2.default, { superpowers: this.state.superpowers }),
	        _react2.default.createElement(_Works2.default, { gitProfiles: this.state.gitProfiles }),
	        _react2.default.createElement(_Contact2.default, {
	          formModalOpened: this.state.contact.formModalOpened,
	          innerModalType: this.state.contact.innerModalType,
	          innerModalContent: this.state.contact.innerModalContent,
	          updateContactFormModalState: this.updateContactFormModalState,
	          updateContactInnerModalState: this.updateContactInnerModalState }),
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _HeaderContentLeft = __webpack_require__(12);

	var _HeaderContentLeft2 = _interopRequireDefault(_HeaderContentLeft);

	var _HeaderContentRight = __webpack_require__(13);

	var _HeaderContentRight2 = _interopRequireDefault(_HeaderContentRight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  superpowers: _react.PropTypes.array.isRequired
	};

	var Header = function (_React$Component) {
	  _inherits(Header, _React$Component);

	  function Header() {
	    _classCallCheck(this, Header);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
	  }

	  _createClass(Header, [{
	    key: 'render',
	    value: function render() {
	      var superpowers = this.props.superpowers;

	      return _react2.default.createElement(
	        'div',
	        { id: 'header', className: 'row header-main-container' },
	        _react2.default.createElement(
	          'div',
	          { className: 'column' },
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
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'extra content' },
	              _react2.default.createElement(
	                'a',
	                { 'data-scroll': true, href: '#superpowers' },
	                _react2.default.createElement('i', { className: 'lightning icon' }),
	                superpowers.length + ' Superpowers'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Header;
	}(_react2.default.Component);

	Header.propTypes = propTypes;

	exports.default = Header;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function HeaderContentLeft() {
	  return _react2.default.createElement(
	    "div",
	    { className: "eight wide column headerContentLeftContainer" },
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
	      _react2.default.createElement("i", { className: "marker icon" }),
	      _react2.default.createElement(
	        "span",
	        { className: "sub header" },
	        _react2.default.createElement(
	          "small",
	          null,
	          "London, UK"
	        )
	      )
	    ),
	    _react2.default.createElement(
	      "pre",
	      { id: "myFlags" },
	      ' ',
	      _react2.default.createElement("i", { title: "Born and raised in Tahiti - French Polynesia", className: "pf flag" }),
	      _react2.default.createElement("i", { title: "Yep! I speak French! comment ca va ?", className: "fr flag" })
	    )
	  );
	}

	exports.default = HeaderContentLeft;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

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
	        { className: "ui teal label front hidden" },
	        "FRONT"
	      )
	    ),
	    _react2.default.createElement(
	      "div",
	      { className: "row" },
	      _react2.default.createElement(
	        "h3",
	        { className: "ui blue label end hidden" },
	        "END"
	      )
	    ),
	    _react2.default.createElement(
	      "div",
	      { className: "row" },
	      _react2.default.createElement(
	        "h3",
	        { className: "ui teal label dev hidden" },
	        "DEV"
	      )
	    )
	  );
	}

	exports.default = HeaderContentRight;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Superpower = __webpack_require__(15);

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
	    }
	  }]);

	  return Superpowers;
	}(_react2.default.Component);

	Superpowers.propTypes = propTypes;

	exports.default = Superpowers;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(16);

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
	      var selectorId = this.props.icon + 'Superpower';
	      return _react2.default.createElement(
	        'div',
	        { id: selectorId, className: 'item superpower' },
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
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // onMouseOver/Hover popup init
	      var selector = '#' + this.props.icon + 'Superpower';
	      $(selector).popup({
	        inline: true,
	        delay: {
	          show: 100,
	          hide: 100
	        },
	        hoverable: true,
	        html: this.props.comment
	      });
	    }
	  }]);

	  return Superpower;
	}(_react2.default.Component);

	Superpower.propTypes = propTypes;

	exports.default = Superpower;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generateIcon = generateIcon;
	exports.copyToClipboard = copyToClipboard;
	exports.resetSemanticInvalidForm = resetSemanticInvalidForm;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _DeviconsIcon = __webpack_require__(17);

	var _DeviconsIcon2 = _interopRequireDefault(_DeviconsIcon);

	var _SemanticIcon = __webpack_require__(18);

	var _SemanticIcon2 = _interopRequireDefault(_SemanticIcon);

	var _SvgIcon = __webpack_require__(19);

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
	      {
	        return _react2.default.createElement(_DeviconsIcon2.default, { icon: icon });
	      }
	    case 'semantic':
	      {
	        return _react2.default.createElement(_SemanticIcon2.default, { icon: icon });
	      }
	    case 'svg':
	      {
	        return _react2.default.createElement(_SvgIcon2.default, { icon: icon });
	      }
	    default:
	      {
	        return _DeviconsIcon2.default;
	      }
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

	/**
	 * Allows to reset the state of the form. It cleans up all the errors
	 * that can appear after validation.
	 * @param {String} formSelector   CSS-style selector that targets the form
	 *                                Default: '.ui.form'
	 */
	function resetSemanticInvalidForm() {
	  var formSelector = arguments.length <= 0 || arguments[0] === undefined ? '.ui.form' : arguments[0];

	  var aForm = document.querySelector(formSelector);
	  // Remove error class from form
	  aForm.classList.remove('error');

	  // Remove error class from fields
	  // unless the element has the message class.
	  // The error messages container has the 3 classes, field/error/message
	  // and the error class is needed for the errors to render appropriately.
	  var invalidFields = aForm.querySelectorAll('.field.error');
	  for (var i = 0; i < invalidFields.length; i++) {
	    if (!invalidFields[i].classList.contains('message')) {
	      invalidFields[i].classList.remove('error');
	    }
	  }

	  // Empty the .ui.error.message div
	  var errorMessagesContainer = aForm.querySelector('.ui.error.message');
	  if (errorMessagesContainer.firstChild) {
	    errorMessagesContainer.removeChild(errorMessagesContainer.firstChild);
	  }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  icon: _react.PropTypes.string.isRequired
	};

	function SvgIcon(_ref) {
	  var icon = _ref.icon;

	  var iconSrc = '/img/svg/' + icon + '.svg';
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  gitProfiles: _react.PropTypes.array.isRequired
	};

	function Works(_ref) {
	  var gitProfiles = _ref.gitProfiles;

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
	        gitProfiles.map(function (profile, idx) {
	          return _react2.default.createElement(
	            "a",
	            {
	              key: idx,
	              className: "gitProfile",
	              href: profile.url,
	              target: "_blank" },
	            _react2.default.createElement("i", { title: profile.name, className: "big " + profile.icon + " icon" })
	          );
	        }),
	        _react2.default.createElement(
	          "p",
	          null,
	          "The source code of this website is even available at the bottom of the page."
	        )
	      )
	    )
	  );
	}

	Works.propTypes = propTypes;

	exports.default = Works;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ContactFormModal = __webpack_require__(22);

	var _ContactFormModal2 = _interopRequireDefault(_ContactFormModal);

	var _ContactInnerModalContainer = __webpack_require__(24);

	var _ContactInnerModalContainer2 = _interopRequireDefault(_ContactInnerModalContainer);

	var _utils = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  formModalOpened: _react.PropTypes.bool.isRequired,
	  innerModalType: _react.PropTypes.string.isRequired,
	  innerModalContent: _react.PropTypes.string.isRequired,
	  updateContactFormModalState: _react.PropTypes.func.isRequired,
	  updateContactInnerModalState: _react.PropTypes.func.isRequired
	};

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

	      // #TODO:30 Add alternative code for when the copy doesn't work
	      if ((0, _utils.copyToClipboard)('Frederic.Rey.Pro@gmail.com')) {
	        // Show copy success message
	        console.log('Copy to clipboard Succeeded');
	      } else {
	        console.log('Copy to clipboard Failed');
	        // Copy to clipboard not compatible
	        // Show alternative message
	      }
	    }
	  }, {
	    key: 'handleOpenFormModal',
	    value: function handleOpenFormModal() {
	      $('#contactFormModal').modal('show');
	    }
	  }, {
	    key: 'handleCloseFormModal',
	    value: function handleCloseFormModal(e) {
	      e.preventDefault();
	      $('#contactFormModal').modal('hide');
	    }

	    // DONE:10 Update LinkedIn icon (Rendering issue on Chrome)

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
	              _react2.default.createElement('i', {
	                id: 'contactEmailIcon',
	                title: 'Click to copy to clipboard!',
	                className: 'blue mail link icon',
	                onClick: this.handleCopyEmailToClipboard }),
	              _react2.default.createElement(
	                'span',
	                { id: 'contactEmail' },
	                'Frederic.Rey.Pro@gmail.com'
	              ),
	              _react2.default.createElement('br', null),
	              _react2.default.createElement(
	                'span',
	                { id: 'linkedinLine' },
	                'or via my',
	                _react2.default.createElement(
	                  'a',
	                  {
	                    href: 'https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-rey-a2928299',
	                    target: '_blank' },
	                  _react2.default.createElement('img', { id: 'linkedinIcon', src: '/img/png/link-edin.png', alt: 'LinkedIn Profile' })
	                ),
	                ' profile'
	              )
	            ),
	            _react2.default.createElement(
	              'h5',
	              { className: 'ui blue horizontal divider header' },
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
	                  className: 'ui mini basic grey disabled button',
	                  onClick: this.handleOpenFormModal },
	                'here'
	              ),
	              ' to contact me.'
	            )
	          )
	        ),
	        _react2.default.createElement(_ContactFormModal2.default, {
	          hasOpened: this.props.formModalOpened,
	          updateState: this.props.updateContactFormModalState,
	          closeModal: this.handleCloseFormModal,
	          innerModalType: this.props.innerModalType,
	          innerModalContent: this.props.innerModalContent,
	          updateInnerModalState: this.props.updateContactInnerModalState }),
	        _react2.default.createElement(_ContactInnerModalContainer2.default, {
	          modalType: this.props.innerModalType,
	          modalContent: this.props.innerModalContent })
	      );
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // onMouseOver Popup initialization
	      $('#contactEmail').popup({
	        inline: true,
	        target: '.mail.link.icon',
	        content: 'Click the icon to copy the Email!'
	      });

	      document.getElementById('contactEmail').addEventListener('mouseenter', function (e) {
	        e.preventDefault();
	        $('#contactEmailIcon').transition('jiggle');
	      });
	    }
	  }]);

	  return Contact;
	}(_react2.default.Component);

	Contact.propTypes = propTypes;

	exports.default = Contact;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(16);

	var _errorHandlers = __webpack_require__(23);

	var _axios = __webpack_require__(1);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  hasOpened: _react.PropTypes.bool.isRequired,
	  updateState: _react.PropTypes.func.isRequired,
	  closeModal: _react.PropTypes.func.isRequired,
	  innerModalType: _react.PropTypes.string.isRequired,
	  innerModalContent: _react.PropTypes.string.isRequired,
	  updateInnerModalState: _react.PropTypes.func.isRequired
	};

	// TODO:10 Override the height of the Modal so that the potentially hidden content can be seen by scrolling.
	// OS and browsers sometimes profide features that hide partly
	// the content (Ex: Chrome URL bar, iOS bottom bar...) */

	var ContactFormModal = function (_React$Component) {
	  _inherits(ContactFormModal, _React$Component);

	  function ContactFormModal(props) {
	    _classCallCheck(this, ContactFormModal);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactFormModal).call(this, props));

	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }

	  _createClass(ContactFormModal, [{
	    key: 'handleSubmit',
	    value: function handleSubmit(e) {
	      var _this2 = this;

	      e.preventDefault();

	      var isValidForm = $('.ui.form.contactForm').form('is valid');
	      // const captchaResponse = grecaptcha.getResponse();
	      var recaptchaResponse = e.target.elements['g-recaptcha-response'].value;

	      if (isValidForm && recaptchaResponse) {
	        // Disable submit button
	        document.getElementById('submitContactFormBtn').classList.add('disabled');

	        var fullname = e.target.elements['fullname'].value;
	        var email = e.target.elements['email'].value;
	        var message = e.target.elements['message'].value;

	        _axios2.default.post('/contactMe', {
	          fullname: fullname,
	          email: email,
	          message: message,
	          recaptchaResponse: recaptchaResponse
	        }).then(function (_ref) {
	          var data = _ref.data;

	          if (_this2.props.innerModalType !== 'success') {
	            _this2.props.updateInnerModalState('success', data.message);
	          }
	          $('.innerModal').modal('show');
	        }).catch(function (contactMeRequestResponse) {
	          (0, _errorHandlers.handleContactMeErrors)(contactMeRequestResponse, _this2);
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { id: 'contactFormModal', className: 'ui long modal contact blurring dimmable' },
	        _react2.default.createElement(
	          'div',
	          { className: 'content' },
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
	                'Quick Form'
	              )
	            ),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(
	              'form',
	              { className: 'ui form contactForm',
	                onSubmit: this.handleSubmit },
	              _react2.default.createElement(
	                'div',
	                { className: 'fields' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'eight wide field' },
	                  _react2.default.createElement('input', {
	                    id: 'fullname',
	                    type: 'text',
	                    name: 'fullname',
	                    placeholder: 'Full name' })
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'eight wide field' },
	                  _react2.default.createElement('input', {
	                    id: 'email',
	                    type: 'email',
	                    name: 'email',
	                    placeholder: 'Email' })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'sixteen wide field' },
	                _react2.default.createElement('textarea', {
	                  id: 'message',
	                  name: 'message',
	                  placeholder: 'Message',
	                  cols: '30',
	                  rows: '3' })
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'fields' },
	                _react2.default.createElement('div', { id: 'myRecaptcha', className: 'eight wide field' }),
	                _react2.default.createElement('div', { className: 'ui error message eight wide field' })
	              ),
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
	                  {
	                    id: 'submitContactFormBtn',
	                    className: 'ui blue button',
	                    type: 'submit' },
	                  'Submit'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this3 = this;

	      // Modal initialization
	      $('#contactFormModal').modal({
	        allowMultiple: true,
	        closable: false,
	        onShow: function onShow() {
	          if (!_this3.props.hasOpened) {
	            // Modal is showing for the first time
	            grecaptcha.render('myRecaptcha', {
	              sitekey: '6LcVnx8TAAAAAH9NmpieueQZWJF-rpjMBlBfOpKu',
	              size: 'compact'
	            });
	            _this3.props.updateState();
	          } else {
	            // Modal is re-opening
	            grecaptcha.reset();
	            // check if submit button is disabled
	            var isSubmitButtonDisabled = document.getElementById('submitContactFormBtn').classList.contains('disabled');
	            if (isSubmitButtonDisabled) {
	              document.getElementById('submitContactFormBtn').classList.remove('disabled');
	            }
	          }
	        },
	        onHide: function onHide() {
	          // Modal is hiding. Clean the form
	          document.querySelector('.ui.form.contactForm').reset();
	          var isValidForm = $('.ui.form.contactForm').form('is valid');
	          if (!isValidForm) {
	            // Default param is: '.ui.form'
	            (0, _utils.resetSemanticInvalidForm)('.ui.form.contactForm');
	          }
	        }
	      });

	      // Dimmer initialization
	      // (hides/blur the component so that user
	      // focuses on something else)
	      $('#contactFormModal').dimmer({
	        inverted: true,
	        closable: false,
	        duration: {
	          show: 400,
	          hide: 400
	        }
	      });

	      // Form validation initialization
	      $('.ui.form.contactForm').form({
	        revalidate: true,
	        fields: {
	          fullname: {
	            identifier: 'fullname',
	            rules: [{
	              type: 'empty',
	              prompt: 'Please enter your full name'
	            }]
	          },
	          email: {
	            identifier: 'email',
	            rules: [{
	              type: 'empty',
	              prompt: 'Please enter your email'
	            }, {
	              type: 'email',
	              prompt: 'Please enter a valid email'
	            }]
	          },
	          message: {
	            identifier: 'message',
	            rules: [{
	              type: 'empty',
	              prompt: 'Please enter a message'
	            }]
	          }
	        }
	      });
	    }
	  }]);

	  return ContactFormModal;
	}(_react2.default.Component);

	ContactFormModal.propTypes = propTypes;

	exports.default = ContactFormModal;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleContactMeErrors = handleContactMeErrors;
	/**
	 * [Handles the errors that can occur when requesting /contactMe API resource]
	 * @param  {Object} contactMeRequestResponse [Axios response object]
	 *         @property  {Object}  data         [Data sent with response]
	 * @param  {Object} ctx                      [ContactFormModal component context(this)]
	 */
	function handleContactMeErrors(_ref, ctx) {
	  var data = _ref.data;

	  var origin = data.type.substring(0, data.type.indexOf('_'));

	  // Update inner modal type if necessary
	  switch (origin) {
	    case 'missing':
	      {
	        if (ctx.props.innerModalType !== 'missing') {
	          ctx.props.updateInnerModalState('missing', data.message);
	        }
	        break;
	      }
	    // if recaptcha/mailgun/other
	    default:
	      {
	        if (ctx.props.innerModalType !== 'failure') {
	          ctx.props.updateInnerModalState('failure', data.message);
	        }
	        break;
	      }
	  }

	  // Show inner modal
	  $('.innerModal').modal('show');
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ContactInnerModalSuccess = __webpack_require__(25);

	var _ContactInnerModalSuccess2 = _interopRequireDefault(_ContactInnerModalSuccess);

	var _ContactInnerModalMissing = __webpack_require__(26);

	var _ContactInnerModalMissing2 = _interopRequireDefault(_ContactInnerModalMissing);

	var _ContactInnerModalFailure = __webpack_require__(27);

	var _ContactInnerModalFailure2 = _interopRequireDefault(_ContactInnerModalFailure);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  modalType: _react.PropTypes.string.isRequired,
	  modalContent: _react.PropTypes.string.isRequired
	};

	function ContactInnerModalContainer(_ref) {
	  var modalType = _ref.modalType;
	  var modalContent = _ref.modalContent;

	  var SelectedModal = void 0;
	  switch (modalType) {
	    case 'success':
	      {
	        SelectedModal = _ContactInnerModalSuccess2.default;
	        break;
	      }
	    case 'missing':
	      {
	        SelectedModal = _ContactInnerModalMissing2.default;
	        break;
	      }
	    case 'failure':
	      {
	        SelectedModal = _ContactInnerModalFailure2.default;
	        break;
	      }
	    default:
	      {
	        SelectedModal = _ContactInnerModalSuccess2.default;
	        break;
	      }
	  }
	  return _react2.default.createElement(SelectedModal, { content: modalContent });
	}

	ContactInnerModalContainer.propTypes = propTypes;

	exports.default = ContactInnerModalContainer;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  content: _react.PropTypes.string.isRequired
	};

	var ContactInnerModalSuccess = function (_React$Component) {
	  _inherits(ContactInnerModalSuccess, _React$Component);

	  function ContactInnerModalSuccess() {
	    _classCallCheck(this, ContactInnerModalSuccess);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContactInnerModalSuccess).apply(this, arguments));
	  }

	  _createClass(ContactInnerModalSuccess, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { id: "contactInnerModalSuccess", className: "ui small modal contact innerModal" },
	        _react2.default.createElement(
	          "div",
	          { className: "ui center aligned header" },
	          _react2.default.createElement("i", { className: "green smile icon" }),
	          "Thank You!"
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "content" },
	          this.props.content
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "actions" },
	          _react2.default.createElement(
	            "div",
	            { className: "ui approve green button" },
	            "Return To Home Page"
	          )
	        )
	      );
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      // Modal initialization
	      $('.innerModal').modal({
	        allowMultiple: true,
	        closable: false,
	        onShow: function onShow() {
	          // Show (Outer) Form Modal dimmer
	          $('#contactFormModal').dimmer('show');
	        },
	        onHide: function onHide() {
	          // Hide (Outer) Form Modal Dimmer
	          $('#contactFormModal').dimmer('hide');
	          // Hide (Outer) Form Modal
	          $('#contactFormModal').modal('hide');
	          // Re-enable submit button
	          document.getElementById('submitContactFormBtn').classList.remove('disabled');
	        }
	      });
	    }
	  }]);

	  return ContactInnerModalSuccess;
	}(_react2.default.Component);

	ContactInnerModalSuccess.propTypes = propTypes;

	exports.default = ContactInnerModalSuccess;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global grecaptcha */


	var propTypes = {
	  content: _react.PropTypes.string.isRequired
	};

	var ContactInnerModalMissing = function (_React$Component) {
	  _inherits(ContactInnerModalMissing, _React$Component);

	  function ContactInnerModalMissing() {
	    _classCallCheck(this, ContactInnerModalMissing);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContactInnerModalMissing).apply(this, arguments));
	  }

	  _createClass(ContactInnerModalMissing, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { id: "contactInnerModalMissing", className: "ui small modal contact innerModal" },
	        _react2.default.createElement(
	          "div",
	          { className: "ui center aligned header" },
	          _react2.default.createElement("i", { className: "orange meh icon" }),
	          "Information missing!"
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "content" },
	          this.props.content
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "actions" },
	          _react2.default.createElement(
	            "div",
	            { className: "ui approve button" },
	            "Continue"
	          )
	        )
	      );
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      // Modal initialiaztion
	      $('.innerModal').modal({
	        allowMultiple: true,
	        closable: false,
	        onShow: function onShow() {
	          // Show (Outer) Form Modal dimmer
	          $('#contactFormModal').dimmer('show');
	        },
	        onHide: function onHide() {
	          // Reset reCAPTCHA
	          grecaptcha.reset();

	          document.getElementById('submitContactFormBtn').classList.remove('disabled');
	          // Hide (Outer) Form Modal dimmer so that user can resubmit form or Cancel!
	          $('#contactFormModal').dimmer('hide');
	        }
	      });
	    }
	  }]);

	  return ContactInnerModalMissing;
	}(_react2.default.Component);

	ContactInnerModalMissing.propTypes = propTypes;

	exports.default = ContactInnerModalMissing;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  content: _react.PropTypes.string.isRequired
	};

	var ContactInnerModalFailure = function (_React$Component) {
	  _inherits(ContactInnerModalFailure, _React$Component);

	  function ContactInnerModalFailure() {
	    _classCallCheck(this, ContactInnerModalFailure);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContactInnerModalFailure).apply(this, arguments));
	  }

	  _createClass(ContactInnerModalFailure, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { id: "contactInnerModalFailure", className: "ui small modal contact innerModal" },
	        _react2.default.createElement(
	          "div",
	          { className: "ui center aligned header" },
	          _react2.default.createElement("i", { className: "red frown icon" }),
	          "A bad...really bad error ocurred!"
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "content" },
	          this.props.content,
	          _react2.default.createElement(
	            "div",
	            { className: "ui form innerModalFailureForm" },
	            _react2.default.createElement(
	              "div",
	              { className: "field" },
	              _react2.default.createElement(
	                "label",
	                { htmlFor: "errorMyEmail" },
	                "My Email"
	              ),
	              _react2.default.createElement("input", {
	                id: "errorMyEmail",
	                type: "text",
	                name: "errorMyEmail",
	                placeholder: "My email here",
	                value: "Frederic.Rey.Pro@gmail.com",
	                readOnly: true })
	            ),
	            _react2.default.createElement(
	              "div",
	              { className: "field" },
	              _react2.default.createElement(
	                "label",
	                { htmlFor: "errorYourMessage" },
	                "Your message"
	              ),
	              _react2.default.createElement("textarea", {
	                id: "errorYourMessage",
	                type: "text",
	                name: "errorYourMessage",
	                rows: "3",
	                placeholder: "Your message here",
	                readOnly: true })
	            )
	          )
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "actions" },
	          _react2.default.createElement(
	            "div",
	            {
	              className: "ui approve red button" },
	            "Return to Home Page"
	          )
	        )
	      );
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      $('.innerModal').modal({
	        allowMultiple: true,
	        closable: false,
	        onShow: function onShow() {
	          // Show (Outer) Form Modal dimmer
	          $('#contactFormModal').dimmer('show');
	          // Copy values into respective inputs
	          var yourMessage = document.getElementById('message').value;
	          document.getElementById('errorYourMessage').value = yourMessage;
	        },
	        onHide: function onHide() {
	          // Hide (Outer) Form Modal Dimmer
	          $('#contactFormModal').dimmer('hide');
	          // Hide (Outer) Form Modal
	          $('#contactFormModal').modal('hide');
	          // Re-enable submit button
	          document.getElementById('submitContactFormBtn').classList.remove('disabled');
	        }
	      });
	    }
	  }]);

	  return ContactInnerModalFailure;
	}(_react2.default.Component);

	ContactInnerModalFailure.propTypes = propTypes;

	exports.default = ContactInnerModalFailure;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _FooterLinks = __webpack_require__(29);

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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

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
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// TODO:60 Re-Add AboutMe data in footerLinks state
	exports.default = {
	  superpowers: [{
	    name: 'HTML/CSS',
	    provider: 'devicons',
	    icon: 'html5',
	    strength: 4,
	    comment: 'HTML is ok and I can manage CSS. Though, I often go on ' + '<a title="Mozilla Developer Network" href="https://developer.mozilla.org/en-US/" ' + 'target="_blank">MDN</a>' + ' when I need to learn about something that will help me solve a problem (...same with JS)'
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
	    comment: 'Started working with React last year and now can\'t see myself working without it!'
	  }, {
	    name: 'Meteor',
	    provider: 'devicons',
	    icon: 'meteor',
	    strength: 4,
	    comment: 'Have been using it for a little less than a year! ' + 'Please check my cosyquiz project on Bitbucket!'
	  }, {
	    name: 'MongoDB',
	    provider: 'devicons',
	    icon: 'mongodb',
	    strength: 3,
	    comment: 'Used a lot with Meteor and NodeJS/Express apps.'
	  }, {
	    name: 'Webpack',
	    provider: 'svg',
	    icon: 'webpack',
	    strength: 3,
	    comment: 'Its use is quite new to me but I know the most common config properties.\n        <br />It has always been used with Babel so far.'
	  }],
	  gitProfiles: [{
	    name: 'GitHub',
	    url: 'https://github.com/DdZ-Fred',
	    // Semantic UI: OR 'github alternate' OR 'github square'
	    icon: 'github'
	  }, {
	    name: 'BitBucket',
	    url: 'https://bitbucket.org/DdZ-Fred',
	    // Semantic UI: OR 'bitbucket square'
	    icon: 'bitbucket'
	  }],
	  contact: {
	    formModalOpened: false,
	    innerModalType: 'success',
	    innerModalContent: 'Your message has been sent! ' + 'I will answer as soon as I can!'
	  },
	  footerLinks: [
	  // {
	  //   title: 'AboutMe',
	  //   anchor: 'aboutMe',
	  //   icon: '',
	  // },
	  {
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
/* 31 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ }
/******/ ]);