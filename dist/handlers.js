"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.added = added;
exports.changed = changed;
exports.removed = removed;

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _normalizeId = require("./lib/normalize-id");

var _normalizeId2 = _interopRequireDefault(_normalizeId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function added(_ref) {
    var collection = _ref.collection;
    var id = _ref.id;
    var fields = _ref.fields;

    var _id = (0, _normalizeId2.default)(id);
    // TODO `fields` might be empty. Find out if true and document why
    var element = _immutable2.default.fromJS(_extends({}, fields, { _id: _id }));
    this.collections = this.collections.setIn([collection, _id], element);
    this.emit("collections:change", "added", collection, _id);
}

function changed(_ref2) {
    var collection = _ref2.collection;
    var id = _ref2.id;
    var fields = _ref2.fields;
    var cleared = _ref2.cleared;

    var _id = (0, _normalizeId2.default)(id);
    if (fields) {
        this.collections = this.collections.mergeIn([collection, _id], fields);
    }
    if (cleared) {
        this.collections = cleared.reduce(function (collections, field) {
            return collections.deleteIn([collection, _id, field]);
        }, this.collections);
    }
    this.emit("collections:change", "changed", collection, _id);
}

function removed(_ref3) {
    var collection = _ref3.collection;
    var id = _ref3.id;

    var _id = (0, _normalizeId2.default)(id);
    this.collections = this.collections.deleteIn([collection, _id]);
    this.emit("collections:change", "removed", collection, _id);
}