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

	var express = __webpack_require__(120);
	var path = __webpack_require__(121);

	var app = express();
	var Compiler = __webpack_require__(122);
	var Lessons = __webpack_require__(124);

	var bodyParser = __webpack_require__(126);

	var router = express.Router();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	// serve our static stuff like index.css
	app.use(express.static(path.join(__dirname, 'public')));

	// app.get('/about', function (req, res) {
	//   console.log("about get?")
	//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
	// })

	// send all requests to index.html so browserHistory in React Router works

	app.post('/CodingPage', function (req, res, next) {
	  // INIT req.body variables
	  req.body.path = "";
	  req.body.outputResult = "";
	  req.body.outputConsole = "";
	  req.body.feedback = "";
	  req.body.instructions = "";
	  req.body.userPassed = "";
	  req.body.testPassed = "";
	  next();
	  // middlewares
	}, Lessons.loadLessonsJSON, Compiler.testCode, Lessons.getLesson, function (req, res, next) {

	  // ran through compiler, check if user passed
	  var userPassed = req.body.testPassed;
	  if (userPassed) {
	    // user passed, provide nextLesson
	    path = req.body.path;
	  } else {
	    // user did not pass, provide same lesson
	    path = req.url;
	  }
	  var results = req.body.outputResult;
	  var consoles = req.body.outputConsole;
	  var feedback = req.body.feedback;
	  var instructions = req.body.instructions;

	  var compiledResults = { results: results, consoles: consoles, feedback: feedback, path: path, instructions: instructions, userPassed: userPassed };
	  console.log("=====================");
	  console.log("compiledResults: ");
	  console.log(compiledResults);
	  console.log("=====================");

	  res.send(compiledResults);
	});

	app.get('*', function (req, res) {

	  console.log("backend");
	  // match the routes to the url
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    // `RouterContext` is what the `Router` renders. `Router` keeps these
	    // `props` in its state as it listens to `browserHistory`. But on the
	    // server our app is stateless, so we need to use `match` to
	    // // get these props before rendering.
	    // const appHtml = renderToString(<RouterContext {...props}/>)
	    //
	    // // dump the HTML into a template, lots of ways to do this, but none are
	    // // really influenced by React Router, so we're just using a little
	    // // function, `renderPage`
	    // res.send(renderPage(appHtml))
	    console.log(req.url);
	    if (err) {
	      // there was an error somewhere during route matching
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      // we haven't talked about `onEnter` hooks on routes, but before a
	      // route is entered, it can redirect. Here we handle on the server.
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      // if we got props then we matched a route and can render
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	      res.send(renderPage(appHtml));
	    } else {
	      // no errors, no redirect, we just didn't match anything
	      res.status(404).send('Not Found');
	    }
	  });
	});

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>My First React Router App</title>\n    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n    <script src="/lib/codemirror.js"></script>\n    <script src="/mode/javascript.js"></script>\n   ';
	}

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
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

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _App = __webpack_require__(5);

	var _App2 = _interopRequireDefault(_App);

	var _Repos = __webpack_require__(113);

	var _Repos2 = _interopRequireDefault(_Repos);

	var _Repo = __webpack_require__(114);

	var _Repo2 = _interopRequireDefault(_Repo);

	var _Home = __webpack_require__(115);

	var _Home2 = _interopRequireDefault(_Home);

	var _CodingPage = __webpack_require__(116);

	var _CodingPage2 = _interopRequireDefault(_CodingPage);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  '// Give App route children',
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/codingPage/:lesson', component: _CodingPage2.default }),
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/repos', component: _Repos2.default },
	    _react2.default.createElement(_reactRouter.Route, { path: '/repos/:userName/:repoName', component: _Repo2.default })
	  )
	);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(6);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	var _Nav = __webpack_require__(7);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _NavItem = __webpack_require__(107);

	var _NavItem2 = _interopRequireDefault(_NavItem);

	var _Grid = __webpack_require__(110);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _Row = __webpack_require__(111);

	var _Row2 = _interopRequireDefault(_Row);

	var _Col = __webpack_require__(112);

	var _Col2 = _interopRequireDefault(_Col);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { className: 'header-div' },
	        _react2.default.createElement(
	          _Nav2.default,
	          { bsStyle: 'pills', role: 'nav' },
	          _react2.default.createElement(
	            _Grid2.default,
	            null,
	            _react2.default.createElement(
	              _Row2.default,
	              null,
	              _react2.default.createElement(
	                _Col2.default,
	                { md: 12 },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'nav-selection-container' },
	                  _react2.default.createElement(
	                    _NavItem2.default,
	                    null,
	                    _react2.default.createElement(
	                      _NavLink2.default,
	                      { to: '/CodingPage/start' },
	                      _react2.default.createElement(
	                        'h1',
	                        { className: 'custom-h2' },
	                        'start'
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      ),
	      this.props.children /*|| <Home/>*/
	    );
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'NavLink',
	  render: function render() {
	    return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends3 = __webpack_require__(8);

	var _extends4 = _interopRequireDefault(_extends3);

	var _objectWithoutProperties2 = __webpack_require__(46);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _classCallCheck2 = __webpack_require__(47);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(48);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(84);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _classnames = __webpack_require__(92);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _keycode = __webpack_require__(93);

	var _keycode2 = _interopRequireDefault(_keycode);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(94);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _all = __webpack_require__(95);

	var _all2 = _interopRequireDefault(_all);

	var _warning = __webpack_require__(97);

	var _warning2 = _interopRequireDefault(_warning);

	var _bootstrapUtils = __webpack_require__(98);

	var _createChainedFunction = __webpack_require__(105);

	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

	var _ValidComponentChildren = __webpack_require__(106);

	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// TODO: Should we expose `<NavItem>` as `<Nav.Item>`?

	// TODO: This `bsStyle` is very unlike the others. Should we rename it?

	// TODO: `pullRight` and `pullLeft` don't render right outside of `navbar`.
	// Consider renaming or replacing them.

	var propTypes = {
	  /**
	   * Marks the NavItem with a matching `eventKey` as active. Has a
	   * higher precedence over `activeHref`.
	   */
	  activeKey: _react2['default'].PropTypes.any,

	  /**
	   * Marks the child NavItem with a matching `href` prop as active.
	   */
	  activeHref: _react2['default'].PropTypes.string,

	  /**
	   * NavItems are be positioned vertically.
	   */
	  stacked: _react2['default'].PropTypes.bool,

	  justified: (0, _all2['default'])(_react2['default'].PropTypes.bool, function (_ref) {
	    var justified = _ref.justified,
	        navbar = _ref.navbar;
	    return justified && navbar ? Error('justified navbar `Nav`s are not supported') : null;
	  }),

	  /**
	   * A callback fired when a NavItem is selected.
	   *
	   * ```js
	   * function (
	   * 	Any eventKey,
	   * 	SyntheticEvent event?
	   * )
	   * ```
	   */
	  onSelect: _react2['default'].PropTypes.func,

	  /**
	   * ARIA role for the Nav, in the context of a TabContainer, the default will
	   * be set to "tablist", but can be overridden by the Nav when set explicitly.
	   *
	   * When the role is set to "tablist" NavItem focus is managed according to
	   * the ARIA authoring practices for tabs:
	   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
	   */
	  role: _react2['default'].PropTypes.string,

	  /**
	   * Apply styling an alignment for use in a Navbar. This prop will be set
	   * automatically when the Nav is used inside a Navbar.
	   */
	  navbar: _react2['default'].PropTypes.bool,

	  /**
	   * Float the Nav to the right. When `navbar` is `true` the appropriate
	   * contextual classes are added as well.
	   */
	  pullRight: _react2['default'].PropTypes.bool,

	  /**
	   * Float the Nav to the left. When `navbar` is `true` the appropriate
	   * contextual classes are added as well.
	   */
	  pullLeft: _react2['default'].PropTypes.bool
	};

	var defaultProps = {
	  justified: false,
	  pullRight: false,
	  pullLeft: false,
	  stacked: false
	};

	var contextTypes = {
	  $bs_navbar: _react2['default'].PropTypes.shape({
	    bsClass: _react2['default'].PropTypes.string,
	    onSelect: _react2['default'].PropTypes.func
	  }),

	  $bs_tabContainer: _react2['default'].PropTypes.shape({
	    activeKey: _react2['default'].PropTypes.any,
	    onSelect: _react2['default'].PropTypes.func.isRequired,
	    getTabId: _react2['default'].PropTypes.func.isRequired,
	    getPaneId: _react2['default'].PropTypes.func.isRequired
	  })
	};

	var Nav = function (_React$Component) {
	  (0, _inherits3['default'])(Nav, _React$Component);

	  function Nav() {
	    (0, _classCallCheck3['default'])(this, Nav);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }

	  Nav.prototype.componentDidUpdate = function componentDidUpdate() {
	    var _this2 = this;

	    if (!this._needsRefocus) {
	      return;
	    }

	    this._needsRefocus = false;

	    var children = this.props.children;

	    var _getActiveProps = this.getActiveProps(),
	        activeKey = _getActiveProps.activeKey,
	        activeHref = _getActiveProps.activeHref;

	    var activeChild = _ValidComponentChildren2['default'].find(children, function (child) {
	      return _this2.isActive(child, activeKey, activeHref);
	    });

	    var childrenArray = _ValidComponentChildren2['default'].toArray(children);
	    var activeChildIndex = childrenArray.indexOf(activeChild);

	    var childNodes = _reactDom2['default'].findDOMNode(this).children;
	    var activeNode = childNodes && childNodes[activeChildIndex];

	    if (!activeNode || !activeNode.firstChild) {
	      return;
	    }

	    activeNode.firstChild.focus();
	  };

	  Nav.prototype.handleTabKeyDown = function handleTabKeyDown(onSelect, event) {
	    var nextActiveChild = void 0;

	    switch (event.keyCode) {
	      case _keycode2['default'].codes.left:
	      case _keycode2['default'].codes.up:
	        nextActiveChild = this.getNextActiveChild(-1);
	        break;
	      case _keycode2['default'].codes.right:
	      case _keycode2['default'].codes.down:
	        nextActiveChild = this.getNextActiveChild(1);
	        break;
	      default:
	        // It was a different key; don't handle this keypress.
	        return;
	    }

	    event.preventDefault();

	    if (onSelect && nextActiveChild && nextActiveChild.props.eventKey) {
	      onSelect(nextActiveChild.props.eventKey);
	    }

	    this._needsRefocus = true;
	  };

	  Nav.prototype.getNextActiveChild = function getNextActiveChild(offset) {
	    var _this3 = this;

	    var children = this.props.children;

	    var validChildren = children.filter(function (child) {
	      return child.props.eventKey && !child.props.disabled;
	    });

	    var _getActiveProps2 = this.getActiveProps(),
	        activeKey = _getActiveProps2.activeKey,
	        activeHref = _getActiveProps2.activeHref;

	    var activeChild = _ValidComponentChildren2['default'].find(children, function (child) {
	      return _this3.isActive(child, activeKey, activeHref);
	    });

	    // This assumes the active child is not disabled.
	    var activeChildIndex = validChildren.indexOf(activeChild);
	    if (activeChildIndex === -1) {
	      // Something has gone wrong. Select the first valid child we can find.
	      return validChildren[0];
	    }

	    var nextIndex = activeChildIndex + offset;
	    var numValidChildren = validChildren.length;

	    if (nextIndex >= numValidChildren) {
	      nextIndex = 0;
	    } else if (nextIndex < 0) {
	      nextIndex = numValidChildren - 1;
	    }

	    return validChildren[nextIndex];
	  };

	  Nav.prototype.getActiveProps = function getActiveProps() {
	    var tabContainer = this.context.$bs_tabContainer;

	    if (tabContainer) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(this.props.activeKey == null && !this.props.activeHref, 'Specifying a `<Nav>` `activeKey` or `activeHref` in the context of ' + 'a `<TabContainer>` is not supported. Instead use `<TabContainer ' + ('activeKey={' + this.props.activeKey + '} />`.')) : void 0;

	      return tabContainer;
	    }

	    return this.props;
	  };

	  Nav.prototype.isActive = function isActive(_ref2, activeKey, activeHref) {
	    var props = _ref2.props;

	    if (props.active || activeKey != null && props.eventKey === activeKey || activeHref && props.href === activeHref) {
	      return true;
	    }

	    return props.active;
	  };

	  Nav.prototype.getTabProps = function getTabProps(child, tabContainer, navRole, active, onSelect) {
	    var _this4 = this;

	    if (!tabContainer && navRole !== 'tablist') {
	      // No tab props here.
	      return null;
	    }

	    var _child$props = child.props,
	        id = _child$props.id,
	        controls = _child$props['aria-controls'],
	        eventKey = _child$props.eventKey,
	        role = _child$props.role,
	        onKeyDown = _child$props.onKeyDown,
	        tabIndex = _child$props.tabIndex;


	    if (tabContainer) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(!id && !controls, 'In the context of a `<TabContainer>`, `<NavItem>`s are given ' + 'generated `id` and `aria-controls` attributes for the sake of ' + 'proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly, provide a `generateChildId` ' + 'prop to the parent `<TabContainer>`.') : void 0;

	      id = tabContainer.getTabId(eventKey);
	      controls = tabContainer.getPaneId(eventKey);
	    }

	    if (navRole === 'tablist') {
	      role = role || 'tab';
	      onKeyDown = (0, _createChainedFunction2['default'])(function (event) {
	        return _this4.handleTabKeyDown(onSelect, event);
	      }, onKeyDown);
	      tabIndex = active ? tabIndex : -1;
	    }

	    return {
	      id: id,
	      role: role,
	      onKeyDown: onKeyDown,
	      'aria-controls': controls,
	      tabIndex: tabIndex
	    };
	  };

	  Nav.prototype.render = function render() {
	    var _extends2,
	        _this5 = this;

	    var _props = this.props,
	        stacked = _props.stacked,
	        justified = _props.justified,
	        onSelect = _props.onSelect,
	        propsRole = _props.role,
	        propsNavbar = _props.navbar,
	        pullRight = _props.pullRight,
	        pullLeft = _props.pullLeft,
	        className = _props.className,
	        children = _props.children,
	        props = (0, _objectWithoutProperties3['default'])(_props, ['stacked', 'justified', 'onSelect', 'role', 'navbar', 'pullRight', 'pullLeft', 'className', 'children']);


	    var tabContainer = this.context.$bs_tabContainer;
	    var role = propsRole || (tabContainer ? 'tablist' : null);

	    var _getActiveProps3 = this.getActiveProps(),
	        activeKey = _getActiveProps3.activeKey,
	        activeHref = _getActiveProps3.activeHref;

	    delete props.activeKey; // Accessed via this.getActiveProps().
	    delete props.activeHref; // Accessed via this.getActiveProps().

	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];

	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'stacked')] = stacked, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'justified')] = justified, _extends2));

	    var navbar = propsNavbar != null ? propsNavbar : this.context.$bs_navbar;
	    var pullLeftClassName = void 0;
	    var pullRightClassName = void 0;

	    if (navbar) {
	      var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

	      classes[(0, _bootstrapUtils.prefix)(navbarProps, 'nav')] = true;

	      pullRightClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'right');
	      pullLeftClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'left');
	    } else {
	      pullRightClassName = 'pull-right';
	      pullLeftClassName = 'pull-left';
	    }

	    classes[pullRightClassName] = pullRight;
	    classes[pullLeftClassName] = pullLeft;

	    return _react2['default'].createElement(
	      'ul',
	      (0, _extends4['default'])({}, elementProps, {
	        role: role,
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      _ValidComponentChildren2['default'].map(children, function (child) {
	        var active = _this5.isActive(child, activeKey, activeHref);
	        var childOnSelect = (0, _createChainedFunction2['default'])(child.props.onSelect, onSelect, navbar && navbar.onSelect, tabContainer && tabContainer.onSelect);

	        return (0, _react.cloneElement)(child, (0, _extends4['default'])({}, _this5.getTabProps(child, tabContainer, role, active, childOnSelect), {
	          active: active,
	          activeKey: activeKey,
	          activeHref: activeHref,
	          onSelect: childOnSelect
	        }));
	      })
	    );
	  };

	  return Nav;
	}(_react2['default'].Component);

	Nav.propTypes = propTypes;
	Nav.defaultProps = defaultProps;
	Nav.contextTypes = contextTypes;

	exports['default'] = (0, _bootstrapUtils.bsClass)('nav', (0, _bootstrapUtils.bsStyles)(['tabs', 'pills'], Nav));
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(9);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);
	module.exports = __webpack_require__(14).Object.assign;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(12);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(27)});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(13)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(15)
	  , hide      = __webpack_require__(17)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 13 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(18)
	  , createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(22) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(19)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , toPrimitive    = __webpack_require__(25)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(22) && !__webpack_require__(23)(function(){
	  return Object.defineProperty(__webpack_require__(24)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(23)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20)
	  , document = __webpack_require__(13).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(20);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(28)
	  , gOPS     = __webpack_require__(43)
	  , pIE      = __webpack_require__(44)
	  , toObject = __webpack_require__(45)
	  , IObject  = __webpack_require__(32)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(23)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(29)
	  , enumBugKeys = __webpack_require__(42);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(30)
	  , toIObject    = __webpack_require__(31)
	  , arrayIndexOf = __webpack_require__(35)(false)
	  , IE_PROTO     = __webpack_require__(39)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(32)
	  , defined = __webpack_require__(34);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(33);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(31)
	  , toLength  = __webpack_require__(36)
	  , toIndex   = __webpack_require__(38);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(37)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(40)('keys')
	  , uid    = __webpack_require__(41);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(13)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 43 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 44 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(34);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(49);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(50);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(70);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	__webpack_require__(65);
	module.exports = __webpack_require__(69).f('iterator');

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(53)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(54)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , defined   = __webpack_require__(34);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(55)
	  , $export        = __webpack_require__(12)
	  , redefine       = __webpack_require__(56)
	  , hide           = __webpack_require__(17)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(57)
	  , $iterCreate    = __webpack_require__(58)
	  , setToStringTag = __webpack_require__(62)
	  , getPrototypeOf = __webpack_require__(64)
	  , ITERATOR       = __webpack_require__(63)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(59)
	  , descriptor     = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(62)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(17)(IteratorPrototype, __webpack_require__(63)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(19)
	  , dPs         = __webpack_require__(60)
	  , enumBugKeys = __webpack_require__(42)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(24)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(61).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(18)
	  , anObject = __webpack_require__(19)
	  , getKeys  = __webpack_require__(28);

	module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13).document && document.documentElement;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).f
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(63)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(40)('wks')
	  , uid        = __webpack_require__(41)
	  , Symbol     = __webpack_require__(13).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(30)
	  , toObject    = __webpack_require__(45)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	var global        = __webpack_require__(13)
	  , hide          = __webpack_require__(17)
	  , Iterators     = __webpack_require__(57)
	  , TO_STRING_TAG = __webpack_require__(63)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(67)
	  , step             = __webpack_require__(68)
	  , Iterators        = __webpack_require__(57)
	  , toIObject        = __webpack_require__(31);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(54)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(63);

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(72);
	__webpack_require__(81);
	__webpack_require__(82);
	__webpack_require__(83);
	module.exports = __webpack_require__(14).Symbol;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(13)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(22)
	  , $export        = __webpack_require__(12)
	  , redefine       = __webpack_require__(56)
	  , META           = __webpack_require__(73).KEY
	  , $fails         = __webpack_require__(23)
	  , shared         = __webpack_require__(40)
	  , setToStringTag = __webpack_require__(62)
	  , uid            = __webpack_require__(41)
	  , wks            = __webpack_require__(63)
	  , wksExt         = __webpack_require__(69)
	  , wksDefine      = __webpack_require__(74)
	  , keyOf          = __webpack_require__(75)
	  , enumKeys       = __webpack_require__(76)
	  , isArray        = __webpack_require__(77)
	  , anObject       = __webpack_require__(19)
	  , toIObject      = __webpack_require__(31)
	  , toPrimitive    = __webpack_require__(25)
	  , createDesc     = __webpack_require__(26)
	  , _create        = __webpack_require__(59)
	  , gOPNExt        = __webpack_require__(78)
	  , $GOPD          = __webpack_require__(80)
	  , $DP            = __webpack_require__(18)
	  , $keys          = __webpack_require__(28)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(79).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(44).f  = $propertyIsEnumerable;
	  __webpack_require__(43).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(55)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(41)('meta')
	  , isObject = __webpack_require__(20)
	  , has      = __webpack_require__(30)
	  , setDesc  = __webpack_require__(18).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(23)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(13)
	  , core           = __webpack_require__(14)
	  , LIBRARY        = __webpack_require__(55)
	  , wksExt         = __webpack_require__(69)
	  , defineProperty = __webpack_require__(18).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(28)
	  , toIObject = __webpack_require__(31);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(28)
	  , gOPS    = __webpack_require__(43)
	  , pIE     = __webpack_require__(44);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(33);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(31)
	  , gOPN      = __webpack_require__(79).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(29)
	  , hiddenKeys = __webpack_require__(42).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(44)
	  , createDesc     = __webpack_require__(26)
	  , toIObject      = __webpack_require__(31)
	  , toPrimitive    = __webpack_require__(25)
	  , has            = __webpack_require__(30)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(22) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74)('asyncIterator');

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74)('observable');

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(85);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(89);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(49);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	module.exports = __webpack_require__(14).Object.setPrototypeOf;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(12);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(88).set});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(20)
	  , anObject = __webpack_require__(19);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(15)(Function.call, __webpack_require__(80).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	var $Object = __webpack_require__(14).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(59)});

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = require("keycode");

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = all;

	var _createChainableTypeChecker = __webpack_require__(96);

	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function all() {
	  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
	    validators[_key] = arguments[_key];
	  }

	  function allPropTypes() {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    var error = null;

	    validators.forEach(function (validator) {
	      if (error != null) {
	        return;
	      }

	      var result = validator.apply(undefined, args);
	      if (result != null) {
	        error = result;
	      }
	    });

	    return error;
	  }

	  return (0, _createChainableTypeChecker2.default)(allPropTypes);
	}

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = createChainableTypeChecker;
	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	// Mostly taken from ReactPropTypes.

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    var componentNameSafe = componentName || '<<anonymous>>';
	    var propFullNameSafe = propFullName || propName;

	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
	      }

	      return null;
	    }

	    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
	      args[_key - 6] = arguments[_key];
	    }

	    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

