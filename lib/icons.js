"use strict";

exports.__esModule = true;
exports.MuteIcon = exports.UnMuteIcon = exports.PlayIcon = exports.PauseIcon = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PauseIcon = exports.PauseIcon = function PauseIcon(_ref) {
    var width = _ref.width,
        height = _ref.height,
        style = _ref.style;
    return _react2.default.createElement(
        "svg",
        {
            width: width,
            height: height,
            style: style,
            viewBox: "0 0 1792 1792",
            xmlns: "http://www.w3.org/2000/svg"
        },
        _react2.default.createElement("path", { d: "M1664 192v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45zm-896 0v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45z" })
    );
};

var PlayIcon = exports.PlayIcon = function PlayIcon(_ref2) {
    var width = _ref2.width,
        height = _ref2.height,
        style = _ref2.style;
    return _react2.default.createElement(
        "svg",
        {
            width: width,
            height: height,
            style: style,
            viewBox: "0 0 1792 1792",
            xmlns: "http://www.w3.org/2000/svg"
        },
        _react2.default.createElement("path", { d: "M1576 927l-1328 738q-23 13-39.5 3t-16.5-36v-1472q0-26 16.5-36t39.5 3l1328 738q23 13 23 31t-23 31z" })
    );
};

var UnMuteIcon = exports.UnMuteIcon = function UnMuteIcon(_ref3) {
    var width = _ref3.width,
        height = _ref3.height,
        style = _ref3.style;
    return _react2.default.createElement(
        "svg",
        {
            width: width,
            height: height,
            style: style,
            viewBox: "0 0 1792 1792",
            xmlns: "http://www.w3.org/2000/svg"
        },
        _react2.default.createElement("path", { d: "M832 352v1088q0 26-19 45t-45 19-45-19l-333-333h-262q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h262l333-333q19-19 45-19t45 19 19 45zm384 544q0 76-42.5 141.5t-112.5 93.5q-10 5-25 5-26 0-45-18.5t-19-45.5q0-21 12-35.5t29-25 34-23 29-36 12-56.5-12-56.5-29-36-34-23-29-25-12-35.5q0-27 19-45.5t45-18.5q15 0 25 5 70 27 112.5 93t42.5 142zm256 0q0 153-85 282.5t-225 188.5q-13 5-25 5-27 0-46-19t-19-45q0-39 39-59 56-29 76-44 74-54 115.5-135.5t41.5-173.5-41.5-173.5-115.5-135.5q-20-15-76-44-39-20-39-59 0-26 19-45t45-19q13 0 26 5 140 59 225 188.5t85 282.5zm256 0q0 230-127 422.5t-338 283.5q-13 5-26 5-26 0-45-19t-19-45q0-36 39-59 7-4 22.5-10.5t22.5-10.5q46-25 82-51 123-91 192-227t69-289-69-289-192-227q-36-26-82-51-7-4-22.5-10.5t-22.5-10.5q-39-23-39-59 0-26 19-45t45-19q13 0 26 5 211 91 338 283.5t127 422.5z" })
    );
};

var MuteIcon = exports.MuteIcon = function MuteIcon(_ref4) {
    var width = _ref4.width,
        height = _ref4.height,
        style = _ref4.style;
    return _react2.default.createElement(
        "svg",
        {
            width: width,
            height: height,
            style: style,
            viewBox: "0 0 1792 1792",
            xmlns: "http://www.w3.org/2000/svg"
        },
        _react2.default.createElement("path", { d: "M1280 352v1088q0 26-19 45t-45 19-45-19l-333-333h-262q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h262l333-333q19-19 45-19t45 19 19 45z" })
    );
};