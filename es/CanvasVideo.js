var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from "prop-types";
import React, { Component } from "react";

import Bar from "./Bar";
import { style } from "./styles";

var CanvasVideo = function (_Component) {
  _inherits(CanvasVideo, _Component);

  function CanvasVideo() {
    var _temp, _this, _ret;

    _classCallCheck(this, CanvasVideo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.startPlayingInCanvas = function (video, canvasRef, _ref) {
      var ratio = _ref.ratio,
          autoplay = _ref.autoplay;

      var context = canvasRef.getContext("2d");
      canvasRef.width = canvasRef.clientWidth;
      canvasRef.height = canvasRef.clientWidth / ratio;
      _this.playListener = function () {
        _this.draw(video, context, canvasRef.width, canvasRef.height);
      };
      video.addEventListener("play", _this.playListener, false);
      if (autoplay) video.play();
    }, _this.makeVirtualVideoElement = function (src) {
      var video = document.createElement("video");
      var source = document.createElement("source");
      source.setAttribute("src", src);
      video.appendChild(source);
      return video;
    }, _this.draw = function (video, context, canvasWidth, canvasHeight) {
      context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
      _this.drawText(context, video, canvasWidth, canvasHeight);
      if (!video.paused && !video.ended) setTimeout(_this.draw, 1000 / 24, video, context, canvasWidth, canvasHeight);
    }, _this.drawText = function (context, video, canvasWidth, canvasHeight) {
      if (_this.props.options && _this.props.options.watermark != undefined) {
        context.font = "bold " + canvasHeight / 40 + "px Arial";

        var _context$measureText = context.measureText(_this.props.options.watermark),
            textWidth = _context$measureText.width,
            actualBoundingBoxAscent = _context$measureText.actualBoundingBoxAscent;

        var xStep = textWidth;
        var yStep = Math.abs(actualBoundingBoxAscent * 1.5);

        context.globalAlpha = 0.4;
        for (var x = 0; x < canvasWidth; x += xStep) {
          for (var y = 0; y < canvasHeight; y += yStep) {
            context.fillText(_this.props.options.watermark, x, y);
          }
        }
        context.globalAlpha = 1;
      }
      if (_this.props.options && _this.props.options.text !== undefined && video.currentTime % (5 * 60) < 5) {
        context.font = canvasHeight / 20 + "px Arial";
        context.fillStyle = "rgba(255,255,255,0.5)";
        context.textAlign = "center";
        context.fillText(_this.props.options.text, canvasWidth / 2, canvasHeight / 20);
      }
    }, _this.onPlayPauseHandler = function (e) {
      _this.virtualVideoElement.paused ? _this.virtualVideoElement.play() : _this.virtualVideoElement.pause();
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
    var _this2 = this;

    var combinedStyles = {};
    Object.keys(style).forEach(function (key) {
      combinedStyles[key] = _extends({}, style[key], _this2.props.styles ? _this2.props.styles[key] : {});
    });

    return React.createElement(
      "div",
      { style: combinedStyles.canvasContainer },
      React.createElement("canvas", {
        ref: function ref(canvasRef) {
          return _this2.canvasRef = canvasRef;
        },
        style: _extends({
          width: "100%"
        }, combinedStyles.canvas, this.props.options && this.props.options.poster ? { backgroundImage: "url(" + this.props.options.poster + ")" } : {}),
        onClick: this.onPlayPauseHandler
      }),
      React.createElement(Bar, { styles: combinedStyles, video: this.virtualVideoElement })
    );
  };

  return CanvasVideo;
}(Component);

CanvasVideo.propTypes = process.env.NODE_ENV !== "production" ? {
  src: PropTypes.string.isRequired,
  options: PropTypes.shape({
    text: PropTypes.string,
    poster: PropTypes.string,
    autoplay: PropTypes.bool,
    watermark: PropTypes.string
  }),
  styles: PropTypes.shape({
    canvas: PropTypes.object,
    canvasConatiner: PropTypes.object,
    barContainer: PropTypes.object,
    button: PropTypes.object,
    buttonIcon: PropTypes.object,
    progress: PropTypes.object,
    progressVol: PropTypes.object,
    progressMuted: PropTypes.object,
    time: PropTypes.object
  })
} : {};

export default CanvasVideo;