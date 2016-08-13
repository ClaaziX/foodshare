'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMuiComponentAndMaybeFocus = setMuiComponentAndMaybeFocus;
function setMuiComponentAndMaybeFocus(c) {
  if (c === this.muiComponent) return;

  this.muiComponent = c;

  if (c && typeof c.focus === 'function') {
    this.focus = function () {
      return c.focus();
    };
  } else if (this.hasOwnProperty('focus')) {
    delete this.focus;
  }
}