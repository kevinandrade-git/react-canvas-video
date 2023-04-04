"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Bar = require("./Bar");

var _Bar2 = _interopRequireDefault(_Bar);

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CanvasVideo = function (_Component) {
  _inherits(CanvasVideo, _Component);

  function CanvasVideo() {
    var _temp, _this2, _ret;

    _classCallCheck(this, CanvasVideo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this2), _this2.startPlayingInCanvas = function (video, canvasRef, _ref) {
      var ratio = _ref.ratio,
          autoplay = _ref.autoplay;

      var context = canvasRef.getContext("2d");
      canvasRef.width = canvasRef.clientWidth;
      canvasRef.height = canvasRef.clientWidth / ratio;
      _this2.playListener = function () {
        _this2.draw(video, context, canvasRef.width, canvasRef.height);
      };
      video.addEventListener("play", _this2.playListener, false);
      if (autoplay) video.play();
    }, _this2.makeVirtualVideoElement = function (src) {
      var video = document.createElement("video");
      var source = document.createElement("source");
      source.setAttribute("src", src);
      video.appendChild(source);
      return video;
    }, _this2.draw = function (video, context, canvasWidth, canvasHeight) {
      context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
      _this2.drawText(context, video, canvasWidth, canvasHeight);
      if (!video.paused && !video.ended) setTimeout(_this2.draw, 1000 / 24, video, context, canvasWidth, canvasHeight);
    }, _this2.drawText = function (context, video, canvasWidth, canvasHeight) {
      if (_this2.props.options && _this2.props.options.watermark != undefined) {
        context.font = "bold 30px Arial";

        var _context$measureText = context.measureText(_this.props.options.watermark),
            textWidth = _context$measureText.width,
            actualBoundingBoxAscent = _context$measureText.actualBoundingBoxAscent;

        var xStep = textWidth + 3;
        var yStep = Math.abs(actualBoundingBoxAscent * 1.5);

        var originalFillStyle = context.fillStyle;
        for (var x = 0; x < canvasWidth; x += xStep) {
          for (var y = 0; y < canvasHeight; y += yStep) {
            context.globalAlpha = 0.3;
            ctx.fillStyle = "black";
            context.fillText(_this.props.options.watermark, x, y);
            context.globalAlpha = 1;

            context.fillStyle = originalFillStyle;
          }
        }
      }
      if (_this2.props.options && _this2.props.options.text !== undefined && video.currentTime % (5 * 60) < 5) {
        context.font = canvasHeight / 20 + "px Arial";
        context.fillStyle = "rgba(255,255,255,0.5)";
        context.textAlign = "center";
        context.fillText(_this2.props.options.text, canvasWidth / 2, canvasHeight / 20);
      }
    }, _this2.onPlayPauseHandler = function (e) {
      _this2.virtualVideoElement.paused ? _this2.virtualVideoElement.play() : _this2.virtualVideoElement.pause();
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  CanvasVideo.prototype.componentWillMount = function componentWillMount() {
    this.virtualVideoElement = this.makeVirtualVideoElement(this.props.src);
  };

  CanvasVideo.prototype.componentDidMount = function componentDidMount() {
    this.startPlayingInCanvas(this.virtualVideoElement, this.canvasRef, {
      ratio: this.props.options ? this.props.options.ratio || 16 / 9 : 16 / 9,
      autoplay: this.props.options ? this.props.options.autoplay || false : false
    });
  };

  CanvasVideo.prototype.componentWillUnmount = function componentWillUnmount() {
    this.virtualVideoElement.removeEventListener("play", this.playListener, false);
    if (!this.virtualVideoElement.paused) this.virtualVideoElement.pause();
    this.virtualVideoElement.remove();
    delete this.virtualVideoElement;
  };

  CanvasVideo.prototype.render = function render() {
    var _this3 = this;

    var combinedStyles = {};
    Object.keys(_styles.style).forEach(function (key) {
      combinedStyles[key] = _extends({}, _styles.style[key], _this3.props.styles ? _this3.props.styles[key] : {});
    });

    return _react2.default.createElement(
      "div",
      { style: combinedStyles.canvasContainer },
      _react2.default.createElement("canvas", {
        ref: function ref(canvasRef) {
          return _this3.canvasRef = canvasRef;
        },
        style: _extends({
          width: "100%"
        }, combinedStyles.canvas, this.props.options && this.props.options.poster ? { backgroundImage: "url(" + this.props.options.poster + ")" } : {}),
        onClick: this.onPlayPauseHandler
      }),
      _react2.default.createElement(_Bar2.default, { styles: combinedStyles, video: this.virtualVideoElement })
    );
  };

  return CanvasVideo;
}(_react.Component);

CanvasVideo.propTypes = process.env.NODE_ENV !== "production" ? {
  src: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.shape({
    text: _propTypes2.default.string,
    poster: _propTypes2.default.string,
    autoplay: _propTypes2.default.bool,
    watermark: _propTypes2.default.string
  }),
  styles: _propTypes2.default.shape({
    canvas: _propTypes2.default.object,
    canvasConatiner: _propTypes2.default.object,
    barContainer: _propTypes2.default.object,
    button: _propTypes2.default.object,
    buttonIcon: _propTypes2.default.object,
    progress: _propTypes2.default.object,
    progressVol: _propTypes2.default.object,
    progressMuted: _propTypes2.default.object,
    time: _propTypes2.default.object
  })
} : {};

exports.default = CanvasVideo;
module.exports = exports["default"];