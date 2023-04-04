import PropTypes from "prop-types";
import React, { Component } from "react";

import Bar from "./Bar";
import { style } from "./styles";

class CanvasVideo extends Component {
  componentWillMount() {
    this.virtualVideoElement = this.makeVirtualVideoElement(this.props.src);
  }

  componentDidMount() {
    this.startPlayingInCanvas(this.virtualVideoElement, this.canvasRef, {
      ratio: this.props.options ? this.props.options.ratio || 16 / 9 : 16 / 9,
      autoplay: this.props.options
        ? this.props.options.autoplay || false
        : false,
    });
  }

  componentWillUnmount() {
    this.virtualVideoElement.removeEventListener(
      "play",
      this.playListener,
      false
    );
    if (!this.virtualVideoElement.paused) this.virtualVideoElement.pause();
    this.virtualVideoElement.remove();
    delete this.virtualVideoElement;
  }

  startPlayingInCanvas = (video, canvasRef, { ratio, autoplay }) => {
    const context = canvasRef.getContext("2d");
    canvasRef.width = canvasRef.clientWidth;
    canvasRef.height = canvasRef.clientWidth / ratio;
    this.playListener = () => {
      this.draw(video, context, canvasRef.width, canvasRef.height);
    };
    video.addEventListener("play", this.playListener, false);
    if (autoplay) video.play();
  };

  makeVirtualVideoElement = (src) => {
    const video = document.createElement("video");
    const source = document.createElement("source");
    source.setAttribute("src", src);
    video.appendChild(source);
    return video;
  };

  draw = (video, context, canvasWidth, canvasHeight) => {
    context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
    this.drawText(context, video, canvasWidth, canvasHeight);
    if (!video.paused && !video.ended)
      setTimeout(
        this.draw,
        1000 / 24,
        video,
        context,
        canvasWidth,
        canvasHeight
      );
  };

  drawText = (context, video, canvasWidth, canvasHeight) => {
    if (this.props.options && this.props.options.watermark != undefined) {
      context.font = "bold 30px Arial";

      var _context$measureText = context.measureText(
          _this.props.options.watermark
        ),
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
    if (
      this.props.options &&
      this.props.options.text !== undefined &&
      video.currentTime % (5 * 60) < 5
    ) {
      context.font = `${canvasHeight / 20}px Arial`;
      context.fillStyle = "rgba(255,255,255,0.5)";
      context.textAlign = "center";
      context.fillText(
        this.props.options.text,
        canvasWidth / 2,
        canvasHeight / 20
      );
    }
  };

  onPlayPauseHandler = (e) => {
    this.virtualVideoElement.paused
      ? this.virtualVideoElement.play()
      : this.virtualVideoElement.pause();
  };

  render() {
    const combinedStyles = {};
    Object.keys(style).forEach((key) => {
      combinedStyles[key] = {
        ...style[key],
        ...(this.props.styles ? this.props.styles[key] : {}),
      };
    });

    return (
      <div style={combinedStyles.canvasContainer}>
        <canvas
          ref={(canvasRef) => (this.canvasRef = canvasRef)}
          style={{
            width: "100%",
            ...combinedStyles.canvas,
            ...(this.props.options && this.props.options.poster
              ? { backgroundImage: `url(${this.props.options.poster})` }
              : {}),
          }}
          onClick={this.onPlayPauseHandler}
        ></canvas>
        <Bar styles={combinedStyles} video={this.virtualVideoElement} />
      </div>
    );
  }
}

CanvasVideo.propTypes = {
  src: PropTypes.string.isRequired,
  options: PropTypes.shape({
    text: PropTypes.string,
    poster: PropTypes.string,
    autoplay: PropTypes.bool,
    watermark: PropTypes.string,
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
    time: PropTypes.object,
  }),
};

export default CanvasVideo;
