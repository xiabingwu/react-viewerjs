'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RViewer = exports.RViewerTrigger = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ImageListRender = require('./ImageListRender');

var _ImageListRender2 = _interopRequireDefault(_ImageListRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RViewerTriggerName = Symbol('RViewerTriggerName');
var isRViewerTrigger = function isRViewerTrigger(el) {
  return el.type && el.type.componentName == RViewerTriggerName;
};
/*
* 对viewerjs的react封装
* https://github.com/fengyuanchen/viewerjs
* */
function deepMap(children, callback) {
  //参考https://github.com/reactjs/react-tabs/blob/master/src/helpers/childrenDeepMap.js
  return _react.Children.map(children, function (child) {
    if (child === null) return null;
    if (isRViewerTrigger(child)) {
      return callback(child);
    }
    if (child.props && child.props.children && _typeof(child.props.children) === 'object') {
      return (0, _react.cloneElement)(child, _extends({}, child.props, {
        children: deepMap(child.props.children, callback)
      }));
    }
    return child;
  });
}

var RViewerTrigger = function (_PureComponent) {
  _inherits(RViewerTrigger, _PureComponent);

  function RViewerTrigger() {
    _classCallCheck(this, RViewerTrigger);

    return _possibleConstructorReturn(this, (RViewerTrigger.__proto__ || Object.getPrototypeOf(RViewerTrigger)).apply(this, arguments));
  }

  _createClass(RViewerTrigger, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return RViewerTrigger;
}(_react.PureComponent);

RViewerTrigger.propTypes = {
  children: _propTypes2.default.element.isRequired
};

RViewerTrigger.componentName = RViewerTriggerName;

var RViewer = function (_PureComponent2) {
  _inherits(RViewer, _PureComponent2);

  function RViewer(props) {
    _classCallCheck(this, RViewer);

    var _this2 = _possibleConstructorReturn(this, (RViewer.__proto__ || Object.getPrototypeOf(RViewer)).call(this, props));

    _this2.show = function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      _this2.setState({
        isShow: true,
        index: index
      });
    };

    _this2.hide = function () {
      _this2.setState({
        isShow: false
      });
    };

    _this2.state = {
      isShow: false,
      index: 0 //默认显示第0个元素
    };
    return _this2;
  }

  _createClass(RViewer, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          imageUrls = _props.imageUrls,
          options = _props.options;

      var resultUrls = typeof imageUrls === 'string' ? [imageUrls] : imageUrls;
      // React v16.2.0颁布版本才能使用React.Fragment，如果没有的话，就用div包裹
      var Fragment = _react2.default.Fragment ? _react2.default.Fragment : 'div';
      return _react2.default.createElement(
        Fragment,
        null,
        this.state.isShow ? _react2.default.createElement(_ImageListRender2.default, { imageUrls: resultUrls, index: this.state.index, options: options, hide: this.hide }) : null,
        deepMap(children, function (child) {
          var props = {
            onClick: function onClick() {
              var index = child.props.index;

              _this3.show(index);
            }
          };
          return (0, _react.cloneElement)(child.props.children, props);
        })
      );
    }
  }]);

  return RViewer;
}(_react.PureComponent);

RViewer.propTypes = {
  imageUrls: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired
};
exports.RViewerTrigger = RViewerTrigger;
exports.RViewer = RViewer;