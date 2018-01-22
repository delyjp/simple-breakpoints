"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = function () {
    function Dispatcher() {
        _classCallCheck(this, Dispatcher);

        this.events = {};
        this.onceEvents = {};
    }

    _createClass(Dispatcher, [{
        key: "on",
        value: function on(events, callback) {
            var _this = this;

            events = [].concat(events);

            events.forEach(function (event) {
                _this.events[event] = (_this.events[event] || []).concat(callback);
            });
        }
    }, {
        key: "off",
        value: function off(event) {
            delete this.events[event];
        }
    }, {
        key: "once",
        value: function once(events, callback) {
            this.on(events, callback);
            this.onceEvents.push(events);
        }
    }, {
        key: "fire",
        value: function fire(event) {
            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            if (!this.events[event]) return false;

            this.events[event].forEach(function (callback) {
                return callback.apply(undefined, params);
            });

            if (this.onceEvents[event]) {
                this.off(event);
            }
        }
    }, {
        key: "all",
        value: function all() {
            return this.events;
        }
    }]);

    return Dispatcher;
}();

exports.default = new Dispatcher();