/***/ },
/* 97 */
/***/ function(module, exports) {

	module.exports = require("warning");

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports._curry = exports.bsSizes = exports.bsStyles = exports.bsClass = undefined;

	var _entries = __webpack_require__(99);

	var _entries2 = _interopRequireDefault(_entries);

	var _extends2 = __webpack_require__(8);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.prefix = prefix;
	exports.getClassSet = getClassSet;
	exports.splitBsProps = splitBsProps;
	exports.splitBsPropsAndOmit = splitBsPropsAndOmit;
	exports.addStyle = addStyle;

	var _invariant = __webpack_require__(103);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _StyleConfig = __webpack_require__(104);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function curry(fn) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var last = args[args.length - 1];
	    if (typeof last === 'function') {
	      return fn.apply(undefined, args);
	    }
	    return function (Component) {
	      return fn.apply(undefined, args.concat([Component]));
	    };
	  };
	} // TODO: The publicly exposed parts of this should be in lib/BootstrapUtils.

	function prefix(props, variant) {
	  !(props.bsClass != null) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2['default'])(false, 'A `bsClass` prop is required for this component') : (0, _invariant2['default'])(false) : void 0;
	  return props.bsClass + (variant ? '-' + variant : '');
	}

	var bsClass = exports.bsClass = curry(function (defaultClass, Component) {
	  var propTypes = Component.propTypes || (Component.propTypes = {});
	  var defaultProps = Component.defaultProps || (Component.defaultProps = {});

	  propTypes.bsClass = _react.PropTypes.string;
	  defaultProps.bsClass = defaultClass;

	  return Component;
	});

	var bsStyles = exports.bsStyles = curry(function (styles, defaultStyle, Component) {
	  if (typeof defaultStyle !== 'string') {
	    Component = defaultStyle;
	    defaultStyle = undefined;
	  }

	  var existing = Component.STYLES || [];
	  var propTypes = Component.propTypes || {};

	  styles.forEach(function (style) {
	    if (existing.indexOf(style) === -1) {
	      existing.push(style);
	    }
	  });

	  var propType = _react.PropTypes.oneOf(existing);

	  // expose the values on the propType function for documentation
	  Component.STYLES = propType._values = existing;

	  Component.propTypes = (0, _extends3['default'])({}, propTypes, {
	    bsStyle: propType
	  });

	  if (defaultStyle !== undefined) {
	    var defaultProps = Component.defaultProps || (Component.defaultProps = {});
	    defaultProps.bsStyle = defaultStyle;
	  }

	  return Component;
	});

	var bsSizes = exports.bsSizes = curry(function (sizes, defaultSize, Component) {
	  if (typeof defaultSize !== 'string') {
	    Component = defaultSize;
	    defaultSize = undefined;
	  }

	  var existing = Component.SIZES || [];
	  var propTypes = Component.propTypes || {};

	  sizes.forEach(function (size) {
	    if (existing.indexOf(size) === -1) {
	      existing.push(size);
	    }
	  });

	  var values = [];
	  existing.forEach(function (size) {
	    var mappedSize = _StyleConfig.SIZE_MAP[size];
	    if (mappedSize && mappedSize !== size) {
	      values.push(mappedSize);
	    }

	    values.push(size);
	  });

	  var propType = _react.PropTypes.oneOf(values);
	  propType._values = values;

	  // expose the values on the propType function for documentation
	  Component.SIZES = existing;

	  Component.propTypes = (0, _extends3['default'])({}, propTypes, {
	    bsSize: propType
	  });

	  if (defaultSize !== undefined) {
	    if (!Component.defaultProps) {
	      Component.defaultProps = {};
	    }
	    Component.defaultProps.bsSize = defaultSize;
	  }

	  return Component;
	});

	function getClassSet(props) {
	  var _classes;

	  var classes = (_classes = {}, _classes[prefix(props)] = true, _classes);

	  if (props.bsSize) {
	    var bsSize = _StyleConfig.SIZE_MAP[props.bsSize] || props.bsSize;
	    classes[prefix(props, bsSize)] = true;
	  }

	  if (props.bsStyle) {
	    classes[prefix(props, props.bsStyle)] = true;
	  }

	  return classes;
	}

	function getBsProps(props) {
	  return {
	    bsClass: props.bsClass,
	    bsSize: props.bsSize,
	    bsStyle: props.bsStyle,
	    bsRole: props.bsRole
	  };
	}

	function isBsProp(propName) {
	  return propName === 'bsClass' || propName === 'bsSize' || propName === 'bsStyle' || propName === 'bsRole';
	}

	function splitBsProps(props) {
	  var elementProps = {};
	  (0, _entries2['default'])(props).forEach(function (_ref) {
	    var propName = _ref[0],
	        propValue = _ref[1];

	    if (!isBsProp(propName)) {
	      elementProps[propName] = propValue;
	    }
	  });

	  return [getBsProps(props), elementProps];
	}

	function splitBsPropsAndOmit(props, omittedPropNames) {
	  var isOmittedProp = {};
	  omittedPropNames.forEach(function (propName) {
	    isOmittedProp[propName] = true;
	  });

	  var elementProps = {};
	  (0, _entries2['default'])(props).forEach(function (_ref2) {
	    var propName = _ref2[0],
	        propValue = _ref2[1];

	    if (!isBsProp(propName) && !isOmittedProp[propName]) {
	      elementProps[propName] = propValue;
	    }
	  });

	  return [getBsProps(props), elementProps];
	}

	/**
	 * Add a style variant to a Component. Mutates the propTypes of the component
	 * in order to validate the new variant.
	 */
	function addStyle(Component) {
	  for (var _len2 = arguments.length, styleVariant = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    styleVariant[_key2 - 1] = arguments[_key2];
	  }

	  bsStyles(styleVariant, Component);
	}

	var _curry = exports._curry = curry;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(101);
	module.exports = __webpack_require__(14).Object.entries;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(12)
	  , $entries = __webpack_require__(102)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(28)
	  , toIObject = __webpack_require__(31)
	  , isEnum    = __webpack_require__(44).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = require("invariant");

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var Size = exports.Size = {
	  LARGE: 'large',
	  SMALL: 'small',
	  XSMALL: 'xsmall'
	};

	var SIZE_MAP = exports.SIZE_MAP = {
	  large: 'lg',
	  medium: 'md',
	  small: 'sm',
	  xsmall: 'xs',
	  lg: 'lg',
	  md: 'md',
	  sm: 'sm',
	  xs: 'xs'
	};

	var DEVICE_SIZES = exports.DEVICE_SIZES = ['lg', 'md', 'sm', 'xs'];

	var State = exports.State = {
	  SUCCESS: 'success',
	  WARNING: 'warning',
	  DANGER: 'danger',
	  INFO: 'info'
	};

	var Style = exports.Style = {
	  DEFAULT: 'default',
	  PRIMARY: 'primary',
	  LINK: 'link',
	  INVERSE: 'inverse'
	};

