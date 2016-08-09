'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyToggle = _react2.default.createClass({
  displayName: 'FormsyToggle',


  propTypes: {
    defaultToggled: _react2.default.PropTypes.bool,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func,
    validationError: _react2.default.PropTypes.string,
    validationErrors: _react2.default.PropTypes.object,
    validations: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object])
  },

  mixins: [_formsyReact2.default.Mixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this.muiComponent.isToggled());
  },
  handleChange: function handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props;
    var defaultToggled = _props.defaultToggled;
    var validations = _props.validations;
    var // eslint-disable-line no-unused-vars
    validationError = _props.validationError;
    var // eslint-disable-line no-unused-vars
    validationErrors = _props.validationErrors;

    var rest = _objectWithoutProperties(_props, ['defaultToggled', 'validations', 'validationError', 'validationErrors']);

    var value = this.getValue();

    if (typeof value === 'undefined') {
      value = typeof defaultToggled !== 'undefined' ? defaultToggled : false;
    }

    return _react2.default.createElement(_Toggle2.default, _extends({}, rest, {
      onToggle: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus,
      toggled: value
    }));
  }
});

exports.default = FormsyToggle;