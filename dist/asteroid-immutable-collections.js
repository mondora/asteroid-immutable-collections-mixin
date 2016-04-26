"use strict";

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _handlers = require("./handlers");

var _getServiceConfig = require("./get-service-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
    this.collections = _immutable2.default.Map();
    this.ddp.on("added", _handlers.added.bind(this));
    this.ddp.on("changed", _handlers.changed.bind(this));
    this.ddp.on("removed", _handlers.removed.bind(this));
}

module.exports = {
    init: init,
    getServiceConfig: _getServiceConfig.getServiceConfig
};