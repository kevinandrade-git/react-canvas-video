'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBar = function (_Component) {
    _inherits(ProgressBar, _Component);

    function ProgressBar() {
        var _temp, _this, _ret;

        _classCallCheck(this, ProgressBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.timeUpdateListener = function () {
            return _this.forceUpdate();
        }, _this.seek = function (e, video) {
            var percent = e.nativeEvent.offsetX / e.target.offsetWidth;
            video.currentTime = percent * video.duration;
            if (video.paused || video.ended) {
                video.play().then(function () {
                    return video.pause();
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    ProgressBar.prototype.componentDidMount = function componentDidMount() {
        this.props.video.addEventListener('timeupdate', this.timeUpdateListener, false);
    };

    ProgressBar.prototype.componentWillUnmount = function componentWillUnmount() {
        this.props.video.removeEventListener('timeupdate', this.timeUpdateListener, false);
    };

    ProgressBar.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            video = _props.video,
            style = _props.styles;


        return _react2.default.createElement('progress', {
            onClick: function onClick(e) {
                return _this2.seek(e, video);
            },
            min: '0',
            max: '100',
            value: video.currentTime ? video.currentTime / video.duration * 100 : 0,
            style: style.progress
        });
    };

    return ProgressBar;
}(_react.Component);

exports.default = ProgressBar;
module.exports = exports['default'];