/***/ },
/* 105 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} functions to chain
	 * @returns {function|null}
	 */
	function createChainedFunction() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return funcs.filter(function (f) {
	    return f != null;
	  }).reduce(function (acc, f) {
	    if (typeof f !== 'function') {
	      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
	    }

	    if (acc === null) {
	      return f;
	    }

	    return function chainedFunction() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      acc.apply(this, args);
	      f.apply(this, args);
	    };
	  }, null);
	}

	exports['default'] = createChainedFunction;
	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Iterates through children that are typically specified as `props.children`,
	 * but only maps over children that are "valid components".
	 *
	 * The mapFunction provided index will be normalised to the components mapped,
	 * so an invalid component would not increase the index.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func.
	 * @param {*} context Context for func.
	 * @return {object} Object containing the ordered map of results.
	 */
	function map(children, func, context) {
	  var index = 0;

	  return _react2['default'].Children.map(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return child;
	    }

	    return func.call(context, child, index++);
	  });
	}

	/**
	 * Iterates through children that are "valid components".
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child with the index reflecting the position relative to "valid components".
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func.
	 * @param {*} context Context for context.
	 */
	// TODO: This module should be ElementChildren, and should use named exports.

	function forEach(children, func, context) {
	  var index = 0;

	  _react2['default'].Children.forEach(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }

	    func.call(context, child, index++);
	  });
	}

	/**
	 * Count the number of "valid components" in the Children container.
	 *
	 * @param {?*} children Children tree container.
	 * @returns {number}
	 */
	function count(children) {
	  var result = 0;

	  _react2['default'].Children.forEach(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }

	    ++result;
	  });

	  return result;
	}

	/**
	 * Finds children that are typically specified as `props.children`,
	 * but only iterates over children that are "valid components".
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child with the index reflecting the position relative to "valid components".
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func.
	 * @param {*} context Context for func.
	 * @returns {array} of children that meet the func return statement
	 */
	function filter(children, func, context) {
	  var index = 0;
	  var result = [];

	  _react2['default'].Children.forEach(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }

	    if (func.call(context, child, index++)) {
	      result.push(child);
	    }
	  });

	  return result;
	}

	function find(children, func, context) {
	  var index = 0;
	  var result = undefined;

	  _react2['default'].Children.forEach(children, function (child) {
	    if (result) {
	      return;
	    }
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }

	    if (func.call(context, child, index++)) {
	      result = child;
	    }
	  });

	  return result;
	}

	function every(children, func, context) {
	  var index = 0;
	  var result = true;

	  _react2['default'].Children.forEach(children, function (child) {
	    if (!result) {
	      return;
	    }
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }

	    if (!func.call(context, child, index++)) {
	      result = false;
	    }
	  });

	  return result;
	}

	function some(children, func, context) {
	  var index = 0;
	  var result = false;

	  _react2['default'].Children.forEach(children, function (child) {
	    if (result) {
	      return;
	    }
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }

	    if (func.call(context, child, index++)) {
	      result = true;
	    }
	  });

	  return result;
	}

	function toArray(children) {
	  var result = [];

	  _react2['default'].Children.forEach(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }

	    result.push(child);
	  });

	  return result;
	}

	exports['default'] = {
	  map: map,
	  forEach: forEach,
	  count: count,
	  find: find,
	  filter: filter,
	  every: every,
	  some: some,
	  toArray: toArray
	};
	module.exports = exports['default'];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends2 = __webpack_require__(8);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(46);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _classCallCheck2 = __webpack_require__(47);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(48);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(84);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _classnames = __webpack_require__(92);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _SafeAnchor = __webpack_require__(108);

	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

	var _createChainedFunction = __webpack_require__(105);

	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var propTypes = {
	  active: _react2['default'].PropTypes.bool,
	  disabled: _react2['default'].PropTypes.bool,
	  role: _react2['default'].PropTypes.string,
	  href: _react2['default'].PropTypes.string,
	  onClick: _react2['default'].PropTypes.func,
	  onSelect: _react2['default'].PropTypes.func,
	  eventKey: _react2['default'].PropTypes.any
	};

	var defaultProps = {
	  active: false,
	  disabled: false
	};

	var NavItem = function (_React$Component) {
	  (0, _inherits3['default'])(NavItem, _React$Component);

	  function NavItem(props, context) {
	    (0, _classCallCheck3['default'])(this, NavItem);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

	    _this.handleClick = _this.handleClick.bind(_this);
	    return _this;
	  }

	  NavItem.prototype.handleClick = function handleClick(e) {
	    if (this.props.onSelect) {
	      e.preventDefault();

	      if (!this.props.disabled) {
	        this.props.onSelect(this.props.eventKey, e);
	      }
	    }
	  };

	  NavItem.prototype.render = function render() {
	    var _props = this.props,
	        active = _props.active,
	        disabled = _props.disabled,
	        onClick = _props.onClick,
	        className = _props.className,
	        style = _props.style,
	        props = (0, _objectWithoutProperties3['default'])(_props, ['active', 'disabled', 'onClick', 'className', 'style']);


	    delete props.onSelect;
	    delete props.eventKey;

	    // These are injected down by `<Nav>` for building `<SubNav>`s.
	    delete props.activeKey;
	    delete props.activeHref;

	    if (!props.role) {
	      if (props.href === '#') {
	        props.role = 'button';
	      }
	    } else if (props.role === 'tab') {
	      props['aria-selected'] = active;
	    }

	    return _react2['default'].createElement(
	      'li',
	      {
	        role: 'presentation',
	        className: (0, _classnames2['default'])(className, { active: active, disabled: disabled }),
	        style: style
	      },
	      _react2['default'].createElement(_SafeAnchor2['default'], (0, _extends3['default'])({}, props, {
	        disabled: disabled,
	        onClick: (0, _createChainedFunction2['default'])(onClick, this.handleClick)
	      }))
	    );
	  };

	  return NavItem;
	}(_react2['default'].Component);

	NavItem.propTypes = propTypes;
	NavItem.defaultProps = defaultProps;

	exports['default'] = NavItem;
	module.exports = exports['default'];

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends2 = __webpack_require__(8);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(46);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _classCallCheck2 = __webpack_require__(47);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(48);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(84);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _elementType = __webpack_require__(109);

	var _elementType2 = _interopRequireDefault(_elementType);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var propTypes = {
	  href: _react2['default'].PropTypes.string,
	  onClick: _react2['default'].PropTypes.func,
	  disabled: _react2['default'].PropTypes.bool,
	  role: _react2['default'].PropTypes.string,
	  tabIndex: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	  /**
	   * this is sort of silly but needed for Button
	   */
	  componentClass: _elementType2['default']
	};

	var defaultProps = {
	  componentClass: 'a'
	};

	function isTrivialHref(href) {
	  return !href || href.trim() === '#';
	}

	/**
	 * There are situations due to browser quirks or Bootstrap CSS where
	 * an anchor tag is needed, when semantically a button tag is the
	 * better choice. SafeAnchor ensures that when an anchor is used like a
	 * button its accessible. It also emulates input `disabled` behavior for
	 * links, which is usually desirable for Buttons, NavItems, MenuItems, etc.
	 */

	var SafeAnchor = function (_React$Component) {
	  (0, _inherits3['default'])(SafeAnchor, _React$Component);

	  function SafeAnchor(props, context) {
	    (0, _classCallCheck3['default'])(this, SafeAnchor);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

	    _this.handleClick = _this.handleClick.bind(_this);
	    return _this;
	  }

	  SafeAnchor.prototype.handleClick = function handleClick(event) {
	    var _props = this.props,
	        disabled = _props.disabled,
	        href = _props.href,
	        onClick = _props.onClick;


	    if (disabled || isTrivialHref(href)) {
	      event.preventDefault();
	    }

	    if (disabled) {
	      event.stopPropagation();
	      return;
	    }

	    if (onClick) {
	      onClick(event);
	    }
	  };

	  SafeAnchor.prototype.render = function render() {
	    var _props2 = this.props,
	        Component = _props2.componentClass,
	        disabled = _props2.disabled,
	        props = (0, _objectWithoutProperties3['default'])(_props2, ['componentClass', 'disabled']);


	    if (isTrivialHref(props.href)) {
	      props.role = props.role || 'button';
	      // we want to make sure there is a href attribute on the node
	      // otherwise, the cursor incorrectly styled (except with role='button')
	      props.href = props.href || '#';
	    }

	    if (disabled) {
	      props.tabIndex = -1;
	      props.style = (0, _extends3['default'])({ pointerEvents: 'none' }, props.style);
	    }

	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, props, {
	      onClick: this.handleClick
	    }));
	  };

	  return SafeAnchor;
	}(_react2['default'].Component);

	SafeAnchor.propTypes = propTypes;
	SafeAnchor.defaultProps = defaultProps;

	exports['default'] = SafeAnchor;
	module.exports = exports['default'];

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _createChainableTypeChecker = __webpack_require__(96);

	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function elementType(props, propName, componentName, location, propFullName) {
	  var propValue = props[propName];
	  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

	  if (_react2.default.isValidElement(propValue)) {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
	  }

	  if (propType !== 'function' && propType !== 'string') {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
	  }

	  return null;
	}

	exports.default = (0, _createChainableTypeChecker2.default)(elementType);

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends2 = __webpack_require__(8);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(46);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _classCallCheck2 = __webpack_require__(47);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(48);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(84);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _classnames = __webpack_require__(92);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _elementType = __webpack_require__(109);

	var _elementType2 = _interopRequireDefault(_elementType);

	var _bootstrapUtils = __webpack_require__(98);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var propTypes = {
	  /**
	   * Turn any fixed-width grid layout into a full-width layout by this property.
	   *
	   * Adds `container-fluid` class.
	   */
	  fluid: _react2['default'].PropTypes.bool,
	  /**
	   * You can use a custom element for this component
	   */
	  componentClass: _elementType2['default']
	};

	var defaultProps = {
	  componentClass: 'div',
	  fluid: false
	};

	var Grid = function (_React$Component) {
	  (0, _inherits3['default'])(Grid, _React$Component);

	  function Grid() {
	    (0, _classCallCheck3['default'])(this, Grid);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }

	  Grid.prototype.render = function render() {
	    var _props = this.props,
	        fluid = _props.fluid,
	        Component = _props.componentClass,
	        className = _props.className,
	        props = (0, _objectWithoutProperties3['default'])(_props, ['fluid', 'componentClass', 'className']);

	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];

	    var classes = (0, _bootstrapUtils.prefix)(bsProps, fluid && 'fluid');

	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };

	  return Grid;
	}(_react2['default'].Component);

	Grid.propTypes = propTypes;
	Grid.defaultProps = defaultProps;

	exports['default'] = (0, _bootstrapUtils.bsClass)('container', Grid);
	module.exports = exports['default'];

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends2 = __webpack_require__(8);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(46);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _classCallCheck2 = __webpack_require__(47);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(48);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(84);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _classnames = __webpack_require__(92);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _elementType = __webpack_require__(109);

	var _elementType2 = _interopRequireDefault(_elementType);

	var _bootstrapUtils = __webpack_require__(98);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var propTypes = {
	  componentClass: _elementType2['default']
	};

	var defaultProps = {
	  componentClass: 'div'
	};

	var Row = function (_React$Component) {
	  (0, _inherits3['default'])(Row, _React$Component);

	  function Row() {
	    (0, _classCallCheck3['default'])(this, Row);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }

	  Row.prototype.render = function render() {
	    var _props = this.props,
	        Component = _props.componentClass,
	        className = _props.className,
	        props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);

	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];

	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);

	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };

	  return Row;
	}(_react2['default'].Component);

	Row.propTypes = propTypes;
	Row.defaultProps = defaultProps;

	exports['default'] = (0, _bootstrapUtils.bsClass)('row', Row);
	module.exports = exports['default'];

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends2 = __webpack_require__(8);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(46);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _classCallCheck2 = __webpack_require__(47);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(48);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(84);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _classnames = __webpack_require__(92);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _elementType = __webpack_require__(109);

	var _elementType2 = _interopRequireDefault(_elementType);

	var _bootstrapUtils = __webpack_require__(98);

	var _StyleConfig = __webpack_require__(104);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var propTypes = {
	  componentClass: _elementType2['default'],

	  /**
	   * The number of columns you wish to span
	   *
	   * for Extra small devices Phones (<768px)
	   *
	   * class-prefix `col-xs-`
	   */
	  xs: _react2['default'].PropTypes.number,
	  /**
	   * The number of columns you wish to span
	   *
	   * for Small devices Tablets (≥768px)
	   *
	   * class-prefix `col-sm-`
	   */
	  sm: _react2['default'].PropTypes.number,
	  /**
	   * The number of columns you wish to span
	   *
	   * for Medium devices Desktops (≥992px)
	   *
	   * class-prefix `col-md-`
	   */
	  md: _react2['default'].PropTypes.number,
	  /**
	   * The number of columns you wish to span
	   *
	   * for Large devices Desktops (≥1200px)
	   *
	   * class-prefix `col-lg-`
	   */
	  lg: _react2['default'].PropTypes.number,
	  /**
	   * Hide column
	   *
	   * on Extra small devices Phones
	   *
	   * adds class `hidden-xs`
	   */
	  xsHidden: _react2['default'].PropTypes.bool,
	  /**
	   * Hide column
	   *
	   * on Small devices Tablets
	   *
	   * adds class `hidden-sm`
	   */
	  smHidden: _react2['default'].PropTypes.bool,
	  /**
	   * Hide column
	   *
	   * on Medium devices Desktops
	   *
	   * adds class `hidden-md`
	   */
	  mdHidden: _react2['default'].PropTypes.bool,
	  /**
	   * Hide column
	   *
	   * on Large devices Desktops
	   *
	   * adds class `hidden-lg`
	   */
	  lgHidden: _react2['default'].PropTypes.bool,
	  /**
	   * Move columns to the right
	   *
	   * for Extra small devices Phones
	   *
	   * class-prefix `col-xs-offset-`
	   */
	  xsOffset: _react2['default'].PropTypes.number,
	  /**
	   * Move columns to the right
	   *
	   * for Small devices Tablets
	   *
	   * class-prefix `col-sm-offset-`
	   */
	  smOffset: _react2['default'].PropTypes.number,
	  /**
	   * Move columns to the right
	   *
	   * for Medium devices Desktops
	   *
	   * class-prefix `col-md-offset-`
	   */
	  mdOffset: _react2['default'].PropTypes.number,
	  /**
	   * Move columns to the right
	   *
	   * for Large devices Desktops
	   *
	   * class-prefix `col-lg-offset-`
	   */
	  lgOffset: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the right
	   *
	   * for Extra small devices Phones
	   *
	   * class-prefix `col-xs-push-`
	   */
	  xsPush: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the right
	   *
	   * for Small devices Tablets
	   *
	   * class-prefix `col-sm-push-`
	   */
	  smPush: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the right
	   *
	   * for Medium devices Desktops
	   *
	   * class-prefix `col-md-push-`
	   */
	  mdPush: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the right
	   *
	   * for Large devices Desktops
	   *
	   * class-prefix `col-lg-push-`
	   */
	  lgPush: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the left
	   *
	   * for Extra small devices Phones
	   *
	   * class-prefix `col-xs-pull-`
	   */
	  xsPull: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the left
	   *
	   * for Small devices Tablets
	   *
	   * class-prefix `col-sm-pull-`
	   */
	  smPull: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the left
	   *
	   * for Medium devices Desktops
	   *
	   * class-prefix `col-md-pull-`
	   */
	  mdPull: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the left
	   *
	   * for Large devices Desktops
	   *
	   * class-prefix `col-lg-pull-`
	   */
	  lgPull: _react2['default'].PropTypes.number
	};

	var defaultProps = {
	  componentClass: 'div'
	};

	var Col = function (_React$Component) {
	  (0, _inherits3['default'])(Col, _React$Component);

	  function Col() {
	    (0, _classCallCheck3['default'])(this, Col);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }

	  Col.prototype.render = function render() {
	    var _props = this.props,
	        Component = _props.componentClass,
	        className = _props.className,
	        props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);

	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];

	    var classes = [];

	    _StyleConfig.DEVICE_SIZES.forEach(function (size) {
	      function popProp(propSuffix, modifier) {
	        var propName = '' + size + propSuffix;
	        var propValue = elementProps[propName];

	        if (propValue != null) {
	          classes.push((0, _bootstrapUtils.prefix)(bsProps, '' + size + modifier + '-' + propValue));
	        }

	        delete elementProps[propName];
	      }

	      popProp('', '');
	      popProp('Offset', '-offset');
	      popProp('Push', '-push');
	      popProp('Pull', '-pull');

	      var hiddenPropName = size + 'Hidden';
	      if (elementProps[hiddenPropName]) {
	        classes.push('hidden-' + size);
	      }
	      delete elementProps[hiddenPropName];
	    });

	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };

	  return Col;
	}(_react2['default'].Component);

	Col.propTypes = propTypes;
	Col.defaultProps = defaultProps;

	exports['default'] = (0, _bootstrapUtils.bsClass)('col', Col);
	module.exports = exports['default'];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(6);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Repos',


	  contextTypes: {
	    router: _react2.default.PropTypes.object
	  },

	  handleSubmit: function handleSubmit(e) {
	    e.preventDefault();
	    var userName = e.target.elements[0].value;
	    var repo = e.target.elements[1].value;
	    var path = '/repos/' + userName + '/' + repo;
	    console.log(path);
	    this.context.router.push(path);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h2',
	        null,
	        '\xC9g er h2 \xED Repos!'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/repos/abc/abc123' },
	            'RepoLinkur abc'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/repos/qwe/qwe123' },
	            'RepoLinkur qwe'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'form',
	            { onSubmit: this.handleSubmit },
	            _react2.default.createElement('input', { type: 'text', placeholder: 'userName PlaceHolder' }),
	            ' ',
	            ' ',
	            _react2.default.createElement('input', { type: 'text', placeholder: 'repo PlaceHolder' }),
	            ' ',
	            ' ',
	            _react2.default.createElement(
	              'button',
	              { type: 'submit' },
	              'Gogogo button that will submit'
	            )
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: "Repo",
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(
	        "h2",
	        null,
	        "repoName er ",
	        this.props.params.repoName + ". ",
	        "userName er ",
	        this.props.params.userName
	      )
	    );
	  }
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Home',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'gray-div' },
	      _react2.default.createElement(
	        'div',
	        { className: 'code-editor' },
	        _react2.default.createElement(
	          'h1',
	          { className: 'welcome-text' },
	          'Home...'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _CodeEditor = __webpack_require__(117);

	var _CodeEditor2 = _interopRequireDefault(_CodeEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'CodingPage',


	  contextTypes: {
	    router: _react2.default.PropTypes.object
	  },

	  handleUpdatePath: function handleUpdatePath(lesson) {
	    var nextLesson = lesson;
	    var path = '/CodingPage/' + nextLesson;
	    this.context.router.push(path);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_CodeEditor2.default, { onUpdatePath: this.handleUpdatePath, lessonInPath: this.props.params.lesson })
	    );
	  }
	});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(118);

	var _axios2 = _interopRequireDefault(_axios);

	var _DialogWindow = __webpack_require__(119);

	var _DialogWindow2 = _interopRequireDefault(_DialogWindow);

	var _Grid = __webpack_require__(110);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _Row = __webpack_require__(111);

	var _Row2 = _interopRequireDefault(_Row);

	var _Col = __webpack_require__(112);

	var _Col2 = _interopRequireDefault(_Col);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'CodeEditor',


	  // contextTypes: {
	  //   router: React.PropTypes.object
	  // },

	  getInitialState: function getInitialState() {
	    // this.setCodeEditor();
	    return this.state = {
	      isResultsReturned: false,
	      results: "Hér munu keyrsluniðurstöður úr forritinu koma óbreyttar. Þar á meðal villumeldingar ef einhvað er vitlaust gert.",
	      feedback: "Vekomin/n. Til hamingju með að taka þín fyrstu skref í forritun. \r\n Til eru nokkrar týpur af breytum sem er gott að hafa í huga. Til eru heiltölur (int), fleytitölur (double), strengir (string), sanngildi (boolean) og fleira. \r\n Einnig eru til nokkrar týpur af virkjum, einfaldir virkjar sem við þekkjum vel eins og plús +, mínus -, margfölun *, og deiling /, og fleiri virkjar sem við munum sjá síðar.",
	      path: "start",
	      instructions: " Prófaðu að beita einhverjum virkja (+ - * /) á tvær tölur (heiltölur eða fleytitölur), til dæmis 1+5.",
	      codeMirror: {}
	    };
	  },
	  setCodeEditor: function setCodeEditor() {
	    var myCodeMirror = CodeMirror.fromTextArea(this.refs.coder, { theme: "base16-dark" });
	    this.setState({
	      codeMirror: myCodeMirror
	    });
	  },
	  handleSubmit: function handleSubmit(e) {
	    e.preventDefault();
	    // console.log(e.target.elements[0].value);
	    console.log(this.state.codeMirror.getValue());
	    // var input = e.target.elements[0].value;
	    var input = this.state.codeMirror.getValue();
	    var currentLesson = this.props.lessonInPath;
	    console.log(currentLesson);
	    this.sendCode(input, currentLesson);
	  },
	  handleResponse: function handleResponse(res) {
	    console.log("HANDLE RESPONSE");

	    var instructionsToUse = void 0;
	    var feedbackToUse = void 0;
	    var oldInstructions = this.state.instructions;
	    var oldFeedback = this.state.feedback;

	    if (!res.data.userPassed) {
	      instructionsToUse = oldInstructions;
	      feedbackToUse = res.data.feedback + " <errorfeedback> \r\n" + oldFeedback;
	    } else {
	      instructionsToUse = res.data.instructions;
	      feedbackToUse = res.data.feedback;
	    }

	    this.setState({
	      isResultsReturned: true,
	      results: res.data.results,
	      feedback: feedbackToUse,
	      instructions: instructionsToUse
	    });

	    if (res.data.userPassed) {
	      this.setState({
	        path: res.data.path
	      });
	      this.props.onUpdatePath(res.data.path);
	      this.state.codeMirror.setValue("");
	    }
	  },
	  sendCode: function sendCode(data, lesson) {
	    _axios2.default.post('/CodingPage', {
	      codeFromUser: data,
	      currentLesson: lesson
	    }).then(function (res) {
	      console.log(res.data);
	      this.handleResponse(res);
	    }.bind(this)).catch(function (err) {
	      console.log(err);
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.setCodeEditor();
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'code-editor' },
	      _react2.default.createElement(
	        _Grid2.default,
	        null,
	        _react2.default.createElement(
	          _Row2.default,
	          null,
	          _react2.default.createElement(
	            _Col2.default,
	            { md: 6 },
	            _react2.default.createElement(
	              'h4',
	              null,
	              'H\xE9r fer k\xF3\xF0inn \xFEinn'
	            ),
	            _react2.default.createElement(
	              'form',
	              { onSubmit: this.handleSubmit, method: 'post', action: '/CodingPage' },
	              _react2.default.createElement(
	                'div',
	                { className: 'window-body' },
	                _react2.default.createElement('textarea', { ref: 'coder', value: this.state.textAreaValue, className: 'code-input language-javascript', name: 'codeFromUser', spellCheck: 'false', type: 'text', cols: '40', rows: '10' })
	              ),
	              _react2.default.createElement(
	                'button',
	                { type: 'submit' },
	                'Try code!'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _Col2.default,
	            { md: 6 },
	            _react2.default.createElement(_DialogWindow2.default, { results: this.state.results, feedback: this.state.feedback, instructions: this.state.instructions })
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: "DialogWindow",
	  getInitialState: function getInitialState() {
	    return this.state = {
	      results: "",
	      feedback: "",
	      instructions: "",
	      errorMsg: ""
	    };
	  },
	  breakText: function breakText(data) {

	    var feedbacks = data.feedback;
	    var errorMsg = "";

	    if (data.feedback.indexOf("<errorfeedback>") >= 0) {
	      console.log("indexOf");
	      feedbacks = data.feedback.split("<errorfeedback>");
	      errorMsg = feedbacks[0];
	      feedbacks = feedbacks[1];
	    }

	    feedbacks = feedbacks.split("\r\n");

	    var pFeedbacks = feedbacks.map(function (feedback) {
	      return _react2.default.createElement(
	        "p",
	        null,
	        feedback
	      );
	    });
	    var instructions = data.instructions.split("\r\n");
	    var pInstructions = instructions.map(function (instr) {
	      return _react2.default.createElement(
	        "p",
	        null,
	        instr
	      );
	    });

	    console.log("pFEEDBACKS");
	    console.log(pFeedbacks);
	    if (errorMsg) {
	      // pFeedbacks.unshift(<p className="errorMsg">{errorMsg}</p>);

	    }
	    console.log("pFEEDBACKS");
	    console.log(pFeedbacks);

	    return { pFeedb: pFeedbacks, pInstr: pInstructions, error: errorMsg };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var pElements = this.breakText(nextProps);
	    console.log("Component will mount >");
	    console.log("< Component will mount");
	    this.setState({
	      results: nextProps.results,
	      feedback: pElements.pFeedb,
	      instructions: pElements.pInstr,
	      errorMsg: pElements.error
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(
	        "h4",
	        null,
	        "Keyrsluni\xF0urst\xF6\xF0ur"
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "compilation-output-container" },
	        _react2.default.createElement(
	          "p",
	          { className: "compilation-output" },
	          this.state.results
	        )
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "message-feedback" },
	        _react2.default.createElement(
	          "p",
	          { className: "errorMsg" },
	          this.state.errorMsg
	        ),
	        _react2.default.createElement(
	          "p",
	          null,
	          this.state.feedback
	        )
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "message-feedback" },
	        _react2.default.createElement(
	          "p",
	          null,
	          this.state.instructions
	        )
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 120 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 121 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Sandbox = __webpack_require__(123);

	exports.testCode = function (req, res, next) {
	  var sandbox = new Sandbox();
	  var currentLesson = req.body.currentLesson;
	  var lessonsObject = req.body.allLessons;
	  var codeToTest = req.body.codeFromUser;
	  var testPassed = true;
	  var typeOfError = "";
	  console.log("I am in compiler.testCode");

	  var appendedCode = getAppendBodyFunction(lessonsObject);
	  if (appendedCode != -1) {
	    // if appendedCode == -1 there is no appendBodyFunction to use for this lesson
	    // so here there is a appendedCode to test
	    // appendedCode[0][0] corresponds to the first example of a function body
	    codeToTest = appendedCode[0][0];
	  }

	  sandbox.run(codeToTest, function (output) {
	    console.log(output.result);
	    console.log(output.console);

	    // Check if there were any errors, if so Lessons will be informed and the next lesson wont be available.
	    // If there are no errors, Lessons will be informed and the user will continue
	    // Lessons keeps the appropriate information about the next Lesson in a json format.

	    if (checkError(output.result)) {
	      // we got an error
	      console.log("if(checkError()) returns true---------");
	      typeOfError = getError(output.result);
	      testPassed = false;
	      req.body.feedback = typeOfError;
	      finishCompilation(output.result, output.console);
	    } else if (appendedCode != -1) {
	      // no errors and the code was appended
	      console.log("runTestCases will be run---------");
	      // runTestCases(appendedCode, finishCompilation);
	      runTestCases(appendedCode, 0);
	    } else {
	      // no errors and the code wasnt appended
	      console.log("else statement matches, calling finishCompilation() in beginning...---------");
	      finishCompilation(output.result, output.console);
	    }
	  });

	  function finishCompilation(results, consoles) {
	    // last callback function to call before finishing Compiler activity
	    console.log("testPassed in finishCompilation");
	    console.log(testPassed);
	    req.body.testPassed = testPassed;
	    // req.body.outputResult = output.result;
	    // req.body.outputConsole = output.console;
	    req.body.outputResult = results;
	    req.body.outputConsole = consoles;
	    next();
	  }

	  function checkError(result) {
	    // if results contains "error"
	    // it is a error
	    if (result.toLowerCase().indexOf("error") >= 0) {
	      return true;
	    } else return false;
	  }

	  function getError(result) {
	    // get type of error:
	    var str = "";
	    // "ReferenceError: x is not defined"
	    var regexReferenceError = result.match(/\ReferenceError: (.*?)\ is not defined/);
	    // "SyntaxError: Unexpected end of input"
	    var regexSyntaxErrorUnexpectedEndOfInput = result.match(/\SyntaxError: Unexpected end of input/);
	    // "SyntaxError: Unexpected token ;"
	    var regexSyntaxErrorUnexpectedToken = result.match(/\SyntaxError: Unexpected token (.*)/);
	    // "TimeoutError"
	    var regexTimeoutError = result.match(/\TimeoutError/);
	    // "RangeError: Maximum call stack size exceeded"
	    var regexRangeError = result.match(/\RangeError: Maximum call stack size exceeded/);
	    console.log("REGEX");
	    if (regexReferenceError) {
	      console.log("reference error");
	      str += "Tilvísunarvilla! ";
	      str += regexReferenceError[1];
	      str += " er ekki skilgreint.";
	    } else if (regexSyntaxErrorUnexpectedToken) {
	      console.log("syntax token error");
	      str += "Þýðandinn átti ekki von á ";
	      str += regexSyntaxErrorUnexpectedToken[1];
	      str += " tákni.";
	    } else if (regexSyntaxErrorUnexpectedEndOfInput) {
	      console.log("syntax end of input error");
	      str += "Villa! ";
	      str += "Þýðandinn kvartar yfir end of input. ";
	    } else if (regexTimeoutError) {
	      console.log("timeout error");
	      str += "Tímavilla, óendanleg lykkja?";
	    } else if (regexRangeError) {
	      console.log("range error");
	      str += "Óendanleg endurkvæmni?";
	    } else {
	      console.log("unknown error");
	      str += "Úps, villa!";
	      str += " Könnumst ekki við þessa villu: ";
	      str += result;
	    }
	    return str;
	  }

	  function getAppendBodyFunction(data) {
	    var appendBodyFunction = "lessonFunction";
	    console.log("GET APPEND BODY FUNCTION");
	    // eval hack ...
	    // validate current lesson
	    // runs the appropriate validation function
	    return eval(data[currentLesson][appendBodyFunction]);
	  }
	  function lessonStart(code) {
	    // no appending in current lesson
	    return -1;
	  }
	  function lessonOne(code) {
	    // no appending in current lesson
	    return -1;
	  }
	  function lessonTwo(code) {
	    // no appending in current lesson
	    return -1;
	  }
	  function lessonThree(code) {
	    // no appending in current lesson
	    return -1;
	  }
	  function lessonFour(code) {
	    // build cases of inputs and expectedOutputs
	    var functionBodyStart = "function F_U_N_C(x) {";
	    var functionBodyEnd1 = "return x; } F_U_N_C(500);";
	    var functionBodyEnd2 = "return x; } F_U_N_C(20);";
	    var functionBodyEnd3 = "return x; } F_U_N_C(100);";

	    var function_1 = functionBodyStart + code + functionBodyEnd1;
	    var function_2 = functionBodyStart + code + functionBodyEnd2;
	    var function_3 = functionBodyStart + code + functionBodyEnd3;

	    var functionArray = [function_1, function_2, function_3];
	    var expectedOutputs = [250, 100, 50];

	    // if(runCode(functionArray, expectedOutputs)) {
	    //   return true;
	    // } else {
	    //   return false;
	    // }
	    return [functionArray, expectedOutputs];
	  }

	  function lessonFive(code) {
	    // build cases of inputs and expectedOutputs
	    var functionBodyStart = "function F_U_N_C() {";
	    var functionBodyEnd1 = "return sum; } F_U_N_C();";

	    var function_1 = functionBodyStart + code + functionBodyEnd1;

	    var functionArray = [function_1];
	    var expectedOutputs = [55];
	    // returns a matrix of functions and expected outputs
	    return [functionArray, expectedOutputs];
	  }

	  function runTestCases(m, i) {
	    // m is a matrix with 2 lines, line 0 with functions and line 1 with expectedOutputs
	    sandbox.run(m[0][i], function (output) {
	      if (output.result != m[1][i]) {
	        console.log("NOT MATCH");
	        testPassed = false;
	        req.body.feedback = "Einhvað fór úrskeiðis þegar forritið var prófað miðað við input, endurskoðaðu forritið þitt.";
	        finishCompilation(output.result, output.console);
	      } else {
	        console.log("MATCH");
	        if (i < m[0].length - 1) {
	          console.log("NOT END OF MATRIX");
	          runTestCases(m, i + 1);
	        } else {
	          console.log("END OF MATRIX");
	          finishCompilation(output.result, output.console);
	        }
	      }
	    });
	  }
	};

/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = require("sandbox");

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fs = __webpack_require__(125);
	var g_lessonsObject = null;
	//========
	// loadLessonsJSON middleware
	//========
	exports.loadLessonsJSON = function (req, res, next) {
	  console.log("LOADING JSON");
	  if (g_lessonsObject != null) {
	    // no need to fetch JSON
	    req.body.allLessons = g_lessonsObject;
	    next();
	  } else {
	    getLessonsJSON(finishLoad);
	  }

	  function getLessonsJSON(callback) {
	    // fetches all lessons from data.json
	    // example:
	    //  {
	    //    lessonone: {
	    //      "feedback": "Vel gert",
	    //      "path": "lessontwo",
	    //      "instructions": "Instructions for lesson two"
	    //      "validationFunction": "validateLessonOne"
	    //    }
	    //  }
	    var obj;
	    fs.readFile('./middlewares/data.json', 'utf8', function (err, data) {
	      if (err) throw err;
	      obj = JSON.parse(data);
	      // global object with all lessons
	      g_lessonsObject = obj;
	      callback();
	    });
	  }
	  // callback function to continue to next middlewares
	  function finishLoad() {
	    req.body.allLessons = g_lessonsObject;
	    next();
	  }
	};
	//========
	// getLesson middleware
	//========
	exports.getLesson = function (req, res, next) {
	  console.log("GET LESSON STARTS HERE");
	  console.log(req.body.currentLesson);
	  console.log(req.body.testPassed);
	  //console.log(g_lessonsObject);

	  var currentLesson = req.body.currentLesson;
	  // if the test was passed we get a new lesson
	  if (req.body.testPassed) {
	    //getLessonsJSON(req.url, getValidationFunction);
	    getValidationFunction(g_lessonsObject);
	  } else {
	    // we get nothing, user will get error message..
	    next();
	  }
	  // a callback function which sends new lesson to client
	  // if the user passed
	  function sendLesson(data) {
	    var nextLesson = data[currentLesson];
	    req.body.feedback = nextLesson["feedback"];
	    req.body.path = nextLesson["path"];
	    req.body.instructions = nextLesson["instructions"];
	    console.log("req.body.feedback in sendLesson function: ");
	    console.log(req.body.feedback);
	    next();
	  }

	  function getValidationFunction(data) {
	    var validationFunction = "lessonFunction";
	    console.log("GET VALIDATION FUNCTION");
	    // eval hack ...
	    // validate current lesson
	    // runs the appropriate validation function
	    if (eval(data[currentLesson][validationFunction])) {
	      // user followed instructions correctly
	      sendLesson(data);
	    } else {
	      req.body.testPassed = false;
	      next();
	    }
	  }

	  function lessonStart(code) {
	    var userSolved = false;
	    // number operator number
	    // example:
	    // 1+4
	    console.log("code from validateLessonStart: ");
	    console.log(code);
	    var regex = code.match(/\d+[\-\+\*\/\s]+\d+/);
	    if (regex) {
	      // user solved problem correctly
	      console.log("USER SOLVED PROBLEM");
	      userSolved = true;
	    } else {
	      // user has not solved problem correctly
	      req.body.feedback = "Ekki farið eftir leiðbeiningum.";
	      console.log("USER HAS NOT SOLVED PROBLEM");
	    }
	    return userSolved;
	  }
	  function lessonOne(code) {
	    var userSolved = false;
	    // "string1" + "string2"
	    // example:
	    // "hello" + "world"
	    console.log("code from validateLessonOne: ");
	    console.log(code);
	    var regex = code.match(/\"\s*[\w\s]+\"\s*[\+]\s*\"\s*[\w\s]+\"/);
	    console.log("REGEX : ");
	    console.log(regex);
	    if (regex) {
	      // user solved problem correctly
	      console.log("USER SOLVED PROBLEM");
	      userSolved = true;
	    } else {
	      // user has not solved problem correctly
	      req.body.feedback = "Ekki farið eftir leiðbeiningum.";
	      console.log("USER HAS NOT SOLVED PROBLEM");
	    }
	    return userSolved;
	  }
	  function lessonTwo(code) {
	    var userSolved = false;
	    // number modulus number
	    // example:
	    // 3%2
	    console.log("code from validateLessonTwo: ");
	    console.log(code);
	    var regex = code.match(/\d+[\%\s]+\d+/);
	    console.log("REGEX : ");
	    console.log(regex);
	    if (regex) {
	      // user solved problem correctly
	      console.log("USER SOLVED PROBLEM");
	      userSolved = true;
	    } else {
	      // user has not solved problem correctly
	      req.body.feedback = "Ekki farið eftir leiðbeiningum.";
	      console.log("USER HAS NOT SOLVED PROBLEM");
	    }
	    return userSolved;
	  }
	  function lessonThree(code) {
	    // init if problem is not solved
	    var userSolved = false;
	    req.body.feedback = "Ekki farið eftir leiðbeiningum.";
	    // using variable
	    // example:
	    // var x = 4;
	    // x = 2*x
	    var removedSpacesAndToLowerCase = code.replace(/\s+/g, '').toLowerCase();
	    var str = removedSpacesAndToLowerCase;
	    // check if initialization is used correctly for x variable
	    // check if doubling value by using its own value
	    if (str.indexOf("varx=") >= 0 && (str.indexOf("=2*x") >= 0 || str.indexOf("=x*2") >= 0)) {
	      // if((str.indexOf("=2*x")>=0 || str.indexOf("=x*2")>=0)) {
	      // user solved problem correctly
	      console.log("USER SOLVED PROBLEM");
	      userSolved = true;
	      // }
	      // else {
	      //   // user has not solved problem correctly
	      //   console.log("USER HAS NOT SOLVED PROBLEM");
	      // }
	    } else {
	      // user has not solved problem correctly
	      console.log("USER HAS NOT SOLVED PROBLEM");
	    }
	    return userSolved;
	  }

	  function lessonFour(code) {
	    // init if problem is not solved
	    var userSolved = false;
	    req.body.feedback = "Ekki farið eftir leiðbeiningum.";
	    // if/else statements
	    // example:
	    // if(x>=100) {
	    //    x = 5*x;
	    // } else {
	    //    x = x/2;
	    // }
	    var removedSpacesAndToLowerCase = code.replace(/\s+/g, '').toLowerCase();
	    var str = removedSpacesAndToLowerCase;
	    // check if user is using correct if/else statements
	    if (str.indexOf("if(") >= 0 && str.indexOf("else") >= 0) {
	      // user solved problem correctly
	      console.log("USER SOLVED PROBLEM");
	      userSolved = true;
	    } else {
	      // user has not solved problem correctly
	      console.log("USER HAS NOT SOLVED PROBLEM");
	    }
	    return userSolved;
	  }

	  function lessonFive(code) {
	    // init if problem is not solved
	    var userSolved = false;
	    req.body.feedback = "Ekki farið eftir leiðbeiningum.";
	    // while statements
	    // example:
	    // var x = 0;
	    // while(x<10) {
	    //    sum = sum + x;
	    //    x = x + 1;
	    // }
	    var removedSpacesAndToLowerCase = code.replace(/\s+/g, '').toLowerCase();
	    var str = removedSpacesAndToLowerCase;
	    // check if user is using correct while
	    if (str.indexOf("while(") >= 0) {
	      // user solved problem correctly
	      console.log("USER SOLVED PROBLEM");
	      userSolved = true;
	    } else {
	      // user has not solved problem correctly
	      console.log("USER HAS NOT SOLVED PROBLEM");
	    }
	    return userSolved;
	  }
	};

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ }
/******/ ]);