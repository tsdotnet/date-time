/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./TimeQuantity", "./TimeUnit"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const TimeQuantity_1 = tslib_1.__importDefault(require("./TimeQuantity"));
    const TimeUnit_1 = tslib_1.__importDefault(require("./TimeUnit"));
    /**
     * TimeUnitValue allows for passing around a reference to a mutable measure of time coerced by its unit type.
     */
    class TimeUnitValue extends TimeQuantity_1.default {
        _units;
        constructor(value, _units) {
            super(typeof value == 'number'
                ? value
                : getUnitQuantityFrom(value, _units));
            this._units = _units;
            TimeUnit_1.default.assertValid(_units);
        }
        get value() {
            return this._quantity;
        }
        set value(v) {
            this._quantity = v;
            if (!this._total.tryReset())
                throw new Error('Unable to update underlying value.');
        }
        // To avoid confusion, the unit type can only be set once at construction.
        get units() {
            return this._units;
        }
        static from(value, units = TimeUnit_1.default.UnitType.Milliseconds) {
            return new TimeUnitValue(value, units);
        }
        getTotalMilliseconds() {
            return TimeUnit_1.default.toMilliseconds(this._quantity, this._units);
        }
        to(units = this.units) {
            return TimeUnitValue.from(this, units);
        }
    }
    exports.default = TimeUnitValue;
    function getUnitQuantityFrom(q, units) {
        return TimeUnit_1.default.fromMilliseconds(q.getTotalMilliseconds(), units);
    }
});
//# sourceMappingURL=TimeUnitValue.js.map