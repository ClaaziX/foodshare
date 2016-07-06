'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _TimePicker = require('./TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _getMuiTheme = require('../styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */


describe('<TimePicker />', function () {
  var muiTheme = (0, _getMuiTheme2.default)();
  var shallowWithContext = function shallowWithContext(node) {
    return (0, _enzyme.shallow)(node, { context: { muiTheme: muiTheme } });
  };

  describe('propTypes', function () {
    var consoleStub = void 0;

    beforeEach(function () {
      consoleStub = (0, _sinon.stub)(console, 'error');
    });

    afterEach(function () {
      console.error.restore(); // eslint-disable-line no-console
    });

    it('should throw when using wrong properties', function () {
      shallowWithContext(_react2.default.createElement(_TimePicker2.default, { value: '2016-03-21' }));
      _chai.assert.strictEqual(consoleStub.callCount, 1);
      _chai.assert.strictEqual(consoleStub.args[0][0], 'Warning: Failed propType: Invalid prop `value` of type `string` supplied to `TimePicker`, expected `object`.');
    });

    it('should not throw when using a valid properties', function () {
      shallowWithContext(_react2.default.createElement(_TimePicker2.default, { value: new Date() }));
      _chai.assert.strictEqual(consoleStub.callCount, 0);
    });
  });
});