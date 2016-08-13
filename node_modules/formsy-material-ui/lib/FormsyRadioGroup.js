'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _RadioButton = require('material-ui/RadioButton');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyRadioGroup = _react2.default.createClass({
  displayName: 'FormsyRadioGroup',


  propTypes: {
    children: _react2.default.PropTypes.node,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func,
    validationError: _react2.default.PropTypes.string,
    validationErrors: _react2.default.PropTypes.object,
    validations: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object])
  },

  mixins: [_formsyReact2.default.Mixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this.muiComponent.getSelectedValue());
  },
  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props;
    var validations = _props.validations;
    var // eslint-disable-line no-unused-vars
    validationError = _props.validationError;
    var // eslint-disable-line no-unused-vars
    validationErrors = _props.validationErrors;

    var rest = _objectWithoutProperties(_props, ['validations', 'validationError', 'validationErrors']);

    // remove unknown props from children


    var children = _react2.default.Children.map(this.props.children, function (radio) {
      var _radio$props = radio.props;
      var validations = _radio$props.validations;
      var // eslint-disable-line no-unused-vars
      validationError = _radio$props.validationError;
      var // eslint-disable-line no-unused-vars
      validationErrors = _radio$props.validationErrors;

      var rest = _objectWithoutProperties(_radio$props, ['validations', 'validationError', 'validationErrors']);

      return _react2.default.createElement(_RadioButton.RadioButton, rest);
    });

    return _react2.default.createElement(
      _RadioButton.RadioButtonGroup,
      _extends({}, rest, {
        ref: this.setMuiComponentAndMaybeFocus,
        onChange: this.handleValueChange
      }),
      children
    );
  }
});

exports.default = FormsyRadioGroup;