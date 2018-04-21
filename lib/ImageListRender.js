'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _viewerjs = require('viewerjs');

var _viewerjs2 = _interopRequireDefault(_viewerjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('viewerjs/dist/viewer.min.css');

var ImageListRender = function (_PureComponent) {
  _inherits(ImageListRender, _PureComponent);

  function ImageListRender() {
    _classCallCheck(this, ImageListRender);

    return _possibleConstructorReturn(this, (ImageListRender.__proto__ || Object.getPrototypeOf(ImageListRender)).apply(this, arguments));
  }

  _createClass(ImageListRender, [{
    key: 'render',
    value: function render() {
      var imageUrls = this.props.imageUrls;

      return _react2.default.createElement(
        'div',
        { ref: 'imageListWrapper' },
        imageUrls.map(function (url, index) {
          return _react2.default.createElement('img', { src: url, key: index, style: { display: 'none' } });
        })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          index = _props.index,
          hide = _props.hide,
          customOptions = _props.options;

      var _ref = customOptions || { toolbar: {} },
          customToolbar = _ref.toolbar,
          _hidden = _ref.hidden,
          restOptions = _objectWithoutProperties(_ref, ['toolbar', 'hidden']);

      var options = _extends({
        toolbar: _extends({
          zoomIn: true,
          zoomOut: true,
          oneToOne: true,
          reset: true,
          prev: true,
          play: true,
          next: true,
          rotateLeft: true,
          rotateRight: 4,
          flipHorizontal: true,
          flipVertical: true
        }, customToolbar),
        navbar: false
      }, restOptions, {
        hidden: function hidden() {
          _hidden && _hidden();
          hide(); ////关闭的时候通过调用父组件方法触发父组件state来卸载子组件
        }
      });
      /*因为Viewer接受的参数必须是一个图片容器或者是一个图片元素，其他元素初始化会被中断*/
      this.viewer = new _viewerjs2.default(_reactDom2.default.findDOMNode(this.refs.imageListWrapper), options);
      this.viewer.view(index);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.viewer.destroy();
    }
  }]);

  return ImageListRender;
}(_react.PureComponent);

exports.default = ImageListRender;